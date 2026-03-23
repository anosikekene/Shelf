const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
function ReviewDisplay({ reviews }) {
  return reviews.length === 0 ? (
    <p>No reviews yet</p>
  ) : (
    reviews.map((review) => (
      <div key={review._id}>
        <h3>{review?.title}</h3>
        <p>{review.comment}</p>
        <p>Type: {review.type}</p>
        <p>Rating: {review.rating}</p>
        <p>Shelfed: {formatDate(review.createdAt)}</p>
        <img src={review.poster} alt={review?.title + "poster"} />
      </div>
    ))
  );
}
export default ReviewDisplay;
