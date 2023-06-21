import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import SurveyPreview from "./SurveyPreview";
import { ListGroupItem, ListGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SurveyRender = ({ URL }) => {
  const [survey, setSurvey] = useState({});
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const form = useRef();
  const navigate = useNavigate();
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

  const handleSendEmailChange = (event) => {
    setSendEmail(event.target.checked);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
      surveyLoaded.surveyAnswerList.forEach((answer, index) => {
        surveyLoaded.surveyAnswerList[index].push(answerItem[index]);
      });

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

      var answerContent = {
        author: JSON.parse(localStorage.getItem("user-token")).username,
        surveyName: surveyLoaded.surveyName,
        email: JSON.parse(localStorage.getItem("user-token")).email,
        content: `<body style="line-height:50%">
        <hr>
        <h2>Nombre de encuesta : ${surveyLoaded.surveyName}</h2>
        <h3>Categoria : ${surveyLoaded.category}</h3>
        ${surveyLoaded.surveyItemList
          .map((item, index) => {
            return `<h4>${index + 1} . ${item.question}</h4> 
            <p>${answerItem[index]}</p>
            `;
          })
          .join("")}
        `,
      };
    } catch (error) {}

    if (sendEmail) {
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID_CONTACT,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID_RESPONSE,
          answerContent,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            Swal.fire({
              text: sendEmail
                ? "Tus respuestas se almacenaron con éxito y se enviaron a " +
                  JSON.parse(localStorage.getItem("user-token")).email
                : "Tus respuestas se almacenaron con éxito",
              icon: "success",
              color: "#fff",
              background: "#000",
              confirmButtonColor: "#3085d6",
            });
            navigate("/");
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ha ocurrido un error al enviar el formulario. Intenta nuevamente.",
            });
          }
        );
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
        <Form ref={form} onSubmit={handleFormSubmit}>
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
