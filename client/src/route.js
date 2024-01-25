import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import AuthApp from "./AuthApp";

const MyRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("MyRoutes component mounted");

    // Check authentication status when the component mounts
    checkAuthentication();
  }, []);

  // Function to check authentication status
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    // Update isAuthenticated state based on the token
    setIsAuthenticated(!!token);
  };

  return (
    <Router>
      <Routes>
        {/* Public route accessible to all */}
        <Route path="/" element={<App />} />

        {/* Private route, only accessible if authenticated */}
        <Route
          path="/authorized"
          element={
            isAuthenticated ? (
              <AuthApp checkAuthentication={checkAuthentication} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/cppcraft"
          element={
            isAuthenticated ? (
              <App checkAuthentication={checkAuthentication} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Other routes... */}
      </Routes>
    </Router>
  );
};

export default MyRoutes;
