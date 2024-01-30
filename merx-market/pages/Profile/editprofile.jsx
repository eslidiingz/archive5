import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Profile = () => {
  return (
    <>
      <section className="section-gradient">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <h1 className="ci-white">Profile</h1>
            </div>
            <div className="col-6 text-end">
              <p className="ci-white mb-0">
                Home <span> {">"} </span> <span> Collections </span>{" "}
                <span> {">"} </span> <span>Explore</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black test2">
        <div className="container">
          <Row className=" px-3">
            <Col md={12}>
              <h2 className="text-white mt-3">Edit Profile</h2>
              
              <div className="box-create text-white text-start mb-4">
                <Form.Group
                  controlId="formFile"
                  className="mb-3 custom-file-upload img-profile"
                >
                  <Form.Label>
                    <p>Choose file </p>
                    <i className="fas fa-plus"></i>
                  </Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <p className="ci-purple">*Max file sizeis 20mb</p>

                <Form>
                  <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="firstname"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-search-set height-54"
                      placeholder="lastname"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control as="textarea" rows={3} className="input-search-set" />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-5">
                    <Link  href="/Profile">
                      <button className="btn btn-secondary wmax-120 me-2">
                        Cancle
                      </button>
                    </Link>
                    <button className="btn btn03 btn-hover color-1 wmax-120">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Profile;
Profile.layout = Mainlayout;
