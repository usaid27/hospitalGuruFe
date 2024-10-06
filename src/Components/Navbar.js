import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/Hospital Guru Logo.png";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import Chatbox from "./Chatbox";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    setIsChatboxOpen(true);
  };

  const closeChatbox = () => {
    setIsChatboxOpen(false);
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          <img src={logo} alt="Hospital Guru" className="navbar-logo logo-size" />
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">Home</Link>
        </li>
        <li>
          <Link to="/about" className="navbar-links">About</Link>
        </li>
        <li>
          <Link to="/doctors" className="navbar-links">Doctors</Link>
        </li>
        <li>
          <Link to="/hospitals" className="navbar-links">Hospitals</Link>
        </li>
        <li>
          <Link to="/MedicalProcedure" className="navbar-links">Procedures</Link>
        </li>
        <li>
          <Link to="/reviews" className="navbar-links">Reviews</Link>
        </li>
      </ul>

      <button className="navbar-btn" type="button" onClick={handleChatBtnClick}>
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
      </button>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">Home</Link>
          </li>
          <li>
            <Link onClick={openNav} to="/about">About</Link>
          </li>
          <li>
            <Link onClick={openNav} to="/doctors">Doctors</Link>
          </li>
          <li>
            <Link onClick={openNav} to="/hospitals">Hospitals</Link>
          </li>
          <li>
            <Link onClick={openNav} to="/procedures">Procedures</Link>
          </li>
          <li>
            <Link onClick={openNav} to="/reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>

      {/* Chatbox */}
      {isChatboxOpen && <Chatbox onClose={closeChatbox} />}
    </div>
  );
}

export default Navbar;
