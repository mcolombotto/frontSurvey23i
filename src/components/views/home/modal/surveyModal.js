import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Survey from "../surveyTable/Survey";

const SurveyModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          Agregar nueva pregunta
        </Button>
        <Button
          className="ms-3"
          variant="secondary"
          onClick={props.handleSubmit}
        >
          Guardar
        </Button>

        <Modal show={show} onHide={handleClose}>
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
                  name="question"
                  autoFocus
                  onChange={(e) => {
                 
                  props.setSurveyItem(e.target.value);
                 
                  }}
                />
              </Form.Group>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Select aria-label="Default select example">
                  <option>Tipo de Respuesta</option>
                  <option value="1">Texto Libre</option>
                  <option value="2">
                    Numerica (1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10. )
                  </option>
                  <option value="3">
                    Cualitativa (Malo, Regular, Bueno, Muy Bueno, Excelente)
                  </option>
                </Form.Select>
              </Form.Group> */}
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

                props.setSurveyItemList([
                  ...props.surveyItemList,
                  props.surveyItem,
                ]);
                props.setSurveyItem("");
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
