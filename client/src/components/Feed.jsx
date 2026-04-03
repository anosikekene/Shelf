import { useState, useEffect } from "react";
import { useDashboard } from "../context/DashboardContext";
import ReviewDisplay from "../components/ReviewDisplay";
import "./Feed.css";
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
      <ReviewDisplay reviews={feed} />
    </div>
  );
}

export default Feed;
