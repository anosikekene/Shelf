import { useState, useEffect } from "react";
import { useDashboard } from "../context/DashboardContext";
import ReviewDisplay from "../components/ReviewDisplay";

function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));
  const { refreshTrigger } = useDashboard();
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch("http://localhost:3000/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFeed(data.feed);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setLoading(false);
      }
    };

    fetchFeed();
    setLoading(true);
  }, [refreshTrigger, token]);

  if (loading) return <p>Loading feed...</p>;

  return (
    <div>
      {/* {feed.length === 0 && <p>No reviews from followed accounts yet.</p>}
      {feed.map((review) => (
        <div key={review._id} className="review-card">
          <div className="poster">
            <img src={review.poster} alt={review?.title + "poster"} />
          </div>
          <h3>{review.title}</h3>
          <p>By: {review.user.username}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))} */}
      <ReviewDisplay reviews={feed} />
    </div>
  );
}

export default Feed;
