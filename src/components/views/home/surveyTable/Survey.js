import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit";
import { Button } from "react-bootstrap";


const Survey = ({ survey, URL, getApi }) => {
  /*  const url = process.env.REACT_APP_API_HAMBURGUESERIA;
  console.log(url); */

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

  const handleActivate = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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

  return (
    <tr>
      {/* <td>{survey._id}</td> */}
      <td>{survey.surveyName}</td>
      <td>{survey.category}</td>
      <td>{survey.active}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
            <Button
          variant="success"
          className=" mx-1"
          onClick={() => handleActivate(survey._id)}
        >
          Vista Previa
        </Button>
            <Link
            to={`/survey/edit/${survey._id}`}
            className="btn-orange mx-1 text-decoration-none text-center"
          >
          <Button variant="warning">
            Editar
            </Button> 
          </Link>
            
          <Button
            variant="danger"
            className=" mx-1"
            onClick={() => handleDelete(survey._id)}
          >
            Eliminar
          </Button>
          
        </div>
      </td>
    </tr>
  );
};

export default Survey;
