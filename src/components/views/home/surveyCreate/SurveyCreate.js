import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import {
  validateSurveyName,
  validateCategory,
} from "../../../helpers/validateFields";
import { Container, Form, Button, FormGroup } from "react-bootstrap";
import SurveyList from "../SurveyList/surveyList";
import SurveyModal from "../modal/surveyModal";
import "bootstrap/dist/css/bootstrap.min.css";

const SurveyCreate = ({ URL, getApi, categoryItemList, categoryItem }) => {
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(true);

  //Preguntas
  const [surveyItem, setSurveyItem] = useState({
    question: "",
    responseType: "",
  });
  const [surveyItemList, setSurveyItemList] = useState(
    JSON.parse(localStorage.getItem("newSurveyItemList")) || []
  );
  //Respuestas
  const [answerList, setAnswerList] = useState([]);

  // Borrar item de la lista de preguntas
  const deleteSurveyItem = (itemName) => {
    let filteredArray = surveyItemList.filter(
      (surveyItem) => surveyItem !== itemName
    );
    setSurveyItemList(filteredArray);
    localStorage.setItem("newSurveyItemList", JSON.stringify(filteredArray));
    console.log("se borra en LS");
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log("Change", event.target.name, event.target.value);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    localStorage.setItem(event.target.name, JSON.stringify(value));
  };

  const handleSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();

    //validar los campos
    if (
      !validateSurveyName(inputs.surveyName) /* ||
      !validateCategory(inputs.category) */
    ) {
      Swal.fire("Oop!!", "Some data is invalid", "Error");
      return;
    }
    //enviar datos
    const newSurvey = {
      surveyName: inputs.surveyName,
      category: inputs.category,
      status: false,
      surveyItemList: surveyItemList,
    };
    console.log("surveyItemList", surveyItemList);
    console.log("newSurvey", newSurvey);

    Swal.fire({
      title: "Estas Seguro?",
      text: "Esta acción guardará tu progreso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          /*  const res = await fetch(URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("user-token")).token
              },
              body: JSON.stringify(newProduct),
            }); */

          console.log(result.isConfirmed, "Enviando a BD", URL);
          const res = await axios.post(
            URL,
            newSurvey /* , {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                  .token,
              },
            } */
          );
          console.log(res.status, res.status === 201);

          if (res.status === 201) {
            Swal.fire(
              "Creación Exitosa",
              "La encuesta se guardó de forma satisfactoria",
              "success"
            );
            //resetear el form
            /*  e.target.reset(); */
            //recargar la tabla
            getApi();
            //navegar hasta la tabla
            navigate("/survey/table");
          }
        } catch (error) {
          console.log(error);
          error.response.data?.message &&
            setErrorMessage(error.response.data?.message);
          error.response.data.errors.length > 0 &&
            error.response.data.errors?.map((error) =>
              setErrorMessage(error.msg)
            );
          setShow(true);
        }
      }
    });
  };

  return (
    <div className>
      <Container className="py-5">
        <div className="d-flex justify-content-between  ">

        <h1>Crear una nueva encuesta</h1>
        <Link to="/survey/table"
                  
                  className="m-2 btn-red text-decoration-none text-center"
                >
                  
                  <Button variant="secondary" >Volver </Button>
                </Link>{/*  */}
        </div>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Text">
            {" "}
            {/* Nombre */}
            <Form.Label>Nombre de la encuesta</Form.Label>
            <Form.Control
              type="text"
              name="surveyName"
              value={JSON.parse(localStorage.getItem("surveyName"))}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              name="category"
              value={JSON.parse(localStorage.getItem("category"))}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {categoryItemList.map((categoryItem) => {
                return categoryItem.categoryStatus ? (
                  <option value={categoryItem.categoryName}>
                    {categoryItem.categoryName}{" "}
                  </option>
                ) : (
                  <></>
                );
              })}
            </Form.Select>

            <FormGroup>
              <hr></hr>
              {
                <SurveyList
                  surveyItemList={surveyItemList}
                  setSurveyItem={setSurveyItem}
                  deleteSurveyItem={deleteSurveyItem}
                  surveyItem={surveyItem}
                  setSurveyItemList={setSurveyItemList}
                ></SurveyList>
              }
            </FormGroup>
          </Form.Group>
          <div className="text-end">
            {/* <Button
              className="mx-1"
              variant="primary"
               onClick={(e) => {
                e.preventDefault();

                setSurveyItemList([...surveyItemList, surveyItem]);
                setSurveyItem(""); 
               
            >
              Agregar nueva pregunta
            </Button> */}
            <SurveyModal
              surveyItemList={surveyItemList}
              setSurveyItem={setSurveyItem}
              surveyItem={surveyItem}
              /* setCategoryItem={setCategoryItem}
              categoryItem={categoryItem} */
              setSurveyItemList={setSurveyItemList}
              handleSubmit={handleSubmit}
            ></SurveyModal>
            {/* <Button className="ms-3" variant="danger" type="submit">
              Save
            </Button> */}
          </div>
        </Form>
        {/* {show && (
          <Alert
            key={errorMessage}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )} */}
      </Container>
    </div>
  );
};

export default SurveyCreate;
