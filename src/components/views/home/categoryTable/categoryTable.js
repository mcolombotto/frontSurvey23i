import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Category from "./category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";


const CategoryTable = ({ setCategoryItemList, categoryItemList, setCategoryItem, categoryItem, URL ,getApi}) => {
    
    const navigate = useNavigate();

    
    console.log(categoryItemList)

    const handleSubmit = (e) => {
        console.log("INICIO DEL SUBMIT");
        e.preventDefault();
    
        /* if (
           !validateSurveyName(surveyNameRef.current.value) 
          !validateCategory(categoryRef.current.value)
        ) {
          Swal.fire("Ops!", "Some data is invalid.", "error");
          return;
        } */
        //guardar el objeto
        const newCategory = {
          categoryName: categoryItem.categoryName,
          categoryStatus: false,
        };
        
        
       /*  setCategoryItemList([...categoryItemList , newCategory ]); */
        
        console.log(categoryItemList, newCategory);
    
    
     
        Swal.fire({
          title: "Estas Seguro?",
          text: "Esta acción no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Guardar",
        }).then(async (result) => {
          if (result.isConfirmed) {
             try { 
                console.log(URL)
              const res = await axios.post(`${URL}`,newCategory);
              /* console.log(res.data); */
    
               if (res.status === 201) {
                Swal.fire("Creada!", "Se creó nueva categoría", "success");
                getApi();
                navigate("/category/table"); 
              }
            } catch (error) {
                console.log(error);
            } 
        }
    }
        )
}






return (
    <Container>
      <h1 className="mb-5 text-center">Tabla de Categorias</h1>
      <hr></hr>
      <Link to="/survey/table"
                  
                  className="m-2 btn-red text-decoration-none text-center"
                >
                  
                  <Button variant="secondary" >Volver </Button>
                </Link>
        {categoryItemList?.length == 0 ? (
            <h4 className="text-center"> 📝No hay categorias guardadas </h4>
            
            ):(<></>)}
      <div className="d-flex align-items-center justify-content-center">
        
          <Table bordered hover responsive className="align-middle mt-5">
            <thead>
              <tr>
                <th>Nombre de la categoria</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoryItemList?.map((category) => (
                <Category
                  setCategoryItemList={setCategoryItemList}
                  category={category}
                  categoryItemList={categoryItemList}
                  URL={URL}
                  getApi={getApi}
                />
              ))}
            <tr>
                <td>
                <Form.Control type="text"  placeholder="Nueva categoria" onChange={(e)=>{
                    categoryItem.categoryName = e.target.value;
                    setCategoryItem(categoryItem);
                }}/>
                </td>
                <td>
           
            </td>
              <td>
                <Link
                  
                  className="m-2 btn-red text-decoration-none text-center"
                >
                  {" "}
                  <Button variant="primary" onClick={handleSubmit}>Nueva </Button>
                </Link>
              </td>
            </tr>
            </tbody>
          </Table>
        
            <div className="no-products-found d-flex align-items-center justify-content-center">
            </div>
            
      </div>
    </Container>
        
  );
};

export default CategoryTable;
