import React, {useState} from 'react'
import Card from "./CardItem";
import Pagination from "./Pagination";
import "./Card.css";

const Cards = ({cards}) => {

  const [card, setCard] = useState(cards);
    const filterCard = (categCard) => {
        const updatedCards = cards.filter((curElem) => {
            return curElem.category === categCard;
          });
        setCard(updatedCards);
    }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = card.slice(firstPostIndex, lastPostIndex);

  return (
    <>

    <h1 className="mt-5 text-center main-heading">Formularios</h1>
    <hr/>
    <div className="container">
        <div className="d-flex justify-content-around">
            <button className="btn btn-warning" onClick={() => filterCard('trabajo')}>Trabajo</button>
            <button className="btn btn-warning" onClick={() => filterCard('escuela')}>Escuela</button>
            <button className="btn btn-warning" onClick={() => filterCard('producto')}>Producto</button>
            <button className="btn btn-warning" onClick={() => setCard(cards)}>Todos</button>
      </div>   
    </div>

    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {currentPosts.map(({ imageSource, title, url, category}) => (
          <div className="col-md-4">
            <Card imageSource={imageSource} title={title} url={url} category={category} />
          </div>
        ))}
      </div>
    </div>
    <Pagination totalPosts={card.length}postsPerPage={postsPerPage}setCurrentPage={setCurrentPage}currentPage={currentPage}/>
    
    </>
  );
}

export default Cards;
