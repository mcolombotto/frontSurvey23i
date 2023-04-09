import { tsIndexedAccessType } from "@babel/types";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Survey from "../surveyTable/Survey";

function ModalEdit(props) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(
    props.surveyItemList.surveyItemList.indexOf(props.surveyItemList.data)
  );

  return (
    <div>
      <>
        <Button variant="btn btn-outline-warning me-0" onClick={handleShow}>
          Editar
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar pregunta existente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  name="question"
                  defaultValue={props.surveyItemList.data.question}
                  autoFocus
                  maxLength="100"
                  onChange={(e) => {
                    setIndex(
                      props.surveyItemList.surveyItemList.indexOf(
                        props.surveyItemList.data
                      )
                    );
                    console.log(e.target.name);
                    console.log(e.target.value);
                    props.surveyItemList.surveyItem.responseType =
                      props.surveyItemList.data.responseType;
                    props.surveyItemList.surveyItem.question = e.target.value;
                    props.surveyItemList.setSurveyItem(
                      props.surveyItemList.surveyItem
                    );

                    console.log(props.surveyItemList.surveyItem);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={props.surveyItemList.data.responseType}
                  onChange={(e) => {
                    setIndex(
                        props.surveyItemList.surveyItemList.indexOf(
                          props.surveyItemList.data
                        )
                      );
                      props.surveyItemList.surveyItem.question =
                      props.surveyItemList.data.question;
                    props.surveyItemList.surveyItem.responseType =
                      e.target.value;
                    props.surveyItemList.setSurveyItem(
                      props.surveyItemList.surveyItem
                    );
                  }}
                >
                  <option>Tipo de respuesta</option>
                  <option value="Booleana">Si / No</option>
                  <option value="Texto Libre">Texto Libre</option>
                  <option value="Numerica">
                    Numerica (1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10. )
                  </option>
                  <option value="Cualitativa">
                    Cualitativa (Malo, Regular, Bueno, Muy Bueno, Excelente)
                  </option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();

                props.surveyItemList.surveyItemList.splice(
                  index,
                  1,
                  props.surveyItemList.surveyItem
                );


                props.surveyItemList.setSurveyItem({
                  question: "",
                  responseType: "",
                });
                handleClose();
              }}
            >
              Guardar pregunta
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default ModalEdit;
