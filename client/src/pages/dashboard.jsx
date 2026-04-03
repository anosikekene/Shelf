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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const { refreshTrigger, currentUser, fetchUser, triggerRefresh } =
    useDashboard();

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3000/${profileUser.username}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetId: profileUser._id }),
      });
      fetchUser();
      triggerRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:3000/${profileUser.username}/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetId: profileUser._id }),
      });

      fetchUser();
      triggerRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${username}`);
        const data = await response.json();

        setProfileUser(data);
        setReviews(data.reviews || []);
        setFollowers(data.followers || []);
        setFollowing(data.following || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, refreshTrigger]);

  if (loading) return <p>Loading...</p>;
  const isCurrentUser =
    currentUser?._id?.toString() === profileUser?._id?.toString();

  const isFollowing = currentUser?.following?.some(
    (f) => f === profileUser?._id || f._id === profileUser?._id,
  );

  return (
    <div>
      <div className="dashboard-info">
        <div>
          <h1>Dashboard</h1>
          <h2>{username}</h2>
          <div className="profile-actions">
            {isCurrentUser ? (
              <button>Edit Profile</button>
            ) : isFollowing ? (
              <button onClick={handleUnfollow}>Unfollow</button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )}
          </div>
          <h4>Recents</h4>
        </div>
        <div className="profile-stats">
          <div>
            <h5>{reviews.length}</h5>
            <h4>Shelved</h4>
          </div>
          <div>
            <h5>{followers.length}</h5>
            <h4>Followers</h4>
          </div>
          <div>
            <h5>{following.length}</h5>
            <h4>Following</h4>
          </div>
        </div>
      </div>
      <div>
        <ReviewDisplay reviews={reviews} editable={true} />
      </div>
    </div>
  );
}

export default Dashboard;
