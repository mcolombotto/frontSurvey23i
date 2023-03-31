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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //la petición delete con fetch
          /*  const res = await fetch(`${URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }); */

          const res = await axios.delete(`${URL}/${id}`, {
            //TOKEN PARA QUE SOLO EL ADMIN PUEDA BORRAR
            /*  headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            }, */
          });

          if (res.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            //volver a recargar la tabla
            getApi();
          }
        } catch (error) {
          console.log(error);
          //agregar cartel al usuario que informe del error
        }
      }
    });
  };

 
  const handleActivate = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      let surveyLoaded = res.data;
      console.log("ANTES",surveyLoaded); 
      surveyLoaded.status = !surveyLoaded.status;
      console.log("DESPUES",surveyLoaded); 
      await axios.put(`${URL}/${id}`, surveyLoaded);
      navigate(0);
  }catch (error) {
    console.log(error);
  }
  }



  return (
    <tr>
      {/* <td>{survey._id}</td> */}
      <td>{survey.surveyName}</td>
      <td>{survey.category}</td>
      <td>
        <ToggleButton
          type="checkbox"
          variant="secondary"
          onClick={() => handleActivate(survey._id)}
        >
          {visible(survey.status)}{" "}
        </ToggleButton>
      </td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Button
            variant="success"
            className=" mx-1"
            onClick={() => handleActivate(survey._id)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Link
            to={`/survey/edit/${survey._id}`}
            className="btn-orange mx-1 text-decoration-none text-center"
          >
            <Button variant="warning">
              <FontAwesomeIcon icon={faPencil} />
            </Button>
          </Link>

          <Button
            variant="danger"
            className=" mx-1"
            onClick={() => handleDelete(survey._id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button
            variant="primary"
            className=" mx-1"
            onClick={() => handleDelete(survey._id)}
          >
            <FontAwesomeIcon icon={faChartLine} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Survey;
