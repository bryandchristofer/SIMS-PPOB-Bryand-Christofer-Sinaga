// src/components/ProfileBalanceSection.js
import React, { useState } from "react";
import "./ProfileBalanceSection.css";

const ProfileBalanceSection = ({ profile, balance }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="profile-balance-section">
      {profile && (
        <div className="profile-info">
          <img
            src={profile.profile_image}
            alt={`${profile.first_name} ${profile.last_name}`}
            className="profile-picture"
          />
          <h2>
            Selamat datang, {profile.first_name} {profile.last_name}
          </h2>
        </div>
      )}
      {balance !== undefined && (
        <div className="balance-card">
          <h3>Saldo anda</h3>
          <p className="balance-amount">
            {/* Use balance?.amount to ensure we access the amount safely */}
            {isBalanceVisible
              ? `Rp ${balance?.amount?.toLocaleString("id-ID")}`
              : "*******"}
          </p>
          <button className="balance-button" onClick={toggleBalanceVisibility}>
            {isBalanceVisible ? "Sembunyikan Saldo" : "Lihat Saldo"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBalanceSection;
