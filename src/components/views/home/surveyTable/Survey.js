import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToggleButton, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashCan,
  faChartLine,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Survey = ({ survey, URL, getApi }) => {
  const navigate = useNavigate();

  let visible = (data) => {
    if (data) {
      return <FontAwesomeIcon icon={faEye} />;
    } else {
      return <FontAwesomeIcon icon={faEyeSlash} />;
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      color: "#fff",
      background: "#000",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${URL}/${id}`, {
            //TOKEN PARA QUE SOLO EL ADMIN PUEDA BORRAR
            /*  headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            }, */
          });

          if (res.status === 200) {
            Swal.fire({
              title: "Borrada!",
              text: "La encuesta se borró correctamente",
              icon: "success",
              color: "#fff",
              background: "#000",
              confirmButtonColor: "#3085d6",
            });

            getApi();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleActivate = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      let surveyLoaded = res.data;
      console.log("ANTES", surveyLoaded);
      surveyLoaded.status = !surveyLoaded.status;
      console.log("DESPUES", surveyLoaded);

      await axios.put(`${URL}/${id}`, surveyLoaded);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      {/* <td>{survey._id}</td> */}
      <td className="text-light">{survey.surveyName}</td>
      <td className="text-light">{survey.category}</td>
      <td>
        <div className="d-flex justify-content-center">
          <ToggleButton
            className=" text-light"
            type="checkbox"
            variant="outline"
            onClick={() => handleActivate(survey._id)}
          >
            {visible(survey.status)}{" "}
          </ToggleButton>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center">
          <Link to={`/survey/details/${survey._id}`}>
            <Button variant="outline-success" className="mx-1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Link>
          <Link
            to={`/survey/edit/${survey._id}`}
            className="btn-orange mx-1 text-decoration-none text-center"
          >
            <Button variant="outline-warning">
              <FontAwesomeIcon icon={faPencil} />
            </Button>
          </Link>

          <Button
            variant="outline-danger"
            className=" mx-1"
            onClick={() => handleDelete(survey._id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button variant="outline-primary" className=" mx-1">
            <FontAwesomeIcon icon={faChartLine} />
          </Button>
        </div>
      </td>
      <td></td>
    </tr>
  );
};

export default Survey;
