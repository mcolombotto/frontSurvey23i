import React, { useState } from "react";
import Slider from './slider';
import slides  from './formsDB.json'
import CardList from './Cards.js';
import formsData  from './formsDB.json'
import Pagination from "./Pagination";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
	const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = formsData.slice(firstPostIndex, lastPostIndex);

    return (
    <>
        <Slider slides={slides}/>
        <CardList cards= {currentPosts}/>
		<Pagination
                totalPosts={formsData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
    </>
    );
};

export default Home;
