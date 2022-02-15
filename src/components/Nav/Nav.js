import React from "react";
import alt from "../../assets/404.jpg";
import logo from "../../assets/large_logo.png";
import "./Nav.css";

export default function Nav(props) {
  const [text, setText] = React.useState("");
  const [drop, setDrop] = React.useState(false);

  function Handler() {
    props.setQuery(text);
  }

  const DropElements = () =>
    props.isFav[0] === undefined ? (
      <p className={`empty dropDown-menu${drop ? "-Show" : ""}`}>
        You have no Favourites yet...Feel free to add any book you like
      </p>
    ) : (
      <ul className={`dropDown-menu${drop ? "-Show" : ""}`}>
        <button className="clear-btn" onClick={() => props.ClearFav()}>
          Clear All
        </button>
        {props.isFav.map((ele, index) => (
          <div className="dropDown-item" key={index}>
            <span className="fav-info">
              <img
                className="fav-cover"
                src={
                  ele.formats["image/jpeg"] ? ele.formats["image/jpeg"] : alt
                }
                alt="Broken"
              />
              <a
                href={ele.formats["text/html"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ele.title}
              </a>
              <button
                className="delete-button"
                onClick={() => props.DeleteFav(ele)}
              >
                <i className="fa-thin fa-trash"></i>
              </button>
            </span>
            <hr className="separate" />
          </div>
        ))}
      </ul>
    );

  return (
    <div className="nav-container">
      <div className="navBar">
        <img className="nav-logo" alt="img" src={logo} />
        <h1>Good Read</h1>
        <span className="search">
          <input
            type="text"
            id="header-search"
            placeholder="Search Books"
            name="s"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && Handler()}
            value={text}
          />
          <button type="button" onClick={Handler}>
            Search
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </span>
        <span className="links">
          <a
            href="https://github.com/Raboudi00/Raboudi00.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fa-brands fa-github"
              style={{ fontSize: "25px", padding: "7px" }}
            ></i>
            Github repository
          </a>
          <h5 onClick={() => setDrop((prev) => !prev)}>
            Favourite <i className="fa-solid fa-caret-down"></i>
          </h5>
        </span>
      </div>

      <div className={`dropDown${drop && "-Show"}`}>
        <DropElements />
      </div>
    </div>
  );
}
