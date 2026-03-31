import "./AddToShelf.css";
import { useState } from "react";

function AddToShelf({ setIsPopupVisible, selectedItem }) {
  const [rating, setRating] = useState("");
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
              <img src={selectedItem.poster}></img>
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
export default AddToShelf;
