// src/components/HomePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../store/homeSlice";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { profile, balance, services, banners, loading, error } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src="/path/to/logo.png" alt="SIMS PPOB Logo" className="logo" />
        <h1 className="title">SIMS PPOB</h1>
        <nav className="navigation">
          <a href="/topup">Top Up</a>
          <a href="/transaction">Transaction</a>
          <a href="/account">Akun</a>
        </nav>
      </header>

      <section className="profile-section">
        <img
          src="/path/to/profile-picture.png"
          alt="Profile"
          className="profile-picture"
        />
        <h2>
          Selamat datang, <span className="username">{profile?.name}</span>
        </h2>
      </section>

      <section className="balance-section">
        <div className="balance-card">
          <h3>Saldo anda</h3>
          <p className="balance-amount">Rp {balance?.amount}</p>
          <button className="balance-button">Lihat Saldo</button>
        </div>
      </section>

      <section className="services-section">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.icon} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </section>

      <section className="banner-section">
        {banners.map((banner) => (
          <div key={banner.id} className="banner-card">
            <img src={banner.image} alt={banner.title} />
            <p>{banner.title}</p>
            <span>{banner.description}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
