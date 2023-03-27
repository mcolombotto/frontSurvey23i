import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import SurveyItem from "./surveyItem";

const SurveyList = (props) => {
  return (
    <ListGroup>
      {props.surveyItemList.map((question, index,responseType) => (
        <SurveyItem
          data={question}
          key={index}
          responseType = {responseType}
          surveyItemList={props.surveyItemList}
          setSurveyItem={props.setSurveyItem}
          deleteSurveyItem={props.deleteSurveyItem}
        ></SurveyItem>
      ))}
    </ListGroup>
  );
};

export default SurveyList;
