import React from "react";
import Slider from './slider/slider';
import CardList from './cards/Cards.js';
import IconTextSection from './iconSection/IconTextSection';

/// Use of the local .json located in the home folder - named: formsDB.json ONLY TEST PURPOSE
/*import cards  from './formsDB.json'
    <CardList cards= {cards}/>
*/

import './Home.css';
const Home = ({surveys, categoryItemList}) => {
    return (
    <>
        <Slider/>
        <IconTextSection />
        <CardList categoryItemList={categoryItemList}  cards= {surveys}/>
    </>
    );
};

export default Home;
