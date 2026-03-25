import { useContext, useState } from "react";
import { button } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddReviewPopup from "./AddReviewPopup";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function addReviewPopup() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
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
        {showPopup && (
          <div className="popup-container">
            <div className="popup-content">
              <div className="popup-header">
                <p>Add to your Shelf...</p>
                <button onClick={() => setShowPopup(false)}>X</button>
              </div>
              <div className="popup-info">
                <input placeholder="Search"></input>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
