import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import './IconTextSection.css';

const IconTextSection = () => {
  return (
    <div className="icon-text-section">
      <div className="icon-container">
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faUserSecret}  className='fa-icon icon' />
        </div>
        <div className="text-container">
          <p>El encuestado puede responder las encuestas de manera anonima o ingresando un email.</p>
        </div>
      </div>

      <div className="icon-container">
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faEnvelopeCircleCheck}  className='fa-icon icon' />
        </div>
        <div className="text-container">
          <p>Permite al encuestado recibir las respuestas ingresadas en su correo.</p>
        </div>
      </div>

      <div className="icon-container">
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faListDots} className='fa-icon icon' />
        </div>
        <div className="text-container">
          <p>Crea categorias que permitan buscar las encuestas de manera más organizada.</p>
        </div>
      </div>
    </div>
  );
};

export default IconTextSection;
