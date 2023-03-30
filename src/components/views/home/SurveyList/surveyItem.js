import React from "react";
import Badge from "react-bootstrap/Badge";
import { ListGroup } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";

const SurveyItem = (props) => {
  return (
    <>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"> {props.data.question} </div>
         <div className="my-1">    
            Tipo de Respuesta : {props.data.responseType}
        </div>
        </div>
        <div className="my-auto">
          <button
            className=" btn btn-outline-warning me-0"
            onClick={(e) => {
              props.deleteSurveyItem(props.data);
            }}
          >
            Editar
          </button>
          <button
            className=" btn btn-outline-danger ms-2"
            onClick={(e) => {
              props.deleteSurveyItem(props.data);
            }}
          >
            {" "}
            Eliminar{" "}
          </button>
        </div>
      </ListGroup.Item>

      {/*    <Form.Control
          type="text"
          className="me-2"
          placeholder="Escriba aqui el cuerpo de la pregunta"
          name="surveyItemName"
          onChange={(e) => {props.setSurveyItem(e.target.value);
            console.log(e.target.value)
            console.log(props.surveyItemList);
          console.log(props.SurveyItemList);
        }}
          
        /> */}
    </>
  );
};

export default SurveyItem;
