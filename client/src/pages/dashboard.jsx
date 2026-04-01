import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewDisplay from "../components/ReviewDisplay";
import { useDashboard } from "../context/DashboardContext";

function Dashboard() {
  return <DashboardContent />;
}

function DashboardContent() {
  const { username } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useDashboard();

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
  }, [username, refreshTrigger]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <h2>{username}</h2>
      <div>
        <h4>Recents</h4>
      </div>
      <ReviewDisplay reviews={reviews} />
    </div>
  );
}

export default Dashboard;
