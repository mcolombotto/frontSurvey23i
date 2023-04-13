import React, {useState, useEffect} from 'react'
import Card from "./CardItem";
import Pagination from "../pagination/Pagination";
import "./Card.css";

const Cards = ({cards}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [card, setCard] = useState(cards);
  const [categoryButtons, setCategoryButtons] = useState([]);

  useEffect(() => {
    const categories = [
      ...new Set(cards.map((card) => card.category)),
    ].filter((category) => {
      return cards.some(
        (card) => card.category === category && card.status === true
      );
    });

    const buttons = categories.map((category) => (
      <button
        key={category}
        className="btn btn-warning"
        onClick={() => {
          filterCard(category);
          setCurrentPage(1);
        }}
      >
        {category}
      </button>
    ));
    setCategoryButtons(buttons);
  }, [cards]);

  const filterCard = (categCard) => {
    const updatedCards = cards.filter((curElem) => {
      return curElem.category === categCard;
    });
    setCard(updatedCards);
  };

  const visibleCards = card.filter((card) => card.status === true);
  const currentPosts = visibleCards.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="container-all">
        <h1 className="main-heading"></h1>
        <div className="container">
          <div className="d-flex justify-content-around">
            {categoryButtons}
            <button className="btn btn-warning" onClick={() => { setCard(cards); setCurrentPage(1);}}> Todos</button>
          </div>
        </div>
        <div>
          <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
              {currentPosts.map(({ _id, imageSource, surveyName, category }) => (
                <div className="col-md-4">
                  <Card _id={_id} imageSource={imageSource} surveyName={surveyName} category={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="paginationDiv">
          <Pagination
            totalPosts={visibleCards.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
