import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import { Form } from "react-bootstrap";
import { Row, Container, Col } from "react-bootstrap";
import CardCreate from "../../components/card/CardCreate";
import CardTrending from "../../components/card/CardTrending";
import Dropdown from 'react-bootstrap/Dropdown';
import Select from "../../components/form/select";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import Config from "../../configs/config";
import { createMetadata, mintAsset } from "../../models/Asset";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const imageMaxSize = 4; // MB
// const sourceMaxSize = 20; // MB

const Create = () => {
  const { wallet, walletAction } = ["", ""];
  const router = useRouter();

  const inputNameRef = useRef();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [form, setForm] = useState({
    image: "",
    imagePreview: "",
    name: "",
    description: "",
    // sourceFile: "",
    externalLink: "",
    tags: [],
    collectionOption: "newCollection",
    collectionName: "",
  });

  const [fileChoosed, setFileChoosed] = useState({
    image: "",
    // sourceFile: "",
  });

  const [errors, setErrors] = useState({
    image: "",
    name: "",
    description: "",
    // sourceFile: "",
    collectionName: "",
  });

  const [collectionExisting, setCollectionExisting] = useState([]);

  const handleDelete = (i) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: form.tags.filter((tag, index) => index !== i),
    }));
  };

  const handleAddition = (tag) => {
    setForm((prevForm) => ({ ...prevForm, tags: [...form.tags, tag] }));
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];

    let keyName = e.target.name;

    if (file) {
      let fileSize = file.size / 1024 / 1024; // Convert to MB
      fileSize = Math.round(fileSize * 100) / 100; // Convert to 2 decimal

      if (
        keyName === "image" &&
        parseFloat(fileSize) > parseFloat(imageMaxSize)
      ) {
        setErrors((prevErr) => ({
          ...prevErr,
          [keyName]: `Image file size is more than ${imageMaxSize} MB`,
        }));
      }

      // if (
      //   keyName === "sourceFile" &&
      //   parseFloat(fileSize) > parseFloat(sourceMaxSize)
      // ) {
      //   setErrors((prevErr) => ({
      //     ...prevErr,
      //     [keyName]: `Source file size is more than ${sourceMaxSize} MB`,
      //   }));
      // }

      setFileChoosed((prevChoose) => ({
        ...prevChoose,
        [keyName]: file.name,
      }));

      let url = URL.createObjectURL(file);

      setForm((prevForm) => ({
        ...prevForm,
        [keyName]: file,
        ...(keyName === "image" && { imagePreview: url }),
      }));
    }
  };

  const handleInputChange = (e) => {
    switch (e.target.type) {
      case "file":
        handleFileChange(e);
        break;

      default:
        setForm((prevForm) => ({
          ...prevForm,
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  const handleCollectionOptionChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      collectionOption: e.target.value,
      collectionName: "",
    }));
  };

  const getMyCollectionList = async () => {
    inputNameRef.current.focus();

    let collectionList = await myCollection(wallet);

    setCollectionExisting(collectionList.data);
  };

  const uploadFileToServer = async (_fileContent) => {
    let fd = new FormData();

    fd.append("file", _fileContent);
    console.log("URI : ", Config.FILE_SERVER_URI);
    let res = await fetch(Config.FILE_SERVER_URI, {
      method: "POST",
      body: fd,
    });

    return await res.json();
  };

  const validated = () => {
    let status = true;

    Object.entries(errors).map((err) => {
      let key = err[0];
      let val = err[1];

      let msg;

      if (form[key].length < 1) {
        msg = "This field is required.";
        status = false;
      } else {
        msg = "";
      }

      setErrors((prevErr) => ({
        ...prevErr,
        [key]: msg,
      }));
    });

    return status;
  };

  const handleCreateNft = async (e) => {
    e.preventDefault();

    if (!validated()) {
      Swal.fire("Error", "Please check data field is required.", "error");
      return;
    }

    try {
      setIsPageLoading(true);
      /** Upload file to file server */
      let image = await uploadFileToServer(form.image);
      // let source = await uploadFileToServer(form.sourceFile);

      // let image = { filename: "image.jpg" }; // Mock data
      // let source = { filename: "source.jpg" }; // Mock data

      /** Make a new metadata before store */
      let metadata = form;

      delete metadata.imagePreview;

      if (image) {
        metadata.image = `${Config.GET_FILE_URI}/${image.filename}`;
        // metadata.sourceFile = `${Config.GET_FILE_URI}/${source.filename}`;
        console.log("Image : ", image);
        // console.log("Source : ", source)
        /** Store metadata to dabase */
        const { status, data } = await createMetadata(metadata);
        console.log("Create metadata status : ", status);
        if (status) {
          metadata = data;

          /** Mint NFT */
        console.log("Trying to mint nft")
          const minted = await mintAsset(metadata);

          if (minted?.token_id) {
            router.push("/Profile");
          }
        }
      }

      setIsPageLoading(false);
    } catch (error) {
      Swal.fire("Error", error.toString(), "error");
      console.log(
        `%c========== ERROR handleCreateNft ==========`,
        "color: red",
        error
      );

      setIsPageLoading(false);
    }
  };

  const initialize = async () => {};

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (wallet) getMyCollectionList();
    setIsPageLoading(false);
  }, [wallet]);
  return (
    <>
      <section className="">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-xl-6 col-12">
              <h1 className="ci-white">Create</h1>
            </div>
            <div className="col-xl-6 col-12 text-end">
              <p className="text-navgation text-white">
                <Link href="/"><a className="text-white text-navation_mr">Home</a></Link> {'>'}
                <Link href="/Explore-collection/item"><a className="text-white text-navation_mr">Collections</a></Link> {'>'}
                <Link href=""><a className="text-white text-navation_mr">Create</a></Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div>
          <Container>
            <Row className="py-4">
              <Col lg={12}>
                <h4 className=" text-white">Create file</h4>
              </Col>
              <Col lg={8}>
                <div className="box-create text-white text-start mb-4">
                  <Form onSubmit={(e) => handleCreateNft(e)}>
                    <p>Image</p>
                    <Form.Group controlId="formFile" className="mb-3 custom-file-upload ">
                      <Form.Label>
                        <p>Choose file </p>
                        <i className="fas fa-plus"></i>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        ref={inputNameRef}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>
                    {fileChoosed.image && (
                        <small>
                          File selected:{" "}
                          <span className="text-secondary font-light">
                            /{fileChoosed.image}
                          </span>
                        </small>
                      )}
                    <p className="ci-purple">*Max file sizeis 20mb</p>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="input-search-set height-54"
                        placeholder="Name"
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>
                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label>
                        Description <span className="text-danger">*</span>
                        {errors.description && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-inline"
                          >
                            {errors.description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Label>
                      <Form.Control
                        className="input-search-set"
                        as="textarea"
                        rows={4}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="externalLink">
                        <Form.Label>External link (URL)</Form.Label>
                        <Form.Control
                          type="url"
                          className="input-search-set height-54"
                          placeholder="https://google.com"
                          name="externalLink"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Form.Group>
                    <Form.Group className="mb-3" controlId="tags">
                      <Form.Label>
                        Tags{" "}
                        <small className="text-secondary">
                          (Press enter after typed word)
                        </small>
                      </Form.Label>
                      <div>
                        <ReactTags
                          classNames={{
                            tagInputField: "w-full input-search-set height-54",
                          }}
                          tags={form.tags}
                          delimiters={delimiters}
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          // handleDrag={handleDrag}
                          // handleTagClick={handleTagClick}
                          inputFieldPosition="top"
                          // autocomplete
                        />
                      </div>
                    </Form.Group>
                    <div className="mb-3">
                      <div className="mb-2">
                        Collection Name <span className="text-danger">*</span>
                        {errors.collectionName && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-inline"
                          >
                            {errors.collectionName}
                          </Form.Control.Feedback>
                        )}
                      </div>
                      {collectionExisting.length > 0 && (
                        <>
                          <Form.Check
                            inline
                            label="Add new"
                            name="collectionOption"
                            value="newCollection"
                            type="radio"
                            id={`inline-radio-1`}
                            checked={form.collectionOption == "newCollection"}
                            onChange={(e) => handleCollectionOptionChange(e)}
                          />

                          <Form.Check
                            inline
                            label="Collection Existing"
                            name="collectionOption"
                            value="collectionExisting"
                            type="radio"
                            id={`inline-radio-2`}
                            checked={
                              form.collectionOption == "collectionExisting"
                            }
                            onChange={(e) => handleCollectionOptionChange(e)}
                          />
                        </>
                      )}
                    </div>
                    {form.collectionOption === "collectionExisting" ? (
                      <Form.Group className="mb-3" controlId="collectionSelect">
                        <Form.Select
                          aria-label="collectionSelect"
                          className="input-search-set height-54"
                          onChange={(e) => {
                            setForm((prevForm) => ({
                              ...prevForm,
                              collectionName: e.target.value,
                            }));
                          }}
                        >
                          <option>- Select collection name -</option>
                          {collectionExisting.map((item) => {
                            return (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3" controlId="collectionName">
                        <Form.Control
                          type="text"
                          className="input-search-set height-54"
                          name="collectionName"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </Form.Group>
                    )}
                    {/* <Form.Group className="mb-3" controlId="Name">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="text" className="input-search-set height-54 mb-3" placeholder="Price" />
                      <Select selected="Inventory"
                      value1="value1"
                      value2="value2"
                      value3="value3" />
                    </Form.Group> */}
                    <button className="btn btn03 btn-hover color-1 w-100">Submit</button>
                  </Form>

                </div>
              </Col>
              <Col lg={4} >
                <div className="col-12 col-md-12 col-lg-12 col-xl-12 mb-4 ">
                  <CardTrending
                    ClassTittle="text-tittle-slidertren mb-0"
                    // img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                    img={form.imagePreview}
                    tittle={form.name}
                    description={form.description}
                    collectionName={form.collectionName}
                    tags={form.tags}
                    // profile="sala"
                    // price="153"
                    // link="/Explore-collection/detail-music"
                  ></CardTrending>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Create;
Create.layout = Mainlayout;
