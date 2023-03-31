import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Survey from "./Survey";
import {Button} from "react-bootstrap";

const SurveysTable = ({ surveys, URL, getApi }) => {
  return (
    <Container>
        <h1 className="text-center">Tabla de Encuestas</h1>
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/survey/createCategory"
          className="btn-red text-decoration-none text-center"
        > <Button variant="primary">
          Nueva Categoria
            
        </Button>
        </Link>
        <Link
          to="/survey/create"
          className="btn-red text-decoration-none text-center"
        > <Button variant="primary">
          Nueva Encuesta
            
        </Button>
        </Link>
      </div>
      <hr/>
      {/* Table of surveys */}
      {surveys?.length !== 0 ? (
        <Table bordered hover responsive className="align-middle mt-3">
          <thead>
            <tr>
              <th>Nombre de Encuesta</th>
              <th>Categoria</th>
              <th>Visible</th>
              <th>Acciones</th>
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
          {/* No products found message */}
          <h1> 🤷‍♂️No hay encuestas guardadas </h1>
        </div>
      )}
    </Container>
  );
};

export default SurveysTable;
