import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelopeCircleCheck,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { faListDots, faChartLine, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "./IconTextSection.css";

const IconTextSection = () => {
  return (
    <div className="container">

      <div className="row ">

        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
          <FontAwesomeIcon icon={faThumbsUp}  className="fa-icon icon" />
          </div>
          <div className="text-container">
            <p>Facil de usar</p>
          </div>
        </div>

        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              className="fa-icon icon"
            />
          </div>
          <div className="text-container">
            <p>Recibe en tu correo las respuestas completadas</p>
          </div>
        </div>

        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faUserSecret} className="fa-icon icon" />
          </div>
          <div className="text-container">
            <p>Posibilidad de responder anónimamente</p>
          </div>
        </div>

        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faListDots} className="fa-icon icon" />
          </div>
          <div className="text-container">
            <p>Categoriza las encuestas creadas</p>
          </div>
        </div>


        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faChartLine} className="fa-icon icon" />
          </div>
          <div className="text-container">
            <p>Analisis de datos</p>
          </div>
        </div>

        <div className="col-6 col-lg-3 col-md-4 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon
              icon={faMobileScreenButton}
              className="fa-icon icon"
            />
          </div>
          <div className="text-container">
            <p>APP disponible para iOS y Android</p>
          </div>
        </div>


    
        <div className="col-6 col-lg-3 col-md-6 icon-container">
          <div className="icon-wrapper">
          <FontAwesomeIcon icon={faPeopleGroup}  className="fa-icon icon" />
          </div>
          <div className="text-container">
            <p>Asistencia por cualquier consulta</p>
          </div>
        </div>

        <div className="col-6 col-lg-3 col-md-6 icon-container">
          <div className="icon-wrapper">
            <FontAwesomeIcon
              icon={faFaceSmile}
              className="fa-icon icon"
            />
          </div>
          <div className="text-container">
            <p>Y mucho mas</p>
          </div>
        </div>
        </div>

      
    </div>
  );
};

export default IconTextSection;
