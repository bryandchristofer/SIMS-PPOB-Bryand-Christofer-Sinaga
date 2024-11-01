// src/components/ServicePaymentPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import ProfileBalanceSection from "../components/ProfileBalanceSection";
import TransactionModal from "../components/TransactionModal";
import "./ServicePaymentPage.css";
import axios from "axios";
import { fetchHomeData } from "../store/homeSlice";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

const ServicePaymentPage = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const { profile, balance, services } = useSelector((state) => state.home);

  const service = services.find(
    (service) =>
      service.service_code.toLowerCase().replace(/_/g, "-") === serviceId
  );

  const [paymentAmount, setPaymentAmount] = useState(
    service?.service_tariff || 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    if (balance.amount < paymentAmount) {
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/transaction`,
        {
          service_code: service.service_code,
          total_amount: paymentAmount,
          transaction_type: "PAYMENT",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 0) {
        setIsSuccess(true);
        setIsModalOpen(true);
        dispatch(fetchHomeData());
      } else {
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsSuccess(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="service-payment-container">
      <Navbar />
      <ProfileBalanceSection profile={profile} balance={balance} />

      <section className="service-payment-section">
        <h3 className="payment-title">Pembayaran</h3>
        <div className="service-info">
          <img
            src={service?.service_icon}
            alt={service?.service_name}
            className="service-icon"
          />
          <p className="service-name">{service?.service_name}</p>
        </div>
        <input
          type="text"
          className="payment-input"
          value={paymentAmount.toLocaleString("id-ID")}
          onChange={(e) =>
            setPaymentAmount(parseInt(e.target.value.replace(/\D/g, "")) || 0)
          }
          placeholder="Masukkan nominal"
        />
        <button className="payment-button" onClick={handlePayment}>
          Bayar
        </button>
      </section>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSuccess={isSuccess}
        amount={paymentAmount}
        serviceName={service?.service_name}
        onBackLink={`/${serviceId}`}
      />
    </div>
  );
};

export default ServicePaymentPage;
