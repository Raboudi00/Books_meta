import React from "react";

export default function Favourite(props) {
  const item = props.book;

  function AddFav() {
    localStorage.setItem(`item${item.id}`, JSON.stringify(item));
    const storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    props.setIsFav(storage);
  }

  return (
    <div className="add-fav">
      <button className="favourite" onClick={AddFav}>
        <p>
          Add to favourite <i className="fas fa-bookmark"></i>{" "}
        </p>
      </button>
    </div>
  );
}
