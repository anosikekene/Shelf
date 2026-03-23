import { useState } from "react";

function AddReviewPopup({ onClose, onReviewAdded }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    onReviewAdded();
    onClose();
  };

  return (
    <div className="popup">
      <h2>Add Review</h2>
    </div>
  );
}

export default AddReviewPopup;
