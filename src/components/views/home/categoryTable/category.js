import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, ToggleButton, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faChartLine,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Category = ({ surveys, category, URL, getApi }) => {
  const navigate = useNavigate();
  const deleteCategoryItem = (id) => {
    let categoryAssigned = false;
    if (
      surveys
        .map((item) => {
          if (item.category == category.categoryName) {
            return true;
          }
        })
        .filter((x) => x == true).length > 0
    ) {
      categoryAssigned = true;
    }

    Swal.fire({
      title: "Estas seguro?",
      text: categoryAssigned
        ? "Esta categoría tiene encuestas asignadas, borrarla no afectará a las ya creadas."
        : "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      color: "#fff",
      background: "#000",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${URL}/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });

          if (res.status === 200) {
            Swal.fire({
              title: "Eliminada!",
              text: "Se eliminó una categoría",
              icon: "success",
              color: "#fff",
              background: "#000",
              showConfirmButton: false,
              timer: 2000,
            });

            getApi();
          }
        } catch (error) {}
      }
    });
  };

  const handleActivate = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      let categoryLoaded = res.data;
      categoryLoaded.categoryStatus = !categoryLoaded.categoryStatus;

      await axios.put(`${URL}/${id}`, categoryLoaded, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("user-token"))
            .token,
        },
      });
      navigate(0);
    } catch (error) {}
  };

  let visible = (data) => {
    if (data) {
      return <FontAwesomeIcon icon={faEye} />;
    } else {
      return <FontAwesomeIcon icon={faEyeSlash} />;
    }
  };

  return (
    <tr>
      <td className="text-light">{category.categoryName}</td>
      <td>
        {
          <Button
            className="text-light"
            variant="outline"
            onClick={() => {
              handleActivate(category._id);
            }}
          >
            {visible(category.categoryStatus)}
          </Button>
        }
      </td>
      <td>
        <Button
          variant="outline-danger"
          className="mx-1"
          onClick={() => deleteCategoryItem(category._id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </td>
      <td>
        {
          surveys
            .map((item) => {
              if (item.category == category.categoryName) {
                return true;
              }
            })
            .filter((x) => x == true).length
        }
      </td>
    </tr>
  );
};

export default Category;
