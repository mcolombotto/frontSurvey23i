import React, {useState} from 'react'
import Card from "../surveyCards/CardItems";
import Pagination from "../pagination/Pagination";
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
            <button className="btn btn-warning" onClick={() => filterCard('Encuesta de clima laboral')}>Encuesta de clima laboral</button>
            <button className="btn btn-warning" onClick={() => filterCard('Satisfacción de un servicio')}>Satisfacción de un servicio</button>
            <button className="btn btn-warning" onClick={() => filterCard('Investigacion')}>Investigacion</button>
            <button className="btn btn-warning" onClick={() => setCard(cards)}>Todos</button>
      </div>   
    </div>

    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {currentPosts.filter(i => i.status === true).map(({ _id,imageSource, surveyName, category}) => (
          <div className="col-md-4">
            <Card _id={_id} imageSource={imageSource} surveyName={surveyName} category={category} />
          </div>
        ))}
      </div>
    </div>
    <Pagination totalPosts={card.length}postsPerPage={postsPerPage}setCurrentPage={setCurrentPage}currentPage={currentPage}/>
    
    </>
  );
}

export default Cards;