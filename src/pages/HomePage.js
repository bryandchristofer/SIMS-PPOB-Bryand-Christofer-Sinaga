import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../store/homeSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileBalanceSection from "../components/ProfileBalanceSection";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { profile, balance, services, banners, loading, error } = useSelector(
    (state) => state.home
  );

  const [isDragging, setIsDragging] = useState(false);
  const bannerListRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - bannerListRef.current.offsetLeft);
    setScrollLeft(bannerListRef.current.scrollLeft);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const drag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - bannerListRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    bannerListRef.current.scrollLeft = scrollLeft - walk;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="homepage-container">
      <Navbar />
      <ProfileBalanceSection profile={profile} balance={balance} />

      <section className="services-section">
        {services.map((service) => (
          <Link
            key={service.service_code}
            to={`/${service.service_code.toLowerCase().replace(/_/g, "-")}`}
            className="service-card-link"
          >
            <div className="service-card">
              <img src={service.service_icon} alt={service.service_name} />
              <p>{service.service_name}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="banner-section">
        <p>Temukan promosi menarik</p>
        <div
          className="banner-list"
          ref={bannerListRef}
          onMouseDown={startDrag}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={drag}
        >
          {banners.map((banner) => (
            <div key={banner.banner_name} className="banner-card">
              <img src={banner.banner_image} alt={banner.banner_name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
