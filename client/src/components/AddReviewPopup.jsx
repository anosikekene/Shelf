import { useState } from "react";

function AddReviewPopup({ setShowPopup }) {
  const [query, setQuery] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Hellos");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <p>Add to your Shelf...</p>
          {<button onClick={() => setShowPopup(false)}>X</button>}
        </div>
        <div className="popup-info">
          <input
            placeholder="Search"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={query}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default AddReviewPopup;
