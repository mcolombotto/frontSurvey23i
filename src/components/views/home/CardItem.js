import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./Card.css";

function Card({ _id,image, surveyName }) {
  const navigate = useNavigate();
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={image} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{surveyName}</h4>
        <button target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
          onClick={() => navigate(`/survey/${_id}`)}>
              Ir a {surveyName}
          </button>

      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;
