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
              navigate("/login");
            }}
            to="/login"
          >
            Logout
          </button>
        ) : (
          <button className="navbar-btn" to="/login">
            Login
          </button>
        )}
        {user ? (
          <button
            className="navbar-btn"
            id="add-review-popup"
            onClick={() => setShowPopup(true)}
          >
            Add
          </button>
        ) : (
          <input placeholder="Search"></input>
        )}
        {showPopup && (
          <AddReviewPopup onClose={() => setShowPopup(false)}></AddReviewPopup>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
