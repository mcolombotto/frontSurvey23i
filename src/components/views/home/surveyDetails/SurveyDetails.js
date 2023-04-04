import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";

/// Use of the local .json located in the surveyDetail folder - named: formsDb.json ONLY TEST PURPOSE
const formsDb = require("./formsDb.json");

const SurveyDetails = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const [email, setEmail] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getSurveyById();
  }, []);

/// Use of the local .json located in the surveyDetail folder - named: formsDb.json ONLY TEST PURPOSE
  const getSurveyById = async () => {
    try {
      const surveyData = formsDb.find((form) => form._id === id);
      setSurvey(surveyData);
    } catch (error) {
      console.log("ERROR", error);
    }
  };


/*
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
*/

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.post(url, {
      email,
      surveyResponses: survey.surveyItemList.map((item) => ({
        question: item.question,
        response: item.responseType === "Booleana" || item.responseType === "Numerica" || item.responseType === "Cualitativa"
          ? item.response === "on"
            ? item.responseType === "Booleana" ? "Si" : 5 // Replace with desired response text or number
            : item.responseType === "Booleana" ? "No" : 0 // Replace with desired response text or number
          : item.response, // For other response types, use the original response value
      })),
    });
  
    const mailgunUrl =
    "https://api.mailgun.net/v3/sandbox19ed54cb95c544c4832d80a838309fbe.mailgun.org/messages";
  const mailgunApiKey = "204945b9025053ccc865c2593fe89515-81bd92f8-badfa5dd";
  const mailgunFrom = "mailgunrollingcode@gmail.com";
  const mailgunTo = email;
  const mailgunSubject = "Survey Responses";

  const mailgunHtml = `
    <html>
      <body>
        <h3>Survey Responses</h3>
        <ul>
          ${survey.surveyItemList
            .map(
              (item) => `
            <li>
              <strong>${item.question}</strong>: 
              ${
                item.responseType === "Booleana"
                  ? item.response === "on"
                    ? item.responseType === "Booleana" ? "Si" : 5 // Replace with desired response text or number
                    : item.responseType === "Booleana" ? "No" : 0 // Replace with desired response text or number
                  : item.response // For other response types, use the original response value
              }
            </li>
          `
            )
            .join("")}
        </ul>
      </body>
    </html>
  `;

  const response2 = await axios.post(
    mailgunUrl,
    new URLSearchParams({
      from: mailgunFrom,
      to: mailgunTo,
      subject: mailgunSubject,
      html: mailgunHtml,
    }),
    {
      headers: {
        Authorization: `Basic ${btoa(`api:${mailgunApiKey}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log(response.data);
  setEmail("");
};
  
  return (
    <Container>
      <h1 className="d-flex justify-content-center mt-4">
        {survey.surveyName}
      </h1>

      <div className="d-flex align-items-center justify-content-between">
        <p className="my-4 fs-4"> Categoria de encuesta : {survey.category}</p>
      </div>

      {survey.surveyItemList !== undefined ? (
        <Form onSubmit={handleFormSubmit}>
          {survey.surveyItemList.map((question, index) => (
            <SurveyPreview
              data={question}
              key={`question_${index}`}
              onResponseChange={(answer) =>
                setSurvey((prevSurvey) => ({
                  ...prevSurvey,
                  surveyItemList: prevSurvey.surveyItemList.map((item, i) =>
                    i === index ? { ...item, response: answer.response } : item
                  ),
                }))
              }
            />
          ))}
          <ListGroup>
            <ListGroupItem className="fw-bold">
              Por ultimo dejenos su correo para que las respuestas se evíen y pueda guardar un registro de ellas. (Opcional)
              <div className="d-flex justify-content-between">
                <Form.Control
                  className="me-2 my-2"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <Button className="mx-2 my-auto" type="submit">
                  Enviar
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Form>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SurveyDetails;
