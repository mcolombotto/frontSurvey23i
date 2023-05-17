import React, { useState, useEffect } from "react";
import Card from "./CardItem";
import Pagination from "../pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { ListGroup, Badge } from "react-bootstrap";

const Cards = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [allCards, setAllCards] = useState(cards);
  const [visibleCards, setVisibleCards] = useState(cards);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryButtons, setCategoryButtons] = useState([]);

  useEffect(() => {
    const categories = [...new Set(cards.map((card) => card.category))].filter(
      (category) => {
        return cards.some(
          (card) => card.category === category && card.status === true
        );
      }
    );

    const buttons = categories.map((category) => (
      <ListGroup.Item
        key={category}
        id="category"
        onClick={() => {
          filterCard(category);
          setCurrentPage(1);
        }}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="  fs-5 fw-bold ">{category}</div>
        <Badge className="  fs-5" bg="primary" pill>
          {
            cards
              .map((element) => element.category == category)
              .filter((element) => element).length
          }
        </Badge>
      </ListGroup.Item>
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
          {}
          <div className="row">
            <div className="my-3 col-12  col-md-6">
              <h4 className="text-light">Filtrar por nombre </h4>
              <hr></hr>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa el nombre de la encuesta"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={visibleCards.length === 0 && allCards.length === 0}
              />
            </div>
            <div className=" my-3 col-12  col-md-6">
              <h4 className="text-light">Filtrar por categoria </h4>
              <hr></hr>
              <ListGroup>{categoryButtons}
              <ListGroup.Item
        id="category" 
        onClick={() => {
          setAllCards(cards);
          setVisibleCards(cards);
          setCurrentPage(1);}
        }

        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="  fs-5 fw-bold ">Todas</div>
        <Badge className="  fs-5" bg="primary" pill>
          
          {
            cards
              .map((element) => element.status ).length
          } 
        </Badge>
      </ListGroup.Item>
      </ListGroup>
            </div>

          </div>
        </div>

        <div>
          {visibleCards.length > 0 ? (
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                {currentPosts.map(({ _id, image, surveyName, category }) => (
                  <div className="col-md-4" key={_id}>
                    <Card
                      _id={_id}
                      image={image}
                      surveyName={surveyName.charAt(0).toUpperCase() + surveyName.slice(1)}
                      category={category}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-danger"
                size="2x"
              />
              {searchTerm.length > 0 ? (
                <h5 className="text-danger m-2">
                  No se encontraron resultados
                </h5>
              ) : (
                <h5 className="text-danger m-2">
                  No hay encuestas disponibles
                </h5>
              )}
            </div>
          )}
        </div>
        {}
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
