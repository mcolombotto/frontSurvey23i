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
                    /* console.log(e.target.name);
                    console.log(e.target.value);
                    console.log(props.surveyItem); */
                    props.surveyItem.question = e.target.value;
                    props.setSurveyItem(props.surveyItem);
                    
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Select aria-label="Default select example"
                onChange={(e) => {

                    props.surveyItem.responseType = e.target.value;
                    props.setSurveyItem(props.surveyItem);
                    /* console.log(props.surveyItem)
                    props.surveyItem.responseType = "";
                    console.log(props.surveyItem) */
                  }}>
                  <option>Tipo de Respuesta</option>
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
                
                console.log("ARRAY" , props.surveyItemList);
                console.log("ITEM" ,props.surveyItem);
                props.setSurveyItemList([...props.surveyItemList,props.surveyItem]);
                console.log(props.surveyItemList);
                props.setSurveyItem({
                    question : "",
                    responseType : "",
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
