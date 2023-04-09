import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, FormControl } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import SurveyImage from "./image";

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
      console.log(survey);
    } catch (error) {
      console.log(URL, id);
      console.log("ERROR", error);
    }
  };
  
  console.log(survey.image)
  return (
    <Container>
      <h2 className=" text-light d-flex justify-content-center mt-4">
        {survey.surveyName}
      </h2>

      <Link
        to="/survey/table"
        className="d-flex justify-content-end text-decoration-none text-center"
      >
        <Button variant="outline-light">Volver </Button>
      </Link>
      <div className="text-light d-flex align-items-center justify-content-between">
        <SurveyImage source={survey.image}></SurveyImage>
        <p className="my-4 fs-4"> Categoria de encuesta : {survey.category}</p>
      </div>

      {survey.surveyItemList !== undefined ? (
        survey.surveyItemList.map((question, index, responseType) => (
          <SurveyPreview
            data={question}
            index={index}
            surveyItemList={survey.surveyItemList}
            responseType={responseType}
          ></SurveyPreview>
        ))
      ) : (
        <></>
      )}
      <ListGroup>
        <ListGroupItem className="text-light fw-bold">
          Por ultimo dejenos su correo para que las respuestas se envíen y pueda
          guardar un registro de ellas. (Opcional)
          <div className="d-flex justify-content-between">
            <Form.Control
              className="me-2 my-2"
              type="email"
              placeholder="name@example.com"
            />
            <Button className="mx-2 my-auto">Enviar</Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Container>
  );
};

export default SurveyDetails;
