import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Category from "./category";

const CategoryTable = ({ categoryItem, categoryItemList }) => {
  return (
    <Container>
      <h1 className="text-center">Tabla de Categorias</h1>
      <div className="d-flex align-items-center justify-content-between">

        <Link
          to="/survey/createCategory"
          className="btn-red text-decoration-none text-center"
        >
          {" "}
          <Button variant="primary">Nueva Categoria</Button>
        </Link>

        {categoryItemList?.length !== 0 ? (
        <Table bordered hover responsive className="align-middle mt-3">
          <thead>
            <tr>
              <th>Nombre de la categoria</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {categoryItemList?.map((category) => (<Category
                key={category._id}
                categoryItemList={categoryItemList}
                URL={URL}
              />))}
              
            
          </tbody>
        </Table>
      ) : (
        <div className="no-products-found d-flex align-items-center justify-content-center">
          {/* No products found message */}
          <h1> 🤷‍♂️No hay encuestas guardadas </h1>
        </div>
      )}



      </div>
    </Container>
  );
};

export default CategoryTable;
