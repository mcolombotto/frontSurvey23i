import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";
import "./slider.css";
import banner1 from "./banner1.png";
import banner2 from "./banner2.png";
import banner3 from "./banner3.png";

const slides = [
  { image: banner1, status: true },
  { image: banner2, status: true },
  { image: banner3, status: true },
];

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={
        <span
          aria-hidden="true"
          className="carousel-control-next-icon changed"
        />
      }
      indicators={false}
    >
      {slides
        .filter((i) => i.status === true)
        .map((slide, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={slide.image} alt="Slide" />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default Slider;
