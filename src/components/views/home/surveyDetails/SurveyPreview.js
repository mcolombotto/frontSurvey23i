import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";
import "./surveyPreview.css"

const SurveyPreview = ({ data,index, onResponseChange }) => {
  const handleResponseChange = (event) => {
    const answer = { question: data.question, response: event.target.value };
    onResponseChange(answer);
  };
console.log(index);
  return (
    <ListGroup>
      <ListGroupItem>
        <div className="text-light fw-bold">{index+1}. {data.question}</div>
        <div>
          <AnswerItem type={data.responseType} onChange={handleResponseChange} />
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

export default SurveyPreview;