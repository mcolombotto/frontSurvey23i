import React from "react";
import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Survey from "./Survey";
import { Button } from "react-bootstrap";
import "./surveyTable.css";
const SurveysTable = ({ surveys, URL, getApi }) => {
  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="w-75 container">
      <Container className="text-light text-center">
        {JSON.parse(localStorage.getItem("user-token")).role == "admin" ? (
          <h2 className="my-3 ">Tabla de Encuestas</h2>
        ) : (
          <h2 className="my-3 ">
            Encuestas de{" "}
            {JSON.parse(localStorage.getItem("user-token")).username}
          </h2>
        )}
        <div className="d-flex align-items-center justify-content-between">
          {JSON.parse(localStorage.getItem("user-token")).role == "admin" ? (
            <Link
              to="/category/table"
              className="btn-red text-decoration-none text-center"
            >
              <Button variant="outline-light">Categorias</Button>
            </Link>
          ) : (
            <></>
          )}

          <Link
            to="/survey/create"
            className="btn-red text-decoration-none text-center"
          >
            {" "}
            <Button
              variant="outline-light"
              onClick={() => {
                localStorage.setItem("newSurveyItemList", JSON.stringify([]));
                localStorage.setItem("surveyName", JSON.stringify(""));
                localStorage.setItem("category", JSON.stringify(""));
              }}
            >
              Nueva Encuesta
            </Button>
          </Link>
        </div>
        <hr />
        {/* Table of surveys */}
        {surveys?.length !== 0 ? (
          <Table hover responsive className=" text-light align-middle mt-3">
            <thead>
              <tr>
                {JSON.parse(localStorage.getItem("user-token")).role ==
                "admin" ? (
                  <th>Autor</th>
                ) : (
                  <></>
                )}
                <th>Nombre de Encuesta</th>
                <th>Categoria</th>
                <th>Estado</th>
                <th>Acciones</th>
                <th>Respuestas</th>
              </tr>
            </thead>
            <tbody>
              {surveys?.filter((item)=>{ 
        return JSON.parse(localStorage.getItem("user-token")).role == "admin" ? 
         item :   item.author == JSON.parse(localStorage.getItem("user-token")).email
      }).map((survey) => (
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
            <h3> No hay encuestas guardadas </h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SurveysTable;
