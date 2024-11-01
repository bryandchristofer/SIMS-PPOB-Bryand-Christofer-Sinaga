import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/registrationSlice";
import "./RegistrationForm.css";
import illustration from "../assets/Illustrasi Login.png";
import logo from "../assets/Logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, error, success } = useSelector(
    (state) => state.registration
  );
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "Nama depan diperlukan";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Nama belakang diperlukan";
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Email yang valid diperlukan";
    }
    if (!formData.password) {
      newErrors.password = "Password diperlukan";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Password tidak sama",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div className="logo-title">
          <img src={logo} alt="SIMS PPOB Logo" className="logo" />
          <h1 className="title">SIMS PPOB</h1>
        </div>
        <h2>Lengkapi data untuk membuat akun</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Masukkan email anda"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-field">
            <input
              type="text"
              name="firstName"
              placeholder="Nama depan"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>

          <div className="input-field">
            <input
              type="text"
              name="lastName"
              placeholder="Nama belakang"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>

          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Buat password"
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
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="input-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Konfirmasi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registrasi..." : "Registrasi"}
          </button>
        </form>
        <p>
          sudah punya akun? login<a href="/"> di sini</a>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Registration successful!</p>}
      </div>
      <div className="registration-illustration">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
};

export default RegistrationForm;
