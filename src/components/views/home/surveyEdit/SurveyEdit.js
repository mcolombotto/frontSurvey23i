import React from "react";
import { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateImage,
  validateSurveyName,
} from "../../../helpers/validateFields";
import axios from "../../../config/axiosInit";
import SurveyList from "../SurveyList/surveyList";
import SurveyModal from "../modal/surveyModal";

const SurveyEdit = ({ URL, getApi, categoryItemList, categoryItem }) => {
  const [surveyItem, setSurveyItem] = useState({
    question: "",
    responseType: "",
  });
  const [surveyItemList, setSurveyItemList] = useState([]);

  const [survey, setSurvey] = useState({});

  const { id } = useParams();

  const surveyNameRef = useRef("");
  const surveyImageRef = useRef("");

  const navigate = useNavigate();

  const deleteSurveyItem = (itemName) => {
    let filteredArray = surveyItemList.filter(
      (surveyItem) => surveyItem !== itemName
    );
    setSurveyItemList(filteredArray);
  };

  useEffect(() => {
    console.log("Useefect");
    getOne();
  }, []);

  const getOne = async () => {
    console.log("INICIO DE GETONE");

    try {
      const res = await axios.get(`${URL}/${id}`);
      const surveyApi = res.data;
      setSurvey(surveyApi);
      setSurveyItemList(surveyApi.surveyItemList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    console.log("INICIO DEL SUBMIT");
    e.preventDefault();

    if (!validateSurveyName(surveyNameRef.current.value)) {
      Swal.fire({
        title:"Ops!",
        text:"Alguno de los datos es invalido",
        icon:"error",
        color: "#fff",
        background: "#000",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const surveyUpdated = {
      surveyName: surveyNameRef.current.value,
      category: survey.category,
      image:
        surveyImageRef.current.value == ""
          ? "https://www.caf.com/media/3381584/encuesta.png"
          : surveyImageRef.current.value,
      status: false,
      surveyItemList: surveyItemList,
    };
    console.log("Edicion", surveyUpdated);

    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accíon guardará los cambios en la encuesta",
      icon: "warning",
      color: "#fff",
      background: "#000",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(`${URL}/${id}`, surveyUpdated);
          console.log(res.data);

          if (res.status === 200) {
            Swal.fire({
              title:"Modificada!",
              text:"Se modificó la encuesta con éxito",
              icon:"success",
              color: "#fff",
              background: "#000",
              confirmButtonColor: "#3085d6",}
            );
            getApi();
            navigate("/survey/table");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <div className="d-flex justify-content-between text-light ">
          <h2>Editar una encuesta existente</h2>
          <Link
            to="/survey/table"
            className="m-2 btn-red text-decoration-none text-center"
          >
            <Button className="text-light" variant="outline-light">
              Volver{" "}
            </Button>
          </Link>
          {/*  */}
        </div>

        <Form className="my-5 text-light" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSurveyName">
            <Form.Label>Nombre de la Encuesta</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              maxLength="50"
              defaultValue={survey.surveyName}
              ref={surveyNameRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={survey.category}
              onChange={({ target }) =>
                setSurvey({ ...survey, category: target.value })
              }
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
                defaultValue={survey.image}
                placeholder="http://www.google.com/img"
                maxLength="200"
                ref={surveyImageRef}
              />
            </Form.Group>
          </Form.Group>
          <Form.Label className="my-3">Cuerpo de la Encuesta</Form.Label>

          {survey.surveyItemList !== undefined ? (
            <SurveyList
              surveyItemList={surveyItemList}
              setSurveyItem={setSurveyItem}
              deleteSurveyItem={deleteSurveyItem}
              surveyItem={surveyItem}
            ></SurveyList>
          ) : (
            <></>
          )}
          <div className="text-end mt-2">
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

export default SurveyEdit;
