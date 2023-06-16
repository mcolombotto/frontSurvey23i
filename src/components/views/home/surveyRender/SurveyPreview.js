import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AnswerItem from "../../items/answerItem";
import "./surveyPreview.css";

var arr = [];

const SurveyPreview = ({ data, index,key, setAnswerItem }) => {
  
  const handleChange = (e) => {
    arr[index] = e.target.value;
    console.log(arr);

    setAnswerItem(arr);
  };
  return (
    <ListGroup className="">
      <ListGroupItem className="py-3">
        <div  className="m-3 text-light  text fw-bold">

          <label name={key} value={`${index+1}.${data.question}`}>
          {index + 1}. {data.question}
          </label>

          
        </div>
        <div>
          <AnswerItem
            name={`answer_${index}`}
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
