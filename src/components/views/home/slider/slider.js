import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";
import "./slider.css";
import banner1 from "./image1.jpg";
import banner2 from "./image2.jpg";
import banner3 from "./image3.jpg";

const slides = [
  {
    image: banner1,
    status: true,
    title: "Crea Edita Modifica Personaliza!",
    url: "https://www.freepik.es/foto-gratis/detalle-equipo-trabajando-nuevo-proyecto-espacio-coworking-escribiendo-ideas-mirando-graficos-tableta-computadora-portatil-trabajo-equipo-concepto-negocio_8357187.htm#query=personas%20trabajando%20oficina&position=9&from_view=search&track=ais",
    text: "Imagen de cookie_studio ",
  },
  {
    image: banner2,
    status: true,
    title: "World Surveys",
    url: "https://www.freepik.es/foto-gratis/diversas-personas-que-trabajan-oficina_15653914.htm#query=personas%20trabajando%20oficina&position=1&from_view=search&track=ais",
    text: "Imagen de rawpixel.com  ",
  },
  {
    image: banner3,
    status: true,
    title: "Analiza los datos de forma fácil!",
    url: "https://www.freepik.es/foto-gratis/empresarios-que-trabajan-finanzas-contabilidad-analizan-financi_16068554.htm#query=graficos&position=4&from_view=search&track=sph",
    text: "Imagen de our-team ",
  },
];

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
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
              <Carousel.Caption>
                <p className="sliderTitle">{slide.title}</p>
                <p>
                  <a href={slide.url}> {slide.text}</a> en Freepik{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
}

export default Slider;
