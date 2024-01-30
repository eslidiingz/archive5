import BaseImage from "@/components/BaseImage";
import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { callGqlClient } from "@/utils/headerGraphQL";
import { QUERY_FORM } from "@/models/form";
const RegisterForm = () => {
  return (
    <>
      <Container className="my-3 form-register-layoutmain">
        <Row>
          <Col xs={12} className="mb-3">
            <BaseImage
              src="/assets/Default_Full_3.png"
              class_name="form-register-banner"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterForm;
