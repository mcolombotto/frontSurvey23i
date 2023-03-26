import React from "react";
import { FormGroup, ListGroupItem } from "react-bootstrap";

const SurveyItem = (props) => {
  return (
    <>
      <FormGroup>
        <ListGroupItem
          className="d-flex justify-content-between my-4 shadow-lg"
          placeholder="Escriba aqui el cuerpo de la pregunta"
          name="surveyItemName"
        >
          {" "}
          {props.data}{" "}
          
        {props.category}
            
          <div>
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
                </ListGroupItem>

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
      </FormGroup>
    </>
  );
};

export default SurveyItem;
