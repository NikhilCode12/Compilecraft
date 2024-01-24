import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthApp from "./AuthApp";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authorized" element={<AuthApp />} />
      </Routes>
    </Router>
  );
};

export default routes;
