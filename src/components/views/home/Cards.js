import React, {useState} from 'react'
import Card from "./CardItem";
import Pagination from "./Pagination";
import "./Card.css";

const Cards = ({cards,categoryItemList}) => {

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

  console.log(categoryItemList);

  return (
    <>

    <h1 className="mt-5 text-center main-heading">Formularios</h1>
    <hr/>
    <div className="container">
        <div className="d-flex justify-content-around">
            {categoryItemList.filter((item)=>{return item.categoryStatus==true}).map((item)=>(
            <button className="btn btn-warning" onClick={() => filterCard(item.categoryName)}>{item.categoryName}</button>
            ))}
           
      </div>   
    </div>
{/* 
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {currentPosts.filter(i => i.status === true).map(({ _id,imageSource, surveyName, category}) => (
          <div className="col-md-4">
            <Card _id={cards._id} image={cards.image} surveyName={cards.surveyName} category={cards.category} />
          </div>
        ))}
      </div>
    </div>
    <Pagination totalPosts={card.length}postsPerPage={postsPerPage}setCurrentPage={setCurrentPage}currentPage={currentPage}/> */}
    
    </>
  );
}

export default Cards;
