import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";
function LoginPage() {
  const [email, setEmail] = useState(""); // creates state, establishes value and setter
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  if (user) return <Navigate to={`/${user}`} />;
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from unnecessarily reloading

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.username, data.token);
        navigate(`/${data.username}`);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
