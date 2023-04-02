import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";

const SurveyPreview = (props) => {
  
  return (
    <ListGroup>
      <ListGroupItem > 
      <div className="fw-bold">
        {props.data.question} 
        </div>
      <div>
      <AnswerItem
      type = {props.data.responseType}></AnswerItem>

      </div>
     </ListGroupItem>
     

    </ListGroup>
  );
};

export default SurveyPreview;