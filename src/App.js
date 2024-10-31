// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage"; // Assuming you have a HomePage component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />{" "}
          {/* Login page as the default */}
          <Route path="/register" element={<RegistrationForm />} />{" "}
          {/* Registration page */}
          <Route path="/home" element={<HomePage />} />{" "}
          {/* Main page after login */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
