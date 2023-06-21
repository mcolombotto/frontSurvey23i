import React from "react";
import Slider from "./slider/slider";
import CardList from "./cards/Cards.js";
import IconTextSection from "./iconSection/IconTextSection";
import { Container } from "react-bootstrap";

import "./Home.css";
const Home = ({ surveys, categoryItemList }) => {
  return (
    <>
      <Slider />
      <hr></hr>
      <Container className="mt-5">
        <h2 className="text-center text-light">
          {" "}
          Empieza ya mismo creando tus propias encuestas
        </h2>
        <IconTextSection className="my-5" />

        <h2 className="text-center text-light my-5">
          {" "}
          Contesta alguna de las encuestas creadas por nuestros usuarios
        </h2>

        <CardList categoryItemList={categoryItemList} cards={surveys} />
      </Container>
    </>
  );
};

export default Home;
