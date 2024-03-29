import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { ListGroup, Button } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";
import ModalEdit from "../modal/surveyModalEdit";
import "./surveyItem.css";

const SurveyItem = (props) => {
  return (
    <>
      <ListGroup.Item
        as="li"
        className="text-light d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"> {props.data.question} </div>
          <div className="my-1">
            Tipo de Respuesta : {props.data.responseType}
          </div>
        </div>
        <div className="my-auto d-flex justify-content-between">
          <ModalEdit
            surveyItemList={props}
            question={props.data.question}
          ></ModalEdit>

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
    </>
  );
};

export default SurveyItem;
