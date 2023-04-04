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

const Category = ({ categoryItemList, setCategoryItemList, category , URL, getApi }) => {
  const navigate = useNavigate();

  const deleteCategoryItem = (id) => {
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
      let categoryLoaded = res.data;
      console.log("ANTES",categoryLoaded); 
      categoryLoaded.categoryStatus = !categoryLoaded.categoryStatus;
      console.log("DESPUES",categoryLoaded); 
     
      await axios.put(`${URL}/${id}`, categoryLoaded);
       navigate(0); 
  }catch (error) {
    console.log(error);
  }
  }




  let visible = (data) => {
    if (data) {
      return <FontAwesomeIcon icon={faEye} />;
    } else {
      return <FontAwesomeIcon icon={faEyeSlash} />;
    }
  };

  return (
    <tr>
      <td>{category.categoryName}</td>
      <td>{<Button variant="secondary" onClick={()=>{handleActivate(category._id)}}>{visible(category.categoryStatus)}</Button>}</td>
      <td >
        
        <Button
          variant="danger"
          className=" mx-1"
          onClick={() => console.log(deleteCategoryItem(category._id))} 
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </td>
    </tr>


  );
};

export default Category;
