import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import "./Contact.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  //TODO variable de entorno?
  //const URL = process.env.REACT_APP_API_SURVEYS_Contact;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      console.log(res);
     // TODO VA? 
     //const response = await res.json();
      //const { token, uid, username, message } = response;

      if (res.status === 200) {
        reset((formValues) => ({
          ...formValues,
          name: "",
          email: "",
          //TODO TEXTAREA
        }));

        //TODO VA LOCASTORAGE?
        // localStorage.setItem("user-token", JSON.stringify(response));

        Swal.fire(); //MENSAJE ESTABA COMO PROP
        return setTimeout(() => {
          //FUNCION QUE MANDA EL CORREO? ENVIO DE FORMULARIO
          navigate("/");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
            text: "Ha ocurrido un error!", //message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error!",
      });
    }
  };

  return (
    <div className="contact">
      <Container className="py-5 ">
        <div className="row justify-content-center">
          <div className="mb-3">
            <h1 className="text-center main-title">Contact</h1>
            <h2 className="text-center">
              Si deseas contactarte con "WorldSurvey" rellena este formulario.
            </h2>
          </div>
          <form
            className="my-5 form col-sm-8 col-lg-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <h3 className="main-title">Contactanos</h3>
            </div>
            <div className="mb-3">
              <Form.Label>
                Ingresa tu nombre
                <span className="text-danger font-weight-bold">*</span>{" "}
              </Form.Label>
              <input
                className="form-control "
                placeholder="Ej: John Perez"
                maxLength={100}
                {...register("name", {
                  required: true,
                  maxLength: 100,
                  pattern: /^[A-Za-z\s?]+$/,
                })}
              />

              {errors.name && errors.name.type === "required" && (
                <span className="error">Este campo es requerido. </span>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <span className="error">Este campo tiene un maximo de 100 </span>
              )}
              {errors.name && errors.name.type === "pattern" && (
                <span className="error">
                  En este campo solo puedes ingresar letras
                </span>
              )}
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
                {...register("email", {
                  required: true,
                  maxLength: 100,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="error">Este campo es requerido. </span>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <span className="error">
                  Este campo tiene un maximo de 100 caracteres
                </span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="error">
                  El correo tiene un formato incorrecto. Formato esperado:
                  email@email.com{" "}
                </span>
              )}
            </div>
                <div className="mb-3 position-relative">
                    <Form.Label>Selecciona tu sexo</Form.Label>
                    <select className="btn" {...register("gender")}>
                        <option value="female">Femenino</option>
                        <option value="male">Masculino</option>
                        <option value="other">Otros</option>
                    </select>
                </div>
            <div className="mb-3 position-relative d-flex flex-column">
              <Form.Label>Ingresa tu mensaje</Form.Label>
              <textarea
                className="form-control flex-column form-control-lg"
                name="postContent"
                maxLength={750}
                rows={10}
                cols={40}
              ></textarea>
              
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
