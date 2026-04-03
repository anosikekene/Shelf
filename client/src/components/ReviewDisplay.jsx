import "./ReviewDisplay.css";
import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import { AddToShelf } from "./AddReviewPopup";
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function ReviewDisplay({ reviews, editable = false }) {
  const [user] = useState(localStorage.getItem("user"));
  const [token] = useState(localStorage.getItem("token"));
  const {
    triggerRefresh,
    setIsPopupVisible,
    setSelectedReview,
    selectedReview,
  } = useDashboard();

  const [likes, setLikes] = useState(selectedReview?.likes.length);
  const [likesMap, setLikesMap] = useState(() =>
    Object.fromEntries(reviews.map((r) => [r._id, r.likes?.length ?? 0])),
  );

  async function deleteButton(review) {
    try {
      const response = await fetch(
        `http://localhost:3000/${user}/review/${review.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        console.log("Deleted");
        triggerRefresh();
      } else {
        console.log(response);
        alert("Delete Failed!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateButton(review) {
    try {
      // const response = await fetch(
      //   `http://localhost:3000/${user}/review/${review.id}`,
      //   {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      // if (response.ok) {
      //   console.log("Deleted");
      //   triggerRefresh();
      // } else {
      //   alert("Delete Failed!");
      // }
      //AddToShelf(true, review, triggerRefresh, true);
      console.log("update");
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = async (review) => {
    const res = await fetch(`http://localhost:3000/${review?._id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    //setLikes(data.likes);
    setLikesMap((prev) => ({
      ...prev,
      [review._id]: Array.isArray(data.likes) ? data.likes.length : data.likes,
    }));
  };

  return !reviews || reviews.length === 0 ? (
    <p>No reviews yet</p>
  ) : (
    reviews.map((review) => (
      <div key={review._id} className="review-display">
        <div className="poster">
          <img src={review.poster} alt={review?.title + "poster"} />
        </div>
        <div className="review-info">
          <h3>{review?.title}</h3>
          <p>Shelfed: {formatDate(review.createdAt)}</p>
          <p>{review.comment}</p>
          <p>Rating: {review.rating}</p>
          <p>Type: {review.type}</p>
        </div>

        {editable ? (
          <div className="display-btn">
            <button
              className="update-btn"
              onClick={() => {
                setIsPopupVisible(true);
                setSelectedReview(review);
              }}
            >
              Update
            </button>
            <button className="delete-btn" onClick={() => deleteButton(review)}>
              Delete
            </button>
          </div>
        ) : (
          // <button
          //   onClick={() => {
          //     setSelectedReview(review);
          //     handleLike();
          //   }}
          // >
          //   ❤️ {likes}
          // </button>
          <button onClick={() => handleLike(review)}>
            ❤️ {likesMap[review._id]}
          </button>
        )}
      </div>
    ))
  );
}
export default ReviewDisplay;
