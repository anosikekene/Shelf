import { useDashboard } from "../context/DashboardContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Watchlist.css";
function Watchlist() {
  const { currentUser } = useDashboard();
  const { username } = useParams();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUserWatchlist = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${username}`);
        const data = await response.json();
        setWatchlist(data.watchlist ?? []);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserWatchlist();
  }, [username]);

  const removeFromWatchlist = async (mediaId) => {
    if (!currentUser) return;
    await fetch(
      `http://localhost:3000/${currentUser.username}/watchlist/${mediaId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setWatchlist((prev) => prev.filter((item) => item.mediaId !== mediaId));
  };

  if (loading) return <p>Loading...</p>;
  if (watchlist.length === 0) return <p>No items in your watchlist.</p>;

  return (
    <div className="watchlist-grid">
      {watchlist.map((item) => (
        <div key={item.mediaId} className="watchlist-item">
          <Link to={`/media/${item.mediaId}`}>
            <img src={item.poster} alt={item.title} />
          </Link>
          <h4>{item.title}</h4>
          <p>Type: {item.type}</p>
          {currentUser?.username === username && (
            <button onClick={() => removeFromWatchlist(item.mediaId)}>
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
