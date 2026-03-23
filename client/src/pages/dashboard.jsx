import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function Dashboard() {
  const { username } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${username}`);
        const data = await response.json();

        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <div>
          <h1>Dashboard</h1>
        </div>

        <h2>{username}</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id}>
              <h3>{review?.title}</h3>
              <p>{review.comment}</p>
              <p>Type: {review.type}</p>
              <p>Rating: {review.rating}</p>
              <p>Shelfed: {formatDate(review.createdAt)}</p>
              <img src={review.poster} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
