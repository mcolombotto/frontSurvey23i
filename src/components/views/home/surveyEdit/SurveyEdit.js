import React from "react";
import { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateCategory,
  validateSurveyName,
} from "../../../helpers/validateFields";
import axios from "../../../config/axiosInit";
import SurveyList from "../SurveyList/surveyList";

const SurveyEdit = ({ URL, getApi }) => {
  const [surveyItem, setSurveyItem] = useState({
    question: "",
    responseType: "",
  });
  const [surveyItemList, setSurveyItemList] = useState([]);

  const [survey, setSurvey] = useState({});

  const { id } = useParams();

  const surveyNameRef = useRef("");
  const categoryRef = useRef("");

  const navigate = useNavigate();

    // Borrar item de la lista de preguntas
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
    console.log("INICIO DE GETONE")

    try {
      const res = await axios.get(`${URL}/${id}`);
      const surveyApi = res.data;
      setSurvey(surveyApi);

    } catch (error) {
      console.log(error);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateSurveyName(surveyNameRef.current.value) ||
      !validateCategory(categoryRef.current.value)
    ) {
      Swal.fire("Ops!", "Some data is invalid.", "error");
      return;
    }
    //guardar el objeto
    const surveyUpdated = {
      surveyName: surveyNameRef.current.value,
      category: survey.category,
    };
    console.log("Edicion", surveyUpdated);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(`${URL}/${id}`, surveyUpdated);
          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Updated!", "Your file has been updated.", "success");
            getApi();
            navigate("/product/table");
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
        <h1>Editar Encuesta</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSurveyName">
            <Form.Label>Nombre de la Encuesta</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
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
              <option value={survey.category}>{survey.category}</option>
              <option value="Clima">Encuesta de Clima Laboral</option>
              <option value="Satisfaccion">Satisfaccion del Cliente</option>
              <option value="Servicio">Feedbackk de un servicio</option>
              <option value="Imagen">Imagen de un producto</option>
            </Form.Select>
          </Form.Group>

          <Form.Label className="my-3">Cuerpo de la Encuesta</Form.Label>

           {survey.surveyItemList !== undefined ? (
            <SurveyList
            surveyItemList={survey.surveyItemList}
            setSurveyItem={setSurveyItem}
            deleteSurveyItem={deleteSurveyItem}
            surveyItem={surveyItem}
          ></SurveyList>)
:(<></>) }
          <div className="text-end mt-2">
            <Button className="me-1" variant="secondary" >
              Volver
            </Button>
            <Button className="ms-1" variant="warning" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SurveyEdit;
