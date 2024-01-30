import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Config from "../../../utils/config.json";
import ButtonState from "../../../components/button/button-state";
import { getWalletAccount, mintContract } from "../../../utils/web3/init";
import { ToastDisplay } from "../../../components/ToastDisplay";
import {
  fetchCollectionList,
  fetchAssetCollection,
  putAssetCollection,
  putHolderCollection,
} from "../../../utils/api/collection-api";
import { createAssetList } from "../../../utils/api/asset-api";
import { useRouter } from "next/router";
import { fetchUserData } from "../../../utils/api/account-api";
import trait_type from "../../../utils/trait_type.json";

const CreateAssetPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [collection, setCollection] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectCollection, setSelectCollection] = useState(null);
  const [traitType, setTraitType] = useState([]);
  const [btnAttr, setBtnAttr] = useState(true);
  const [attrObject, setAttrObject] = useState({
    type: trait_type.trait_type,
  });

  const handleCollection = (val) => {
    setSelectCollection(val);
  };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const createAsset = async () => {
    let title = "name & description & image & collection can't be null";

    if (
      name == "" ||
      description == "" ||
      currentFile == null ||
      collection.length == 0
    ) {
      if (attributes.length > 0) {
        attributes.map((attr, i) => {
          if (attr.trait_type == "") {
            title =
              "name & description & image & collection & attribute can't be null";
          }
        });
      }

      toast(
        <ToastDisplay
          type={"warning"}
          title={title}
          description={"Please fill the form"}
        />
      );
      return;
    }
    const metadata = {
      name,
      description,
      external_url: externalLink,
      attributes,
    };

    const fd = new FormData();
    fd.append("file", currentFile);
    fd.append("metadata", JSON.stringify(metadata));

    try {
      setLoading(true);

      const _result = await fetch(Config.mintAssetURI, {
        method: "post",
        body: fd,
      });

      const _data = await _result.json();

      const _mint = await mintContract.methods
        .mint(_data.metadata_hash_cdn)
        .send({ from: await getWalletAccount() })
        .on("sending", (sending) => {
          setLoading(true);
          toast(
            <ToastDisplay
              type={"process"}
              title={"Waiting For Confirmation"}
              description={"Confirm this transaction in your wallet"}
            />
          );
        })
        .on("receipt", (receipt) => {
          setLoading(false);
          toast(
            <ToastDisplay
              type={"success"}
              title={"Transaction reciept"}
              description={"Mint Assets success !!!"}
            />
          );
          clearForm();
        })
        .on("error", (error) => {
          setLoading(false);
          toast(
            <ToastDisplay
              type={"error"}
              title={"Transaction failed"}
              description={"Transaction failed please try again"}
            />
          );
          clearForm();
        });

      const data = {
        address: _mint.events.Transfer.address,
        token: _mint.events.Transfer.returnValues.tokenId,
        hash: _data.Hash,
        metadata: _data.metadata_hash_cdn,
        image: _data.image_cdn,
      };

      const _resultAsset = await await createAssetList(data);

      if (selectCollection !== null) {
        const { assets } = await fetchAssetCollection(selectCollection);
        const _assetsArray = await _resultAsset.json();
        assets.push(_assetsArray._id);

        const _assets = await putAssetCollection(selectCollection, { assets });

        const _wallet = await getWalletAccount();
        await putHolderCollection(selectCollection, {
          holder: _wallet,
        });

        if (_assets.status === 200) {
          router.push("/profile/mynft/");
        }
      } else {
        if (_resultAsset.status === 200) {
          router.push("/profile/mynft/");
        }
      }
    } catch (error) {
      setLoading(false);
      toast(error);
      clearForm();
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setExternalLink("");
    setAttributes([]);
    setCurrentFile(null);
    setPreviewImage(null);
  };

  const addNewAttribute = () => {
    if (attributes.length < attrObject.type.length) {
      if (attributes.length > 0) {
        attributes.map((attr, i) => {
          if (attr.trait_type == "") {
            toast.error("Please selected attribute");
          } else {
            setAttributes((prevAttr) => [
              ...prevAttr,
              {
                trait_type: "",
                value: "",
              },
            ]);
          }
        });
      } else {
        setAttributes((prev) => [
          ...prev,
          {
            trait_type: "",
            value: "",
          },
        ]);
      }
    }
  };

  const handleTraitType = (e, index) => {
    const { name, value } = e.target;

    var list = [...attributes];
    list[index][name] = value;

    setAttributes(list);
  };

  const handleValue = (e, index) => {
    const { name, value } = e.target;

    const list = [...attributes];
    list[index][name] = value;
    setAttributes(list);
  };

  const removeInputAttribute = (index) => {
    const list = [...attributes];

    list.splice(index, 1);
    setAttributes(list);
  };

  const fetchCollection = async () => {
    const _user = await fetchUserData(await getWalletAccount());
    const { rows } = await fetchCollectionList(_user.rows[0]._id);
    setCollection(rows);
  };

  useEffect(() => {
    fetchCollection();
    setTraitType(trait_type);

    if (attributes.length == attrObject.type.length) {
      setBtnAttr(false);
    } else {
      setBtnAttr(true);
    }
  }, [attributes]);
  return (
    <>
      <main className="paper-card">
        <div className="bg-paper mx-auto p-2 md:p-8">
          <h2 className="modal-title">Create Assets</h2>
          <div className="mb-4">
            <span className="text-muted mt-6 mb-2 block">Profile</span>
            <p>
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="col-span-1 mb-4">
            <label className="label-modal">Cover Collection</label>
            <div className="dropzone-theme">
              <div className="space-y-1 text-center">
                <div className="flex text-sm justify-center">
                  <label
                    htmlFor="upload"
                    className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <img id="cover-image" src={previewImage} />
                    <div
                      id="upload-image"
                      className="btn-theme btn-primary-long allcen btn-padding"
                    >
                      <span>Upload a file</span>
                    </div>
                  </label>
                  <input
                    className="hidden"
                    id="upload"
                    name="upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => selectFile(e)}
                  />
                </div>
                <p>
                  Upload file or drag and drop with PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 mb-4">
            <label className="label-modal">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-span-1 mb-4">
            <label className="label-modal">External Link</label>
            <input
              type="text"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="col-span-1 mb-4">
            <label className="label-modal">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            ></textarea>
          </div>

          <p className="text-sm mb-4">Write a few sentences about yourself.</p>

          <div className="col-span-1 mb-4">
            <label className="label-modal">Collection</label>
            <select
              onChange={(e) => handleCollection(e.target.value)}
              className="form-control"
            >
              <option value={""}>Select Collection</option>
              {collection.map((item) => {
                const urlParams = new URLSearchParams(window.location.search);
                const myParam = urlParams.get("id");
                if (myParam == item._id)
                  return (
                    <option value={item._id} selected>
                      {item.title}
                    </option>
                  );
                return <option value={item._id}>{item.title}</option>;
              })}
            </select>
          </div>

          <div className="col-span-1 mb-4 flex justify-between">
            <label className="label-modal">Attributes</label>
            {btnAttr && (
              <button
                className="btn-theme btn-primary btn-sm"
                text={"Add"}
                onClick={() => addNewAttribute()}
                type="button"
              >
                Add
              </button>
            )}
          </div>
          <div className="col-span-1 mb-4">
            {attributes.length > 0 &&
              attributes.map((attr, index) => {
                return (
                  <div className="flex mb-2" key={index}>
                    <select
                      value={attr.trait_type}
                      name="trait_type"
                      onChange={(e) => handleTraitType(e, index)}
                      className="form-control"
                    >
                      <option value={""} disabled>
                        Select Type
                      </option>
                      {trait_type.trait_type.map((item, key) => {
                        return (
                          <option value={item} key={key}>
                            {item}
                          </option>
                        );
                      })}
                    </select>

                    <input
                      type="text"
                      id="externalLink"
                      className="form-control ml-4"
                      name="value"
                      value={attr.value}
                      placeholder="ex. big"
                      onChange={(e) => handleValue(e, index)}
                    />
                    <button
                      onClick={(e) => removeInputAttribute(index)}
                      type="button"
                      className="text-delete ml-2"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="pt-5">
            <div className="flex justify-center xl:justify-end flex-wrap">
              <button
                type="button"
                className="btn-theme btn-secondary"
                onClick={() => (window.location = "/profile/mynft")}
              >
                Cancel
              </button>
              <ButtonState
                text={"Mint Assets"}
                loading={loading}
                onFunction={() => createAsset()}
                classStyle={"btn-theme btn-primary"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateAssetPage;
