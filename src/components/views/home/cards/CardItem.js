import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Card.css";

function Card({ _id, image, surveyName }) {
  const navigate = useNavigate();
  return (
    <motion.div
      key={_id}
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0.5 }}
    >
      <AnimatePresence>
        <div className="card text-center bg-dark animate__animated animate__fadeInUp">
          <div className="overflow">
            <img src={image} alt="a wallpaper" className="card-img-top" />
          </div>
          <div className="card-body text-light">
            <h4 className="card-title">{surveyName}</h4>
            <button
              target="_blank"
              className="btn btn-outline-secondary border-0"
              rel="noreferrer"
              onClick={() => navigate(`/survey/${_id}`)}
            >
              Ir a {surveyName}
            </button>
          </div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

export default Card;
