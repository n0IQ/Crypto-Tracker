import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./NavBarStyles.css";

const NavBar = () => {
  return (
    <nav className="navbarContainer">
      <h3 className="navTitle">Crypto Tracker</h3>
      <AiOutlineSearch className="searchIcon" />
    </nav>
  );
};

export default NavBar;
