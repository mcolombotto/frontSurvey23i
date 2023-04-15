import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Survey from "../surveyTable/Survey";
import "./modal.css"
const SurveyModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props.surveyItemList)
  return (
    <div>
      <>
        <Button variant="outline-primary" onClick={handleShow}>
          Agregar nueva pregunta
        </Button>
        <Button
          className="ms-3"
          variant="outline-success"
          onClick={props.handleSubmit}
        >
          Guardar
        </Button>

        <Modal className="text-light"show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar nueva pregunta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Ingrese la pregunta aqui"
                  maxLength="100"
                  name="question"
                  autoFocus
                  onChange={(e) => {
                    props.surveyItem.question = e.target.value;
                    props.setSurveyItem(props.surveyItem);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    props.surveyItem.responseType = e.target.value;
                    props.setSurveyItem(props.surveyItem);
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
            <Button variant="outline-secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="outline-primary"
              onClick={(e) => {
                e.preventDefault();
                console.log("ARRAY", props.surveyItemList);
                console.log("ITEM", props.surveyItem);
                localStorage.setItem(
                  "newSurveyItemList",
                  JSON.stringify([...props.surveyItemList, props.surveyItem])
                );
                props.setSurveyItemList([
                  ...props.surveyItemList,
                  props.surveyItem,
                ]);
                console.log(props.surveyItemList);

                props.setSurveyItem({
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
};

export default SurveyModal;
