import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Category from "./category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";

const CategoryTable = ({
  setCategoryItemList,
  categoryItemList,
  setCategoryItem,
  categoryItem,
  URL,
  surveys,
  getApi,
}) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryItem.categoryName == "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#fff",
        confirmButtonColor: "#3085d6",
        background: "#000",
        text: "El nombre no puede estar vacío",
      });
    }

    if (
      categoryItemList
        .map((item) => {
          if (item.categoryName == categoryItem.categoryName) {
            return true;
          } else {
            return false;
          }
        })
        .find((x) => x == true) == true
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "#fff",
        background: "#000",
        confirmButtonColor: "#3085d6",
        text: "Esa categoría ya existe, por favor elige otro nombre",
      });
    }

    const newCategory = {
      categoryName: categoryItem.categoryName,
      categoryStatus: false,
    };

    Swal.fire({
      title: "Estas Seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      color: "#fff",
      background: "#000",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(`${URL}`, newCategory, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });

          if (res.status === 201) {
            Swal.fire({
              title: "Creada!",
              text: "Se creó nueva categoría",
              icon: "success",
              color: "#fff",
              background: "#000",
              showConfirmButton: false,
              timer: 2000,
            });
            getApi();
            navigate(0);
          }
        } catch (error) {}
      }
    });
  };

  return (
    <Container>
      <h2 className="my-3 text-light text-center">Tabla de Categorías</h2>
      <hr></hr>
      <Link
        to="/survey/table"
        className="m-2 btn-red text-decoration-none text-center"
      >
        <Button variant="outline-light">Volver </Button>
      </Link>
      {categoryItemList?.length == 0 ? (
        <h4 className="text-center"> 📝No hay categorías guardadas </h4>
      ) : (
        <></>
      )}
      <div className="d-flex align-items-center justify-content-center">
        <Table responsive className="text-light text-center align-middle mt-5">
          <thead>
            <tr>
              <th>Nombre de la categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Encuestas Asignadas</th>
            </tr>
          </thead>
          <tbody>
            {categoryItemList?.map((category, index) => (
              <Category
                setCategoryItemList={setCategoryItemList}
                category={category}
                index={index}
                categoryItemList={categoryItemList}
                URL={URL}
                getApi={getApi}
                surveys={surveys}
              />
            ))}
            <tr>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nueva categoria"
                    maxLength="50"
                    onChange={(e) => {
                      categoryItem.categoryName = e.target.value;
                      setCategoryItem(categoryItem);
                    }}
                  />
                </Form.Group>
              </td>

              <td></td>
              <td>
                <Link className="m-2 text-decoration-none text-center">
                  <Button variant="primary" onClick={handleSubmit}>
                    Nueva{" "}
                  </Button>
                </Link>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <div className="no-products-found d-flex align-items-center justify-content-center"></div>
      </div>
    </Container>
  );
};

export default CategoryTable;
