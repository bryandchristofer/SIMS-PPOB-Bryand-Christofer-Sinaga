import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuthenticated } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from "../assets/Logo.png";
import illustration from "../assets/Illustrasi Login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { loading, error, message } = useSelector((state) => state.login);

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
      navigate("/home");
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
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Masukkan password anda"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <p>
          belum punya akun? registrasi <a href="/register"> di sini</a>
        </p>
      </div>
      <div className="login-illustration">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
};

export default LoginForm;
