import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
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
    </nav>
  );
}

export default Navbar;
