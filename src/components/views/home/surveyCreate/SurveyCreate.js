import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import {
  validateSurveyName,
  validateImage,
} from "../../../helpers/validateFields";
import { Container, Form, Button, FormGroup } from "react-bootstrap";
import SurveyList from "../SurveyList/surveyList";
import SurveyModal from "../modal/surveyModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./surveyCreate.css";

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

  const [answerList, setAnswerList] = useState([]);

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


      console.log("Validacion name",validateSurveyName(inputs.surveyName));
      console.log("Validacion img",validateImage(inputs.surveyImage));
    if (
      !validateSurveyName(inputs.surveyName) &&
      !validateImage(inputs.surveyImage)
    ) {
      Swal.fire("Oops!!", "Alguno de los datos es invalido", "Error");
      return;
    }

    const newSurvey = {
      surveyName: inputs.surveyName,
      category: inputs.category,
      image: inputs.surveyImage,
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
      color: "#fff",
      background: "#000",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(result.isConfirmed, "Enviando a BD", URL);
          const res = await axios.post(URL, newSurvey);
          console.log(res.status, res.status === 201);

          if (res.status === 201) {
            Swal.fire(
              "Creación Exitosa",
              "La encuesta se guardó de forma satisfactoria",
              "success"
            );

            getApi();

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
    <div>
      <Container className="py-5 w-75">
        <div className="d-flex justify-content-between  ">
          <h2 className=" text-center text-light">Crear una nueva encuesta</h2>
          <Link
            to="/survey/table"
            className="m-2 btn-red text-decoration-none text-center"
          >
            <Button variant="outline-light">Volver </Button>
          </Link>

          {/*  */}
        </div>
        <hr />
        <Form className="my-5 text-light" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Text">
            {" "}
            <Form.Label>Nombre de la encuesta</Form.Label>
            <Form.Control
              type="text"
              name="surveyName"
              maxLength="50"
              required
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

            <Form.Group className="my-3" controlId="Text">
              {" "}
              <Form.Label>Imagen descriptiva de la encuesta </Form.Label>
              <Form.Control
                type="text"
                name="surveyImage"
                placeholder="http://www.google.com/img"
                maxLength="100"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
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
            <SurveyModal
              surveyItemList={surveyItemList}
              setSurveyItem={setSurveyItem}
              surveyItem={surveyItem}
              setSurveyItemList={setSurveyItemList}
              handleSubmit={handleSubmit}
            ></SurveyModal>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SurveyCreate;
