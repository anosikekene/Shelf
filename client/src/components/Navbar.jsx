import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddReviewPopup from "./AddReviewPopup";

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
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>

      {user ? (
        <Link to="/login" onClick={logout}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {user ? (
        <button id="add-review-popup" onClick={() => setShowPopup(true)}>
          Add
        </button>
      ) : (
        <input placeholder="Search"></input>
      )}
      {showPopup && (
        <AddReviewPopup onClose={() => setShowPopup(false)}></AddReviewPopup>
      )}
    </nav>
  );
}

export default Navbar;
