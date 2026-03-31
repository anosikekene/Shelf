//import SearchBar from "./SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

function AddToShelf({ setIsPopupVisible, selectedItem, triggerRefresh }) {
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const [user] = useState(localStorage.getItem("user"));
  const [token] = useState(localStorage.getItem("token"));
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/${user}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: selectedItem.id,
          rating,
          comment,
          title: selectedItem.title,
          type: selectedItem.type,
          poster: selectedItem?.poster,
        }),
      });
      if (response.ok) {
        setIsPopupVisible(false);
        triggerRefresh();
        navigate(`/${user}`);
      } else {
        console.log("FAILURE");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedItem.id);
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <p>I finished...</p>
          {<button onClick={() => setIsPopupVisible(false)}>X</button>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="popup-body">
            <div className="poster">
              <img
                src={selectedItem.poster}
                alt={selectedItem.title + "poster"}
              ></img>
            </div>
            <div className="info">
              <h1>{selectedItem.title}</h1>
              <p>
                {selectedItem.releaseDate
                  ? `(${selectedItem.releaseDate.slice(0, 4)})`
                  : ""}
              </p>
              <p>{selectedItem.type}</p>

              <input
                type="text"
                placeholder="Rating..."
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              ></input>
              <input
                type="text"
                placeholder="Comments..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></input>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function MediaResultList({ data, onselect }) {
  console.log(data);

  return data.map((result) => (
    <div className="result-container">
      <div className="result-row" onClick={() => onselect(result)}>
        <p>
          {[
            result.title,
            result.releaseDate ? ` (${result.releaseDate.slice(0, 4)})` : "",
          ]}
        </p>
      </div>
    </div>
  ));
}

function SearchBar({ triggerRefresh }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      debounceSearch(e.target.value);
    }
  };

  function handleSelectedItem(result) {
    setSelectedItem(result);
    console.log(result.id);
    setIsPopupVisible(true);
  }

  const debounceSearch = async (searchInput) => {
    try {
      const response = await fetch(
        `http://localhost:3000/media/search?title=${searchInput}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const searchResponse = await response.json();
      if (response.ok) {
        setData(searchResponse);
      } else {
        alert("Search Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="popup-info">
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          value={query}
        ></input>
      </div>
      <div>
        <MediaResultList
          data={data}
          onselect={handleSelectedItem}
        ></MediaResultList>
      </div>
      <div className="add-to-shelf">
        {isPopupVisible && (
          <AddToShelf
            setIsPopupVisible={setIsPopupVisible}
            selectedItem={selectedItem}
            triggerRefresh={triggerRefresh}
          ></AddToShelf>
        )}
      </div>
    </div>
  );
}

function AddReviewPopup({ setShowPopup }) {
  const { triggerRefresh } = useDashboard();
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <p>Add to your Shelf...</p>
          {<button onClick={() => setShowPopup(false)}>X</button>}
        </div>
        <SearchBar triggerRefresh={triggerRefresh}></SearchBar>
      </div>
    </div>
  );
}

export default AddReviewPopup;
