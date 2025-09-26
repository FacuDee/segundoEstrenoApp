import React from "react";
import { FaShoppingBag } from "react-icons/fa";

const NavLinks = ({ menuOpen, handleNavClick }) => (
  <ul className={`nav-links${menuOpen ? " active" : ""}`}>
    <li><a href="/" onClick={handleNavClick}>INICIO</a></li>
    <li><a href="/prendas" onClick={handleNavClick}>PRENDAS</a></li>
    <li><a href="/nosotros" onClick={handleNavClick}>NOSOTROS</a></li>
    <li><a href="/blog" onClick={handleNavClick}>BLOG</a></li>
    <li className="cart-icon">
      <a href="/carrito" onClick={handleNavClick}>
        <FaShoppingBag />
        <span id="cart-count">0</span>
      </a>
    </li>
  </ul>
);

export default NavLinks;