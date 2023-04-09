import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Survey from "./Survey";
import {Button} from "react-bootstrap";
import "./surveyTable.css"
const SurveysTable = ({ surveys, URL, getApi }) => {

  return (
      <div className="w-75 container">
        
    <Container className="text-light text-center">
        <h2 className="my-3 ">Tabla de Encuestas</h2>
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/category/table"
          className="btn-red text-decoration-none text-center"
          > <Button variant="outline-light">
          Categorias
            
        </Button>
        </Link>
        <Link
          to="/survey/create"
          
          className="btn-red text-decoration-none text-center"
        > <Button variant="outline-light"
          onClick={()=>{
            localStorage.setItem("newSurveyItemList", JSON.stringify([]));
          localStorage.setItem("surveyName", JSON.stringify(""));
          localStorage.setItem("category", JSON.stringify(""))}}>
          Nueva Encuesta
            
        </Button>
        </Link>
      </div>
      <hr/>
      {/* Table of surveys */}
      {surveys?.length !== 0 ? (
        <Table hover responsive className=" text-light align-middle mt-3">
          <thead>
            <tr>
              <th>Nombre de Encuesta</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Respuestas</th>
            </tr>
          </thead>
          <tbody>
            {surveys?.map((survey) => (
              <Survey
              key={survey._id}
                survey={survey}
                URL={URL}
                getApi={getApi}
                />
                ))}
          </tbody>
        </Table>
      ) : (
        <div className="no-products-found d-flex align-items-center justify-content-center">

          <h1> 🤷‍♂️No hay encuestas guardadas </h1>
        </div>
      )}
    </Container>
      </div>
  );
};

export default SurveysTable;
