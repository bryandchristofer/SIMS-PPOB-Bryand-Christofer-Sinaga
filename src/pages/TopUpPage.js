import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNominal,
  topUpUser,
  selectNominal,
  resetTopUpState,
} from "../store/topUpSlice";
import { fetchHomeData } from "../store/homeSlice";
import Navbar from "../components/Navbar";
import ProfileBalanceSection from "../components/ProfileBalanceSection";
import "./TopUpPage.css";

const TopUpPage = () => {
  const dispatch = useDispatch();
  const nominal = useSelector(selectNominal);
  const isTopUpDisabled = useSelector(
    (state) => state.topUp.loading || !nominal || parseInt(nominal) <= 0
  );
  const { loading, success, error } = useSelector((state) => state.topUp);
  const balance = useSelector((state) => state.home.balance?.amount || 0);
  const profile = useSelector((state) => state.home.profile);

  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [confirmedNominal, setConfirmedNominal] = useState(0);

  useEffect(() => {
    dispatch(resetTopUpState());
    dispatch(fetchHomeData());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      setShowModal(false);
      setShowResult(true);
    }
  }, [success, error]);

  const handlePresetClick = (amount) => {
    dispatch(setNominal(amount.toString()));
  };

  const handleInputChange = (e) => {
    dispatch(setNominal(e.target.value));
  };

  const handleTopUpClick = () => {
    setShowModal(true);
  };

  const handleConfirmTopUp = () => {
    const parsedAmount = parseInt(nominal) || 0;
    setConfirmedNominal(parsedAmount);
    dispatch(topUpUser());
  };

  const handleCloseResult = () => {
    setShowResult(false);
    if (success) dispatch(fetchHomeData());
  };

  return (
    <div className="top-up-container">
      <Navbar />

      <ProfileBalanceSection profile={profile} balance={{ amount: balance }} />

      <section className="top-up-input-section">
        <p>
          Silahkan masukan <strong>Nominal Top Up</strong>
        </p>
        <div className="input-button-container">
          <input
            type="number"
            className="top-up-input"
            placeholder="Masukkan nominal Top Up"
            value={nominal}
            onChange={handleInputChange}
          />
          <div className="preset-buttons-group">
            {[10000, 20000, 50000].map((amount) => (
              <button key={amount} onClick={() => handlePresetClick(amount)}>
                Rp{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
        <div className="top-up-button-container">
          <button
            className="top-up-button"
            onClick={handleTopUpClick}
            disabled={isTopUpDisabled || loading}
          >
            {loading ? "Processing..." : "Top Up"}
          </button>
          <div className="preset-buttons-group">
            {[100000, 250000, 500000].map((amount) => (
              <button key={amount} onClick={() => handlePresetClick(amount)}>
                Rp{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Anda yakin untuk Top Up sebesar</p>
            <h2>Rp{(parseInt(nominal) || 0).toLocaleString("id-ID")} ?</h2>
            <button onClick={handleConfirmTopUp} className="confirm-button">
              Ya, lanjutkan Top Up
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="cancel-button"
            >
              Batalkan
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <div className="modal-overlay">
          <div className="modal-content">
            {success ? (
              <>
                <p>Top Up sebesar</p>
                <h2>Rp{confirmedNominal.toLocaleString("id-ID")} berhasil!</h2>
                <button onClick={handleCloseResult} className="back-button">
                  Kembali ke Beranda
                </button>
              </>
            ) : (
              <>
                <p>Top Up gagal!</p>
                <p>{error}</p>
                <button onClick={handleCloseResult} className="back-button">
                  Kembali ke Beranda
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpPage;
