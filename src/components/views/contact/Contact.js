import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import "./Contact.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const form = useRef();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID_CONTACT,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_CONTACT,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          Swal.fire({
            text: "Tu consulta fue enviada con exito",
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
  };

  return (
    <div className="contact">
      <Container className="py-5 ">
        <div className="row justify-content-center">
          <div className="mb-3 text-light text-center">
            <h1>Contacto</h1>
            <h2 className="mt-4 fst-italic">
              Si deseas contactarte con "WorldSurvey" rellena este formulario.
            </h2>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="my-5 form col-sm-8 col-lg-6"
          >
            <div className="mb-3">
              <Form.Label>
                Ingresa tu nombre
                <span className="text-danger font-weight-bold">*</span>{" "}
              </Form.Label>
              <input
                className="form-control "
                placeholder="Ej: Juan Perez"
                maxLength={100}
                name="user_name"
                required = "true"
              />
            </div>
            <div className="mb-3">
              <Form.Label>
                Ingresa tu email
                <span className="text-danger font-weight-bold">*</span>
              </Form.Label>
              <input
                className="form-control "
                type="email"
                placeholder="Ej: John_Perez@email.com"
                maxLength={100}
                name="user_email"
                pattern= "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                required = "true"
              />
            </div>
            <div className="mb-3 position-relative d-flex flex-column">
              <Form.Label>
                Ingresa tu mensaje
                <span className="text-danger font-weight-bold">*</span>
              </Form.Label>
              <textarea
                className="form-control flex-column form-control-lg"
                maxLength={550}
                rows={7}
                name="message"
                required = "true"
                onChangeCapture={(e) => setMessage(e.target.value)}
                
              ></textarea>

              <div class="alert alert-warning mt-1">
                <p>
                  Te quedan {550 - message?.length} caracteres para utilizar en
                  tu mensaje.
                </p>
              </div>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
