import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Layout from "./Layout";
import "./global.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/:username"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
