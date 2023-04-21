import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import SurveyImage from "./image";

const SurveyRender = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getSurveyById();
  }, []);

  const getSurveyById = async () => {
    try {
      const res = await fetch(`${URL}/${id}`);
      const surveyApi = await res.json();
      setSurvey(surveyApi);
    } catch (error) {}
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormChanged(true);
  };

  const handleSendEmailChange = (event) => {
    setSendEmail(event.target.checked);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setFormChanged(false);

    const requiredFields = survey.surveyItemList.filter(
      (item) =>
        (item.responseType === "Texto Libre" ||
          item.responseType === "Cualitativa") &&
        !item.response
    );

    const unansweredItems = survey.surveyItemList.filter(
      (item) => item.response === null || item.response === undefined
    );

    if (requiredFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor responde en el campo de texto.",
      });
      return;
    } else if (unansweredItems.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor responde todas las preguntas.",
      });
      return;
    }
    if (sendEmail && !email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor ingrese un correo electrónico.",
      });
      return;
    }

    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await axios.post(url, {
      email,
      surveyResponses: survey.surveyItemList.map((item) => ({
        question: item.question,
        response:
          item.responseType === "Booleana" ||
          item.responseType === "Numerica" ||
          item.responseType === "Cualitativa"
            ? item.response === "on"
              ? item.responseType === "Booleana"
                ? "Si"
                : 5
              : item.responseType === "Booleana"
              ? "No"
              : 0
            : item.response,
      })),
    });

    if (sendEmail) {
      const mailgunUrl =
        "https://api.mailgun.net/v3/sandbox3bdc51ed5f66403d80153058350b705f.mailgun.org/messages";
      const mailgunApiKey =
        "d8927e180f6770486e2078af58ea2dea-81bd92f8-631340b6";
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
                          ? item.responseType === "Booleana"
                            ? "Si"
                            : 5
                          : item.responseType === "Booleana"
                          ? "No"
                          : 0
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

      Swal.fire({
        title: "Perfecto!",
        text: "Tus respuestas se han recibido correctamente.",
        icon: "success",
        confirmButtonText: "OK",
        showCancelButton: true,
        cancelButtonText: "Volver a inicio",
        footer:
          "Sus respuestas serán enviadas automáticamente al correo provisto.",
      }).then((result) => {
        if (result.isConfirmed) {
          setEmail("");
          setSendEmail(false);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/";
        } else if (
          result.dismiss === Swal.DismissReason.backdrop ||
          result.dismiss === Swal.DismissReason.esc
        ) {
          window.location.href = "/";
        }
      });
    } else {
      Swal.fire({
        title: "Perfecto!",
        text: "Tus respuestas se han recibido correctamente.",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: "Volver a inicio",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          setEmail("");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/";
        } else if (
          result.dismiss === Swal.DismissReason.backdrop ||
          result.dismiss === Swal.DismissReason.esc
        ) {
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <Container className="my-2">
      <h1 className="d-flex justify-content-center mt-4">
        {survey.surveyName}
      </h1>
      <p className="my-2 fs-5 d-flex justify-content-center">
        {" "}
        Categoría de encuesta : {survey.category}
      </p>

      <div className="survey-image d-flex justify-content-center">
        <SurveyImage source={survey.image}></SurveyImage>
      </div>

      {survey.surveyItemList !== undefined ? (
        <Form onSubmit={handleFormSubmit}>
          {survey.surveyItemList.map((question, index) => (
            <SurveyPreview
              data={question}
              index={index}
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
                  disabled={!sendEmail}
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

export default SurveyRender;
