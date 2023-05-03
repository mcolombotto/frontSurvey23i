import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";
import "./surveyPreview.css";
import { useState } from "react";

var arr=[];

const SurveyPreview = ({ data, index, onResponseChange, setAnswerItem }) => {
  const handleResponseChange = (event) => {
    const answer = { question: data.question, response: event.target.value };
    onResponseChange(answer);
  };


  const handleChange = (e) => {


    arr[index] = e.target.value;
    console.log(arr)




    setAnswerItem(arr)
  };
  return (
    <ListGroup className="">
      <ListGroupItem className="py-3">
        <div className="m-3 text-light  text fw-bold">
          {index + 1}. {data.question}
        </div>
        <div>
          <AnswerItem
            type={data.responseType}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
      </ListGroupItem>
    </ListGroup>
  );
};

export default SurveyPreview;
