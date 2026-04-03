import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewDisplay from "../components/ReviewDisplay";
import { useDashboard } from "../context/DashboardContext";
import "./Dashboard.css";

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
      <div className="dashboard-info">
        <div>
          <h1>Dashboard</h1>
          <h2>{username}</h2>
          <h4>Recents</h4>
        </div>
        <div className="profile-stats">
          <div>
            <h5>{reviews.length}</h5>
            <h4>Shelved</h4>
          </div>
          <div>
            <h5>X</h5>

            <h4>Followers</h4>
          </div>
          <div>
            <h5>X</h5>

            <h4>Following</h4>
          </div>
        </div>
      </div>
      <div>
        <ReviewDisplay reviews={reviews} />
      </div>
    </div>
  );
}

export default Dashboard;
