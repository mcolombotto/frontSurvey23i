import React from "react";
import Slider from './slider/slider';

/// Use of the local .json located in the home folder - named: formsDB.json ONLY TEST PURPOSE
import cards  from './formsDB.json'
import CardList from './cards/Cards.js';
import './Home.css';
const Home = () => {
    return (
    <>
        <Slider/>
        <CardList cards= {cards}/>
    </>
    );
};

export default Home;
