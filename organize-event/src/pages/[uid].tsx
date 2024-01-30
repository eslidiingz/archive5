import BaseImage from "@/components/BaseImage";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { callGqlClient } from "@/utils/headerGraphQL";
import { QUERY_FORM, MUTATION_ANSWER } from "@/models/form";
import { useRouter } from "next/router";
import {
  iForm,
  defaultForm,
  iAnswer,
  defaultAnswer,
} from "@/interfaces/form.interface";
import { eEmailTemplate } from "./api/mail";
import axios from "axios";
const RegisterForm = () => {
  const router = useRouter();
  let { uid } = router?.query;
  const [form, setForm] = useState<iForm>(defaultForm);
  const [answer, setAnswer] = useState<iAnswer[]>([]);
  const getUid = () => {
    return typeof uid != "undefined" ? (Array.isArray(uid) ? uid[0] : uid) : "";
  };
  const getForm = async () => {
    try {
      const _uid: string = getUid();
      if (_uid != "") {
        const _res = await callGqlClient(
          "query",
          "organize",
          QUERY_FORM,
          { uid: _uid },
          null
        );
        console.log("_res", _res);
        const data = _res.data.registerFormByUid;
        console.log(
          "%c%s",
          "background-color: #e0005a ; color: #ffffff ; font-weight: bold ; padding: 4px ;",
          " 🦄 [ ][ file: [uid].tsx:24 ][ getForm ][ data:",
          data
        );

        if (!data.is_active) {
          console.error("form not active");
          router.push("/");
        } else {
          setForm(data);
        }
      }
    } catch (error) {
      console.error("form uid not found");
      router.push("/");
    }
  };
  const convertChoise = (_choice_list: string) => {
    try {
      return _choice_list == "" ? [] : JSON.parse(_choice_list);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const submitAnswer = async () => {
    const _temp: any = [...answer];
    const _answer = _temp.map((e: any) => {
      if (Array.isArray(e.result)) {
        e.result = JSON.stringify(e.result);
      }
      return e;
    });
    console.log("_answer", _answer);
    const _res = await callGqlClient(
      "mutation",
      "organize",
      MUTATION_ANSWER,
      { createAnswerInput: _answer },
      null
    );
    if (_res.data.createAnswerList == _answer.length) {

      const sent = await sendEmail()

      if ( sent ) {
        alert("success");
        location.reload();
      }
      
    }
  };

  const sendEmail = async () => {
    const sendMailParams = {
      mailTo: `eslidiingz@gmail.com`, // replace email here
      template: eEmailTemplate.REGISTER_USER,
      username: `eslidiingz`, // replace username here
      event_uid: uid,
    }
    
    try {
      const { data } = await axios.post(`/api/mail`, sendMailParams)
      
      return data?.success
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    getForm();
  }, [uid]);
  // test
  useEffect(() => {
    console.log("form", form);
  }, [form]);
  useEffect(() => {
    console.log("useEffect answer", answer);
  }, [answer]);

  const handleSetForm = async (e: any) => {
    const _uid: string = getUid();
    const _element: any = document.getElementsByName(e.target.name);
    let _value;
    if (_element.length > 1) {
      _value = [];
      for (const _el of _element) {
        if (_el.checked) {
          _value.push(_el.value);
        }
      }
    } else {
      _value = _element[0].value;
    }

    const _filter = answer.filter((_e) => {
      if (_e["question_uid"] == e.target.name) {
        return e;
      }
    });
    if (_filter.length > 0) {
      const _data: any[] = [...answer];
      const _index = _data.findIndex(
        (_e) => _e["question_uid"] === e.target.name
      );
      const _temp: any = {
        ..._data[_index],
        result: _value,
      };
      _data[_index] = _temp;
      setAnswer(_data);
    } else {
      setAnswer([
        ...answer,
        {
          form_uid: _uid,
          question_uid: e.target.name,
          result: _value,
          user_uid: "",
        },
      ]);
    }
  };

  return (
    <>
      <Container className="my-3 form-register-layoutmain">
        <Row>
          <Col xs={12} className="mb-3">
            <div className="form-register-banner-layout">
              <BaseImage
                src="/assets/Default_Full_3.png"
                class_name="form-register-banner"
              />
            </div>
          </Col>
          <Col xs={12} className="mt-3">
            <div className="form-register-content-layout">
              <h2 className="mb-0 fw-bold">{form.topic}</h2>
              <p className="mb-0 text-detail fw-bold">{form.description}</p>
              {/* <hr />
              <p className="mb-0 fw-bold">Username</p> */}
            </div>
          </Col>
          {form.questions?.map((question: any, index: number) => (
            <Col xs={12} className="mt-3" key={index}>
              <div className="form-register-content-layout">
                <h2 className="mb-0 fw-bold">{question.name}</h2>
                <p className="mb-0 text-detail">{question.description}</p>
                <div className="my-3">
                  {question.input_type_slug === "short" && (
                    <>
                      <input
                        type="text"
                        name={question.uuid}
                        onChange={(e: any) => handleSetForm(e)}
                      />
                    </>
                  )}
                  {question.input_type_slug === "paragraph" && (
                    <>
                      <textarea
                        name={question.uuid}
                        rows={4}
                        onChange={(e: any) => handleSetForm(e)}
                      />
                    </>
                  )}
                  {question.input_type_slug === "checkbox" && (
                    <>
                      <div className="form-check">
                        {convertChoise(question?.choice_list).map(
                          (item: any, index: number) => (
                            <div key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name={question.uuid}
                                value={item.name}
                                onChange={(e: any) => handleSetForm(e)}
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="flexRadioDefault1"
                              >
                                {item.name}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                  {question.input_type_slug === "radiobox" && (
                    <>
                      <div className="form-check">
                        {convertChoise(question?.choice_list).map(
                          (item: any, index: number) => (
                            <div key={index} className="mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={question.uuid}
                                value={item.name}
                                onChange={(e: any) => handleSetForm(e)}
                              />
                              <label
                                className="form-check-label ms-2"
                                htmlFor="flexRadioDefault1"
                              >
                                {item.name}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          ))}
          <Col xs={12} className="mt-3">
            <Button onClick={submitAnswer} variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterForm;
