import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/registrationSlice";
import "./RegistrationForm.css";
import illustration from "../assets/Illustrasi Login.png";
import logo from "../assets/Logo.png";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const { loading, error, success } = useSelector(
    (state) => state.registration
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password tidak sama");
      return;
    } else {
      setPasswordError(null);
    }

    if (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.password
    ) {
      dispatch(registerUser(formData));
    } else {
      alert("Please fill all fields.");
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
          <input
            type="email"
            name="email"
            placeholder="Masukkan email anda"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Nama depan"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nama belakang"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Buat password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
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
