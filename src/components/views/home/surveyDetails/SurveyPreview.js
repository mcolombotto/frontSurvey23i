import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";

const SurveyPreview = ({ data, onResponseChange }) => {
  const handleResponseChange = (event) => {
    const answer = { question: data.question, response: event.target.value };
    onResponseChange(answer);
  };

  return (
    <ListGroup>
      <ListGroupItem>
        <div className="fw-bold">{data.question}</div>
        <div>
          <AnswerItem type={data.responseType} onChange={handleResponseChange} />
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

export default SurveyPreview;