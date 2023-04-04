import React from "react";
import { Container } from "react-bootstrap";
import SurveysTable from "../home/surveyTable/surveyTable";

const Admin = ({ surveys, URL, getApi }) => {
  return (
    <Container>
      <h2>Sitio del Administrador</h2>
      <SurveysTable surveys={surveys} URL={URL} getApi={getApi}></SurveysTable>
    </Container>
  );
};

export default Admin;
