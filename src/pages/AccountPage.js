// src/components/AccountPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfileData,
  updateProfileImage,
  logout,
} from "../store/accountSlice";
import Navbar from "../components/Navbar";
import defaultProfileImage from "../assets/Profile Photo.png"; // Default image path
import "./AccountPage.css";

const AccountPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.account.profile);

  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setEmail(profile.email);
      setPreviewImage(profile.profile_image || defaultProfileImage);
    }
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      file.size <= 100 * 1024
    ) {
      // Check file type and size
      const formData = new FormData();
      formData.append("profile_image", file);
      setPreviewImage(URL.createObjectURL(file));
      dispatch(updateProfileImage(formData)).then((response) => {
        if (response.error) {
          alert("Failed to upload image. Please try again.");
        } else {
          setNotification("Profile image updated successfully!");
        }
      });
    } else {
      alert("Please select a JPEG or PNG image under 100 KB.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNotification(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNotification(null);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setEmail(profile.email);
  };

  const handleSaveClick = async () => {
    const updatedProfile = {
      email,
      first_name: firstName,
      last_name: lastName,
    };
    const result = await dispatch(updateProfileData(updatedProfile));

    if (result.payload?.status === 0) {
      setNotification("Profile updated successfully!");
      setIsEditing(false);
    } else {
      setNotification("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="account-page-wrapper">
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className="account-content-container">
        <section className="profile-section">
          <div className="profile-picture-container">
            <label htmlFor="profile-picture">
              <img
                src={previewImage}
                alt="Profile"
                className="profile-picture"
              />
              <input
                type="file"
                id="profile-picture"
                accept="image/jpeg, image/png"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
          </div>
          <h2 className="username">{`${firstName} ${lastName}`}</h2>
        </section>

        <section className="profile-details">
          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                className="edit-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="detail-box">{email}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Nama Depan</label>
            {isEditing ? (
              <input
                type="text"
                className="edit-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            ) : (
              <div className="detail-box">{firstName}</div>
            )}
          </div>

          <div className="profile-field">
            <label>Nama Belakang</label>
            {isEditing ? (
              <input
                type="text"
                className="edit-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <div className="detail-box">{lastName}</div>
            )}
          </div>

          {notification && <p className="notification">{notification}</p>}

          <button
            className="edit-button"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? "Simpan" : "Edit Profile"}
          </button>

          <button
            className="logout-button"
            onClick={isEditing ? handleCancelClick : handleLogout}
          >
            {isEditing ? "Batalkan" : "Logout"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;