import React, { useState, useEffect } from 'react';
import Card from './CardItem';
import Pagination from '../pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import './Card.css';

const Cards = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [allCards, setAllCards] = useState(cards);
  const [visibleCards, setVisibleCards] = useState(cards);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryButtons, setCategoryButtons] = useState([]);
    
  useEffect(() => {
    const categories = [...new Set(cards.map((card) => card.category))].filter((category) => {
      return cards.some(
        (card) => card.category === category && card.status === true
      );
    });
  
    const buttons = categories.map((category) => (
      <button
        key={category}
        className="btn btn-warning btn-custom"
        onClick={() => {
          filterCard(category);
          setCurrentPage(1);
        }}
      >
        {category}
      </button>
    ));
    setCategoryButtons(buttons);
    setAllCards(cards);
    setVisibleCards(cards);
  }, [cards]);

  useEffect(() => {
    const filteredCards = allCards.filter((card) =>
      card.surveyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleCards(filteredCards.length > 0 ? filteredCards : []);
  }, [allCards, searchTerm]);

  const filterCard = (categCard) => {
    const updatedCards = cards.filter((curElem) => {
      return curElem.category === categCard;
    });
    setAllCards(updatedCards);
    setVisibleCards(updatedCards);
  };

  const currentPosts = visibleCards.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="container-all">
        <h1 className="main-heading"></h1>
        <div className="container">
          {/* Category buttons */}
          <div className="d-flex justify-content-around">
            {categoryButtons}
            <button
              className="btn btn-warning btn-custom"
              onClick={() => {
                setAllCards(cards);
                setVisibleCards(cards);
                setCurrentPage(1);
              }}
            >
              Todos
            </button>
          </div>
          {/* Search bar */}
          <div className="input-group mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre de la encuesta"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={visibleCards.length === 0 && allCards.length === 0}
            />
          </div>
        </div>
        {/* Card list */}
        <div>
         {visibleCards.length > 0 ? (
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                {currentPosts.map(({ _id, image, surveyName, category }) => (
                  <div className="col-md-4" key={_id}>
                    <Card _id={_id} image={image} surveyName={surveyName} category={category} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-danger" size="2x" />
              {searchTerm.length > 0 ? (
                <h5 className="text-danger m-2">No se encontraron resultados</h5>
              ) : (
                <h5 className="text-danger m-2">No hay encuestas disponibles</h5>
              )}
            </div>
          )}
        </div>
        {/* Pagination */}
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
  
}  
    
export default Cards;
