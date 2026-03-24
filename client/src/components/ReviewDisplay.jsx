import "./ReviewDisplay.css";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
function ReviewDisplay({ reviews }) {
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
        <div className="display-btn">
          <button className="update-btn">Update</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    ))
  );
}
export default ReviewDisplay;
