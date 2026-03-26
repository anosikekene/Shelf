import SearchBar from "./SearchBar";
function AddReviewPopup({ setShowPopup }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <p>Add to your Shelf...</p>
          {<button onClick={() => setShowPopup(false)}>X</button>}
        </div>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default AddReviewPopup;
