import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import { validateEmail, validatePassword } from "../../helpers/validateUser"

const Login = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const URL = process.env.REACT_APP_API_SURVEYS_USER;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    
    if (
      !validateEmail(inputs.email) ||
      !validatePassword(inputs.password)
    ) {
      Swal.fire("Oops!!", "Some data is invalid", "Error");
      return;
    }
   
    try {
       const res = await axios.post(`${URL}/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (res.status === 200) {
        Swal.fire("Ingreso exitoso!", "Su usuario ingresó satisfactoriamente.", "éxito");
    
        const data = res.data
        console.log(data);
    
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response?.data.message && setErrorMessage(error.response.data?.message)
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Login</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Link
            to="/auth/register"
            className="btn-primary text-decoration-none"
          >
            Registrar nuevo usuario
          </Link>
          <div className="text-center">
            <button className="btn-yellow">Enviar</button>
          </div>
        </Form>
        {error ? (
        <Alert variant="danger" onClick={() => setError(false)} dismissible>
          {errorMessage}
        </Alert>
      ) : null}
      </Container>
    </div>
  );
};

export default Login;
