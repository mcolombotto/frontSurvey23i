import React from "react";
import Slider from './slider';

/// Use of the local .json located in the home folder - named: formsDB.json ONLY TEST PURPOSE
import slides  from './formsDB.json'
import CardList from './Cards.js';

const Home = ({surveys, categoryItemList}) => {
    return (
    <>
        <Slider surveys={surveys}/>
        <CardList categoryItemList={categoryItemList}  cards= {surveys}/>
    </>
    );
};

export default Home;
