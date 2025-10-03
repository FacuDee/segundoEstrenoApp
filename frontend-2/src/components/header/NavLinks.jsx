import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const NavLinks = ({ menuOpen, handleNavClick }) => {
  const { getCartCount, openCart } = useCart();
  
  const handleCartClick = (e) => {
    e.preventDefault();
    openCart();
    handleNavClick();
  };

  return (
    <ul className={`nav-links${menuOpen ? " active" : ""}`}>
      <li><Link to="/" onClick={handleNavClick}>INICIO</Link></li>
      <li><Link to="/prendas" onClick={handleNavClick}>PRENDAS</Link></li>
      <li><Link to="/nosotros" onClick={handleNavClick}>NOSOTROS</Link></li>
      <li><Link to="/blog" onClick={handleNavClick}>BLOG</Link></li>
      <li className="cart-icon">
        <Link to="/carrito" onClick={handleNavClick} className="cart-link">
          <FaShoppingBag />
          <span>CARRITO</span>
          {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;