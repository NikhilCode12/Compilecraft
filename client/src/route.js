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

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    if (token) {
      // Token exists, you may want to validate it or set the user as authenticated in your state
      setIsAuthenticated(true);
    } else {
      // No token, user is not authenticated
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public route accessible to all */}
        <Route path="/" element={<App />} />

        {/* Private route, only accessible if authenticated */}
        <Route
          path="/authorized"
          element={isAuthenticated ? <AuthApp /> : <Navigate to="/" replace />}
        />

        <Route
          path="/cppcraft"
          element={isAuthenticated ? <App /> : <Navigate to="/" replace />}
        />

        {/* Other routes... */}
      </Routes>
    </Router>
  );
};

export default MyRoutes;
