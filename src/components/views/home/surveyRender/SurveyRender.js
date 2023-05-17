import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";


const SurveyRender = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const [answerItem, setAnswerItem] = useState([]);
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

    const completeFields = () => {
      return survey.surveyItemList.length == answerItem.length &&
        !answerItem.includes(undefined)
        ? true
        : false;
    };

    if (!completeFields()) {
      Swal.fire({
        icon: "error",
        color: "#fff",
        background: "#000",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        title: "Error",
        text: "Por favor responde todas las preguntas.",
      });
      return;
    } 
      try {
        const res = await axios.get(`${URL}/${id}`);
        let surveyLoaded = res.data;
        surveyLoaded.surveyAnswerList.forEach((answer,index)=>{
          surveyLoaded.surveyAnswerList[index].push(answerItem[index])
        })
  
        console.log(surveyLoaded)

        const updatedAnswerItem = survey.surveyItemList.map((item, index) => {
          return {
            question: item.question,
            response: answerItem[index],
          };
        });
        setAnswerItem(updatedAnswerItem);

        await axios.put(`${URL}/${id}`, surveyLoaded, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("user-token"))
              .token,
          },
        });
      } catch (error) {}



    if (sendEmail) {
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
      const mailgunUrl = process.env.REACT_APP_MAILGUN_URL;
      const mailgunApiKey = process.env.REACT_APP_MAILGUN_API_KEY;
      const mailgunFrom = process.env.REACT_APP_MAILGUN_FROM;       
      const mailgunTo = email;
      const mailgunSubject = "Tus respuestas de la Encuesta.";

      const mailgunHtml = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
          </style>
        </head>
        <body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f5f5f5; margin: 0;">
          <div style="background-color: #f5f5f5; padding: 20px 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #f0f0f0; padding: 20px;">
                <h1 style="color: #333333; margin: 0; text-align: center;">WorldSurveys</h1>
              </div>
              <div style="padding: 20px;">
                <h3 style="color: #333333; margin-top: 0;">Respuestas:</h3>
                <ul style="list-style-type: none; padding: 0;">
                  ${survey.surveyItemList
                    .map(
                      (item, index) => `
                    <li style="margin-bottom: 10px;">
                      <strong style="font-weight: bold;">${item.question}</strong>: ${answerItem[index]}
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
              <div style="background-color: #f0f0f0; padding: 20px;"></div>
            </div>
          </div>
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

      Swal.fire({
        title: "Perfecto!",
        text: "Tus respuestas se han recibido correctamente.",
        icon: "success",
        color: "#fff",
        background: "#000",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Volver a inicio",
        showCancelButton: false,
        footer:
          "Sus respuestas serán enviadas automáticamente al correo provisto.",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
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
        color: "#fff",
        background: "#000",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
      <h1 className="d-flex text-light justify-content-center mt-4">
        {survey.surveyName}
      </h1>

      <p className="my-2 text-light fs-5 d-flex justify-content-center">
        {" "}
        Categoría de encuesta : {survey.category}
      </p>
      <Link
        to="/"
        className="d-flex justify-content-end text-decoration-none text-center"
      >
        <Button variant="outline-light">Volver </Button>
      </Link>
      <hr></hr>

      {survey.surveyItemList !== undefined ? (
        <Form onSubmit={handleFormSubmit}>
          {survey.surveyItemList.map((question, index) => (
            <SurveyPreview
              setAnswerItem={setAnswerItem}
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
              <div className="d-flex justify-content-end">
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