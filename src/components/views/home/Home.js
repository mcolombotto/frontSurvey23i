import React from "react";
import Slider from "./slider/slider";
import CardList from "./cards/Cards.js";
import IconTextSection from "./iconSection/IconTextSection";

import "./Home.css";
const Home = ({ surveys, categoryItemList }) => {
  return (
    <>
      <Slider />
      <IconTextSection />
      <CardList categoryItemList={categoryItemList} cards={surveys} />
    </>
  );
};

export default Home;
