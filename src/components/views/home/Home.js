import React from "react";
import Slider from './slider';
import slides  from './formsDB.json'
import CardList from './Cards.js';

const Home = () => {
    return (
    <>
        <Slider slides={slides}/>
        <CardList cards= {slides}/>
    </>
    );
};

export default Home;
