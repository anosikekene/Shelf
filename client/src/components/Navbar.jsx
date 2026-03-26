import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AddReviewPopup from "./AddReviewPopup";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Hellos");
    }
  };
  return (
    <nav>
      <div className="navbar">
        <button className="navbar-btn" to="/">
          Home
        </button>
        <button className="navbar-btn" to="/profile">
          Profile
        </button>

        {user ? (
          <button
            className="navbar-btn"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button className="navbar-btn" to="/">
            Login
          </button>
        )}
        {user ? (
          <button className="navbar-btn" onClick={() => setShowPopup(true)}>
            Add
          </button>
        ) : (
          <input placeholder="Search"></input>
        )}
        {showPopup && <AddReviewPopup setShowPopup={setShowPopup} />}
      </div>
    </nav>
  );
}

export default Navbar;
