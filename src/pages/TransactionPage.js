import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../store/transactionSlice";
import { fetchHomeData } from "../store/homeSlice";
import Navbar from "../components/Navbar";
import ProfileBalanceSection from "../components/ProfileBalanceSection";
import "./TransactionPage.css";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { history, loading, error, hasMore } = useSelector(
    (state) => state.transaction
  );
  const profile = useSelector((state) => state.home.profile);
  const balance = useSelector((state) => state.home.balance?.amount || 0);

  useEffect(() => {
    dispatch(fetchHomeData());
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(fetchTransactionHistory());
  };

  return (
    <div className="transaction-page-container">
      <Navbar />
      <ProfileBalanceSection profile={profile} balance={{ amount: balance }} />

      <section className="transaction-history-container">
        <h3>Semua Transaksi</h3>
        {error && <p className="error-message">{error}</p>}
        {history.map((transaction) => (
          <div key={transaction.invoice_number} className="transaction-item">
            <span
              className={`transaction-amount ${
                transaction.transaction_type === "TOPUP"
                  ? "positive"
                  : "negative"
              }`}
            >
              {transaction.transaction_type === "TOPUP" ? "+" : "-"} Rp
              {Math.abs(transaction.total_amount).toLocaleString("id-ID")}
            </span>
            <span className="transaction-description">
              {transaction.description}
            </span>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        {hasMore && !loading && (
          <button onClick={handleShowMore} className="show-more-button">
            Show more
          </button>
        )}
      </section>
    </div>
  );
};

export default TransactionPage;
