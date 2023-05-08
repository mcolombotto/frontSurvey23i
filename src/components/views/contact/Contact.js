import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";
import "./Contact.css";
import Swal from "sweetalert2";

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState("");

    const URL = process.env.REACT_APP_API_SURVEYS_CONTACT || '';

    const onSubmit = async (data) => {
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message
                }),
            });

            if (res.status === 200) {
                reset((formValues) => ({
                    ...formValues,
                    name: "",
                    email: "",
                    message: "",
                }));

                Swal.fire({
                    text: message,
                    icon: "success",
                    color: "#fff",
                    background: "#000",
                    confirmButtonColor: "#3085d6",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error al enviar el formulario. Intenta nuevamente.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido un error al enviar el formulario. Intenta nuevamente.",
            });
        }
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
                        className="my-5 form col-sm-8 col-lg-6"
                        onSubmit={handleSubmit(onSubmit)}
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
                                <span className="error">Este campo tiene un máximo de 100 letras</span>
                            )}
                            {errors.name && errors.name.type === "pattern" && (
                                <span className="error">
                                    En este campo solo puedes ingresar letras.
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
                                    Este campo tiene un máximo de 100 caracteres.
                                </span>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <span className="error">
                                    El correo tiene un formato incorrecto. Formato esperado:
                                    email@email.com{" "}
                                </span>
                            )}
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
                                onChangeCapture ={(e) => setMessage(e.target.value)}
                                {...register("message", {
                                    required: true,
                                })}
                            >
                            </textarea>
                           
                            {errors.message && errors.message.type === "required" && (
                                <span className="error">Este campo es requerido. </span>
                            )}
                            <div class="alert alert-warning mt-1">
                                <p>
                                    Te quedan {550 - message?.length} caracteres para utilizar en tu mensaje.
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