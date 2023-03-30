import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SurveyPreview from "../SurveyList/surveyList";


const SurveyDetails = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSurveyById();
  }, []);

  const getSurveyById = async () => {
    try {
      const res = await fetch(`${URL}/${id}`);
      const surveyApi = await res.json();
      setSurvey(surveyApi);
      console.log(survey)
    } catch (error) {
      console.log(URL, id);
      console.log("ERROR", error);
    }
  };

  return (
    <Container>
      <h1>{survey.surveyName}</h1>

      <div className="d-flex align-items-center justify-content-between">
        <p className="mb-0 ms-4 fs-4 "> CATEGORIA : {survey.category}</p>

      </div>
      {survey.surveyName.surveyItemList}
    {/* <SurveyPreview survey={survey}>

    </SurveyPreview> */}
    </Container>
  );
};

export default SurveyDetails;
