import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';
import './slider.css';

function Slider({ slides }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    console.log('selected index: ', selectedIndex)
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index}
              onSelect={handleSelect}
              nextIcon={<span aria-hidden="true" className="carousel-control-next-icon changed" />}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.imageSource}>
            <a href={slide.url}>
          <img className="d-block w-100"
            src={slide.imageSource}
            alt="First slide"
          />
             </a>
          <Carousel.Caption>
            <h1>{slide.title}</h1>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;