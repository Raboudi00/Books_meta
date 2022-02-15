import React from "react";
import brkn from "../../../assets/404.jpg";

export default function Info(props) {
  const book = props.book;
  let author = typeof book.authors[0] === "undefined" ? "" : book.authors[0];
  const img =
    typeof book.formats["image/jpeg"] === "undefined"
      ? brkn
      : `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;

  return (
    <div className="info">
      <img src={img} className="profile-pic" alt="Broken" />
      <span className="title">
        <h1>{book.title}</h1>
      </span>
      <div className="btn">
        <span>
          <a
            className="btn-overview"
            href={`https://www.gutenberg.org/ebooks/${book.id}.html.images`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-eye">Overview</i>
          </a>
        </span>
        <span>
          <a
            className="btn-linkedin"
            href={`https://www.gutenberg.org/ebooks/${book.id}.kindle.images`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa-solid fa-mobile-screen-button"></i>ePub Version
          </a>
        </span>
      </div>
      <span className="author">
        <h3>Author: </h3>
        {typeof author.name === "undefined" ? (
          "unknown"
        ) : (
          <h3>{author.name}</h3>
        )}
      </span>
      <ul className="info-type">
        Genre:
        <hr />
        {book.bookshelves.length > 0 ? (
          book.bookshelves.map((shelve, index) => (
            <li key={index}> {`${shelve}`} </li>
          ))
        ) : (
          <p>Unknown</p>
        )}
      </ul>
    </div>
  );
}
