import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const NavLinks = ({ menuOpen, handleNavClick }) => (
  <ul className={`nav-links${menuOpen ? " active" : ""}`}>
    <li><Link to="/" onClick={handleNavClick}>INICIO</Link></li>
    <li><Link to="/prendas" onClick={handleNavClick}>PRENDAS</Link></li>
    <li><Link to="/nosotros" onClick={handleNavClick}>NOSOTROS</Link></li>
    <li><Link to="/blog" onClick={handleNavClick}>BLOG</Link></li>
    <li className="cart-icon">
      <Link to="/carrito" onClick={handleNavClick}>
        <FaShoppingBag />
        <span id="cart-count">0</span>
      </Link>
    </li>
  </ul>
);

export default NavLinks;