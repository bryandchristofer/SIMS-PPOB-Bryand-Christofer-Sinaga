import React from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionModal.css";

const TransactionModal = ({
  isOpen,
  onClose,
  isSuccess,
  amount,
  serviceName,
  onBackLink,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBack = () => {
    onClose();
    navigate(onBackLink);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className={`modal-icon ${isSuccess ? "success" : "failure"}`}>
          {isSuccess ? "✔️" : "❌"}
        </div>
        <h3>
          {isSuccess
            ? `Pembayaran ${serviceName} sebesar`
            : "Transaksi gagal untuk"}
        </h3>
        <p className="amount">Rp {amount.toLocaleString("id-ID")}</p>
        {isSuccess && <p>berhasil!!</p>}
        <button className="back-button" onClick={handleBack}>
          Kembali ke {serviceName ? serviceName : "Beranda"}
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
