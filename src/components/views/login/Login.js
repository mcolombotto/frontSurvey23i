import React, { useContext, useState } from "react";
import UserContext from "../../layout/context/UserContext";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import "./Login.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = ({ getApi, setLoggedUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [typeInput, setTypeInput] = useState("password");

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_SURVEYS_LOGIN;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const response = await res.json();
      const { token, uid, username, message } = response;

      if (res.status === 200) {
        reset((formValues) => ({
          ...formValues,
          email: "",
          password: "",
        }));

        localStorage.setItem("user-token", JSON.stringify(response));

        context.setUser({
          uuid: uid,
          username,
          email: data.email,
          estate: true,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJt3kjJp8q750SzS-kr7cMITugGpEh-Vdq0NeWS4&s",
        });

        setLoggedUser(true);

        Swal.fire({
          text: message,
          icon: "success",
          color: "#fff",
          background: "#000",
          confirmButtonColor: "#3085d6",
        });
        return setTimeout(() => {
          getApi();
          navigate("/");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          color: "#fff",
          background: "#000",
          confirmButtonColor: "#3085d6",
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
    <div className="login">
      <Container className="py-5 ">
        <div className="row justify-content-center">
          <div className="mb-3">
            <h1 className="text-center text-light">Ingresar</h1>
          </div>
          <form
            className="my-5 form col-sm-8 col-lg-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <Form.Label>
                Email<span className="text-danger font-weight-bold">*</span>
              </Form.Label>
              <input
                className="form-control "
                type="email"
                placeholder="Ej: John_Perez@email.com"
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
                  Este campo tiene un máximo de 60 caracteres
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
              <Form.Label>
                Contraseña
                <span className="text-danger font-weight-bold">*</span>
              </Form.Label>
              <input
                className="form-control "
                type={typeInput}
                {...register("password", {
                  required: true,
                  maxLength: 100,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,90}/,
                })}
              />
              <button
                type="button"
                className="position-absolute  buttonPosition btn"
                onClick={() => {
                  typeInput === "password"
                    ? setTypeInput("text")
                    : setTypeInput("password");
                }}
              >
                {typeInput === "password" ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && errors.password.type === "required" && (
                <span className="error">Este campo es requerido. </span>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <span className="error">
                  {" "}
                  Este campo tiene un máximo de 90 caracteres
                </span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="error">
                  La contraseña tiene un formato incorrecto.
                </span>
              )}
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

export default Login;
