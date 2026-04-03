//import SearchBar from "./SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import "./AddReviewPopup.css";
function AddToShelf({
  setIsPopupVisible,
  selectedItem,
  triggerRefresh,
  setShowPopup,
}) {
  const [rating, setRating] = useState(selectedItem?.rating || "");
  const [comment, setComment] = useState(selectedItem?.comment || "");
  const navigate = useNavigate();
  const [user] = useState(localStorage.getItem("user"));
  const [token] = useState(localStorage.getItem("token"));
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
        setShowPopup(false);
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
  return data.map((result) => (
    <div key={result.id} className="result-container">
      <div className="result-row" onClick={() => onselect(result)}>
        <img className="search-img" src={result.poster} alt={result.title} />
        <p>{`${result.title}${result.releaseDate ? ` (${result.releaseDate.slice(0, 4)})` : ""}`}</p>
      </div>
    </div>
  ));
}

function SearchBar({ triggerRefresh, setShowPopup, type }) {
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
        `http://localhost:3000/${type}/search?title=${searchInput}`,
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
            setShowPopup={setShowPopup}
          ></AddToShelf>
        )}
      </div>
    </div>
  );
}

function AddReviewPopup({ setShowPopup }) {
  const handleClose = () => {
    setIsPopupVisible(false);
    setSelectedReview(null);
  };
  const {
    triggerRefresh,
    setIsPopupVisible,
    selectedReview,
    setSelectedReview,
  } = useDashboard();
  const [type, setType] = useState("tvMovies");
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <p>Add to your Shelf...</p>
          <button onClick={handleClose}>X</button>
        </div>
        {selectedReview ? (
          <AddToShelf
            setIsPopupVisible={handleClose}
            selectedItem={selectedReview}
            triggerRefresh={triggerRefresh}
            setShowPopup={handleClose}
          />
        ) : (
          <div>
            <div className="media-btn">
              <button onClick={() => setType("media")}>Movies/TV</button>
              <button onClick={() => setType("games")}>Video Games</button>
              <button onClick={() => setType("books")}>Books</button>
            </div>
            <SearchBar
              type={type}
              triggerRefresh={triggerRefresh}
              setShowPopup={setIsPopupVisible}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddReviewPopup;
