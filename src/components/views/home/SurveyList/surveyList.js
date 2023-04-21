import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import SurveyItem from "./surveyItem";

const SurveyList = (props) => {
  return (
    <ListGroup as="ol" numbered>
      {props.surveyItemList.map((question, index, responseType) => (
        <SurveyItem
          data={question}
          key={index}
          responseType={responseType}
          surveyItemList={props.surveyItemList}
          setSurveyItem={props.setSurveyItem}
          deleteSurveyItem={props.deleteSurveyItem}
          surveyItem={props.surveyItem}
          setSurveyItemList={props.setSurveyItemList}
        ></SurveyItem>
      ))}
    </ListGroup>
  );
};

export default SurveyList;
