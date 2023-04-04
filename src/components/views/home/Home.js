import React from "react";
import Slider from './slider/Slider';
import slides  from './formsDB.json'
import CardList from './surveyCards/Cards';

const Home = () => {
    return (
    <>
        <Slider slides={slides}/>
        <CardList cards= {slides}/>
    </>
    );
};

export default Home;
