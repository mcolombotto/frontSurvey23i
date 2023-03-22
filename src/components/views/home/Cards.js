import React from "react";
import Card from "./CardItem";
import cards from "./formsDB.json"

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ imageSource, title, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={imageSource} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
