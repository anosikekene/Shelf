import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewDisplay from "../components/ReviewDisplay";

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
        <div>
          <h4>Recents</h4>
        </div>
        s
        <ReviewDisplay reviews={reviews} />
      </div>
    </div>
  );
}

export default Dashboard;
