// src/components/LoginForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuthenticated } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from "../assets/Logo.png";
import illustration from "../assets/Illustrasi Login.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { loading, error } = useSelector((state) => state.login);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main"); // Redirect to the main page upon successful login
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-title">
          <img src={logo} alt="SIMS PPOB Logo" className="logo" />
          <h1 className="title">SIMS PPOB</h1>
        </div>
        <h2>Masuk atau buat akun untuk memulai</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Masukkan password anda"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          belum punya akun? <a href="/register">registrasi di sini</a>
        </p>
      </div>
      <div className="login-illustration">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
};

export default LoginForm;
