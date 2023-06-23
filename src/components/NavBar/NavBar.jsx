import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./NavBarStyles.css";
import logo from "../../assests/CryptoLogo.jpeg";

const NavBar = () => {
  return (
    <nav className="navbarContainer">
      <div className="navbarSubContainer">
        <img src={logo} alt="crypto-logo" className="cryptoLogo" />
        <h3 className="navTitle">Crypto Tracker</h3>
      </div>

      <AiOutlineSearch className="searchIcon" />
    </nav>
  );
};

export default NavBar;
