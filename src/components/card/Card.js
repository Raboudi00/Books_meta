import React from "react";
import Footer from "./components/Footer";
import Favourite from "./components/Favourite";
import Info from "./components/Info";

import "./Card.css";

function Card(props) {
  return (
    <div className="mains">
      {props.books.map((book) => (
        <div className="card-container" key={book.id}>
          <Info book={book} />
          <Favourite setIsFav={(q) => props.setIsFav(q)} book={book} />
          <Footer />
        </div>
      ))}
    </div>
  );
}

export default Card;
