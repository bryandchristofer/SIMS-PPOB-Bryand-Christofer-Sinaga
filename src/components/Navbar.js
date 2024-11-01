import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/home" className="navbar-brand">
        {" "}
        <img src={logo} alt="SIMS PPOB Logo" className="navbar-logo" />
        <h1 className="navbar-title">SIMS PPOB</h1>
      </Link>
      <nav className="navbar-navigation">
        <Link to="/topup">Top Up</Link>
        <Link to="/transaction">Transaction</Link>
        <Link to="/account">Akun</Link>
      </nav>
    </header>
  );
};

export default Navbar;
