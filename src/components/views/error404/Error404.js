import React from "react";
import "./Error404.css";
import ErroImg from "../../../assets/img/404.gif";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error-container justify-content-center">
      <div className="row">
        <div className="col-12 text-center justify-content-center img-container">
          <img
            src={ErroImg}
            alt="gift de error"
            className="img-fluid picture-error"
          />
          <div className=" col-12">
            <Link className="btn btn-primary mb-5 " to="/">
              Ir al Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
