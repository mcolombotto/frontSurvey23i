import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './slider.css';


function Slider({ surveys }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log('selected index: ', selectedIndex)
    setIndex(selectedIndex);
  };
console.log(surveys.filter(i => i.status === true));
  return (
    <Carousel activeIndex={index}
              onSelect={handleSelect}
              nextIcon={<span aria-hidden="true" className="carousel-control-next-icon changed" />}
    >
      {surveys.filter(i => i.status === true).map((slide) => (
        <Carousel.Item>
          <Link /* to={`/survey/${slide._id}`} */>
          <img className="d-block w-100"
            src={slide.image}
            alt="Slide"
          />
       
          <Carousel.Caption>
            <h1>{slide.surveyName}</h1>
          </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;