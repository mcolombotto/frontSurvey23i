import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import SurveyItem from "./surveyItem";

const SurveyList = (props) => {
  return (
    <ListGroup>
      {props.surveyItemList.map((question, index) => (
        <SurveyItem
          data={question}
          key={index}
          surveyItemList={props.surveyItemList}
          setSurveyItem={props.setSurveyItem}
          deleteSurveyItem={props.deleteSurveyItem}
        ></SurveyItem>
      ))}
    </ListGroup>
  );
};

export default SurveyList;
