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
import Charts from "../charts/charts";

const Survey = ({ survey, URL, getApi, roleLogged, setStatSurvey }) => {
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
      title: "¿Estás seguro?",
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
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
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
        } catch (error) {}
      }
    });
  };

  const handleActivate = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      let surveyLoaded = res.data;
      surveyLoaded.status = !surveyLoaded.status;

      await axios.put(`${URL}/${id}`, surveyLoaded, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("user-token"))
            .token,
        },
      });
      navigate(0);
    } catch (error) {}
  };

  return (
    <tr>
      {roleLogged == "admin" ? (
        <td className="text-light">{survey.author}</td>
      ) : (
        <></>
      )}
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

          {survey.surveyAnswerList[0] == "" ? (
            <Link
              to={`/survey/edit/${survey._id}`}
              className="btn-orange mx-1 text-decoration-none text-center"
            >
              <Button variant="outline-warning">
                <FontAwesomeIcon icon={faPencil} />
              </Button>
            </Link>
          ) : (
            <Button
              className="btn- mx-1 text-decoration-none text-center"
              disabled
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
          )}

          <Button
            variant="outline-danger"
            className=" mx-1"
            onClick={() => handleDelete(survey._id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>

          {survey.surveyAnswerList[0] == "" ? (
            <Button disabled variant="outline-secondary" className=" mx-1">
              <FontAwesomeIcon icon={faChartLine} />
            </Button>
          ) : (
            <Link to="/survey/charts">
              <Button
                variant="outline-primary"
                className=" mx-1"
                onClick={() => {
                  setStatSurvey(survey);
                }}
              >
                <FontAwesomeIcon icon={faChartLine} />
              </Button>
            </Link>
          )}
        </div>
      </td>
      <td>
        {survey.surveyAnswerList[0] !== undefined
          ? survey.surveyAnswerList[0].length
          : "0"}
      </td>
    </tr>
  );
};

export default Survey;
