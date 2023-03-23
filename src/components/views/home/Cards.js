import React from "react";
import Card from "./CardItem";


const Cards = ({cards}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ imageSource, title, url}) => (
          <div className="col-md-4">
            <Card imageSource={imageSource} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
