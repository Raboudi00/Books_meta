import React, { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./App.css";
import spinner from "./assets/spinner.gif";
import { Nav, Card, Pagination } from "./components";

function App() {
  const [books, setBooks] = React.useState({ results: "" });
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFav, setIsFav] = React.useState(() => {
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return storage;
  });

  useEffect(() => {
    async function Result() {
      await axios(`https://gutendex.com/books/?search=${query}`).then((res) =>
        setBooks(res.data)
      );

      setIsLoading(false);
    }
    Result();
  }, [query]);

  function DeleteFav(ele) {
    localStorage.removeItem(`item${ele.id}`);
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    setIsFav(storage);
  }

  function ClearFav() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your favourites!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        setIsFav([]);
        swal("Poof! Your favourite books are deleted!", {
          icon: "success",
        });
      } else {
        swal("Your favourite list is safe!");
      }
    });
  }

  return (
    <div className="App">
      <Nav
        setQuery={(q) => setQuery(q)}
        isFav={isFav}
        DeleteFav={(q) => DeleteFav(q)}
        ClearFav={ClearFav}
      />

      {!isLoading ? (
        <>
          <div className="counter">
            {books.count === 0 ? (
              <h3>No Results Found</h3>
            ) : (
              <>
                <h3>
                  {books.count} Book{books.count > 1 && "s"} Loaded
                </h3>
                <h3>
                  {books.results.length} Book{books.results.length > 1 && "s"}{" "}
                  on this page
                </h3>
              </>
            )}
          </div>
          {books.count && (
            <Pagination
              books={books}
              query={query}
              setBooks={(data) => setBooks(data)}
            />
          )}
          <Card books={books.results} setIsFav={(q) => setIsFav(q)} />
          {books.count && (
            <Pagination
              books={books}
              query={query}
              setBooks={(data) => setBooks(data)}
            />
          )}
        </>
      ) : (
        <img className="spinner" src={spinner} alt="Loading..." />
      )}
    </div>
  );
}

export default App;
