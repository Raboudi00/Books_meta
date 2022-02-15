import axios from "axios";
import React, { useEffect } from "react";
import "./Pagination.css";

function Pagination(props) {
  const [counter, setCounter] = React.useState(2);
  let allPages =
    Math.round(props.books.count / 32) - props.books.count / 32 < 0
      ? Math.round(props.books.count / 32) + 1
      : Math.round(props.books.count / 32);

  async function nextHandler() {
    if (props.books.next && counter <= allPages) {
      await axios(
        `https://gutendex.com/books/?page=${counter.toString()}&search=${
          props.query
        }`
      ).then((res) => props.setBooks(res.data));

      setCounter((prev) => prev + 1);
    }
  }

  async function prevHandler() {
    if (props.books.next && counter > 1) {
      await axios(
        `https://gutendex.com/books/?page=${counter.toString()}&search=${
          props.query
        }`
      ).then((res) => props.setBooks(res.data));

      setCounter((prev) => prev - 1);
    }
  }

  useEffect(() => setCounter(2), [props.query]);

  return (
    <div className="pagination">
      <button
        disabled={counter > 2 ? false : true}
        className="previous"
        onClick={prevHandler}
      >
        <i className="fa-solid fa-backward"></i> Previous page
      </button>

      <p className="num">{allPages && `pages ${counter - 1} / ${allPages}`}</p>

      <button
        disabled={counter <= allPages ? false : true}
        className="next"
        onClick={nextHandler}
      >
        Next page
        <i className="fa-solid fa-forward"></i>
      </button>
    </div>
  );
}

export default Pagination;
