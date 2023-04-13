import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'

/// Use of the local .json located in the surveyDetail folder - named: formsDb.json ONLY TEST PURPOSE
const formsDb = require("./formsDb.json");

const SurveyDetails = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

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

  const handleSendEmailChange = (event) => {
    setSendEmail(event.target.checked);
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
            ? item.responseType === "Booleana" ? "Si" : 5 
            : item.responseType === "Booleana" ? "No" : 0 
          : item.response, 
      })),
    });
    
    if (sendEmail) {
        const mailgunUrl = "https://api.mailgun.net/v3/sandbox3bdc51ed5f66403d80153058350b705f.mailgun.org/messages";
        const mailgunApiKey = "d8927e180f6770486e2078af58ea2dea-81bd92f8-631340b6";
        const mailgunFrom = "mailgunrollingcode@gmail.com";
        const mailgunTo = email;
        const mailgunSubject = "Tus respuestas de la Encuesta.";

        const mailgunHtml = `
          <html>
            <body>
              <h3>Respuestas:</h3>
              <ul>
                ${survey.surveyItemList
                  .map(
                    (item) => `
                  <li>
                    <strong>${item.question}</strong>: 
                    ${
                      item.responseType === "Booleana"
                        ? item.response === "on"
                          ? item.responseType === "Booleana" ? "Si" : 5 
                          : item.responseType === "Booleana" ? "No" : 0 
                        : item.response 
                    }
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </body>
          </html>
        `;

      /*
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
 
        console.log(response2.data);
     */

        Swal.fire({
          title: 'Perfecto!',
          text: 'Tus respuestas se han recibido correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          footer: 'Sus respuestas seran enviadas automaticamente al correo provisto.'
        }).then((result) => {
          if (result.isConfirmed) {
            setEmail('');
            setSendEmail(false);
          }
        });
      } else {
        Swal.fire({
          title: 'Perfecto!',
          text: 'Tus respuestas se han recibido correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            setEmail('');
          }
        });
      }
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
          <div className="form-check my-auto">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(event) => setSendEmail(event.target.checked)}
                  id="sendEmailCheckbox"
                />
                <label className="form-check-label" htmlFor="sendEmailCheckbox">
                  ¿Quieres enviar las respuestas a tu correo?
                </label>
              </div>
            <div className="d-flex justify-content-between">
              <Form.Control
                className="me-2 my-2"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
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