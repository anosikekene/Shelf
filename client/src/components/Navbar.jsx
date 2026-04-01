import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AddReviewPopup from "./AddReviewPopup";
import { useDashboard } from "../context/DashboardContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  //const [showPopup, setShowPopup] = useState(false);
  const { showPopup, setShowPopup } = useDashboard(false);
  const { isPopupVisible, setIsPopupVisible } = useDashboard();
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
          <button
            className="navbar-btn"
            onClick={() => setIsPopupVisible(true)}
          >
            Add
          </button>
        ) : (
          <input placeholder="Search"></input>
        )}
        {isPopupVisible && <AddReviewPopup setShowPopup={setIsPopupVisible} />}
      </div>
    </nav>
  );
}

export default Navbar;
