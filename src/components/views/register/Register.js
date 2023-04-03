import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import { validateUsername, validateEmail, validatePassword } from '../../helpers/validateUser'

const Register = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const URL = process.env.REACT_APP_API_SURVEYS_USER

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
        !validateUsername(inputs.username) ||
        !validateEmail(inputs.email) ||
        !validatePassword(inputs.password)
      ) {
        Swal.fire("Oops!!", "Algún dato está incorrecto", "Error");
        return;
      }

    const newUser = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };
    try {
      const res = await axios.post(`${URL}/register`, newUser);
      console.log(res);
      if (res.status === 201) {
        Swal.fire("Creado!", "Tu usuario ha sido creado.", "éxito");
    
        const data = res.data 
        console.log(data);
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/survey/table");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message && setErrorMessage(error.response.data?.message)
    }
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username*</Form.Label>
            <Form.Control
              type="text"
              minlength="6"
              maxlength="100"
              placeholder="Ej: JohnDoe"
              required
              name="username"
              value={inputs.username || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
              placeholder="johndoe@gmail.com"
              required
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}"
              placeholder="Ej: Ingrese su password"
              required
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Link to="/auth/login" className="btn-primary text-decoration-none">
            Back to login
          </Link>
          <div className="text-center">
            <button className="btn-yellow">Send</button>
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

export default Register;
