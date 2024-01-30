import { useRouter } from "next/router";
import { useState } from "react";
import { fetchUserData } from "../../../utils/api/account-api";
import Config from "../../../utils/config.json";
import { getWalletAccount } from "../../../utils/web3/init";
import { toast } from "react-toastify";
import { ToastDisplay } from "../../../components/ToastDisplay";
const CreateCollectionPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const createCollection = async () => {
    const { rows } = await fetchUserData(await getWalletAccount());
    const account = rows[0]._id;

    const collectionUrl = "collections";
    const collectionEndpoint = `${Config.collectionApi}/${collectionUrl}`;
    if(name == "" || description == "" || currentFile == null){
      toast(
        <ToastDisplay
          type={"warning"}
          title={"name & description & image can't be null"}
          description={"Please fill the form"}
        />
      );
      return;
    }
    const fd = new FormData();
    fd.append("title", name);
    fd.append("description", description);
    fd.append("cover", currentFile);
    fd.append("owner", account);

    const result = await fetch(collectionEndpoint, {
      method: "post",
      body: fd,
    });

    const data = await result.json();
    const userUrl = "users";
    const userEndpoint = `${Config.collectionApi}/${userUrl}/${account}`;

    const fetchCollectionAssets = await fetch(
      `${Config.collectionApi}/${userUrl}/${account}`
    );

    const { collectionAssets } = await fetchCollectionAssets.json();
    collectionAssets.push(data._id);

    const _result = await fetch(userEndpoint, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionAssets,
      }),
    });
    if (result.status === 201) {
      toast(
        <ToastDisplay
          type={"success"}
          title={"Transaction reciept"}
          description={"Mint Assets success !!!"}
        />
      );
      setTimeout(() => {
        
      }, 500)
      router.push("/profile/mycollection");
    }
  };

  return (
    <>
      <main className="paper-card">
        <div className="bg-paper mx-auto p-2 md:p-8">
          <h2 className="modal-title">Create Collection</h2>
          <div className="mb-4">
            <span className="text-muted mt-6 mb-2 block">
              Collection
            </span>
            <p>
              This information will be displayed publicly so be careful what
              you share.
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
                    <div id="upload-image" className="btn-theme btn-primary-long allcen btn-padding">
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
            <label className="label-modal">Collection Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-span-1 mb-4">
            <label className="label-modal">Collection Description</label>
            <textarea
              rows="3"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <p className="text-sm">
            Write a few sentences about yourself.
          </p>
          
          <div className="pt-5">
            <div className="flex justify-center xl:justify-end flex-wrap">
              <button
                type="button"
                className="btn-theme btn-secondary"
                onClick={() => window.location = "/profile/mycollection"}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => createCollection()}
                className="btn-theme btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateCollectionPage;
