import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import AccountActions from "./AccountActions";
import UserMenu from "./UserMenu";
import { jwtDecode } from "jwt-decode";
import NavLinks from "./NavLinks";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import CartModal from "../cart/CartModal";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [prefilledLoginData, setPrefilledLoginData] = useState(null);

  // Cierra el menú al hacer click en un link
  const handleNavClick = () => setMenuOpen(false);

  // Cierra el menú al hacer click fuera
  const handleOverlayClick = (e) => {
    if (
      menuOpen &&
      !e.target.closest(".nav-links") &&
      !e.target.closest(".menu-toggle")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOverlayClick);
    return () => document.removeEventListener("mousedown", handleOverlayClick);
  });

  // Leer usuario del token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [showLogin, showRegister]);

  // Escuchar eventos de actualización del usuario
  useEffect(() => {
    const handleUserUpdate = (event) => {
      const updatedUser = event.detail;
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  // Handlers para abrir/cerrar modales
  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setPrefilledLoginData(null); // Limpiar datos prellenados
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };
  
  const handleRegisterSuccess = (email, password) => {
    setPrefilledLoginData({ email, password });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <Logo />
            <SearchBar />
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <AccountActions onLogin={openLogin} onRegister={openRegister} />
            )}
          </div>
        </div>
      </div>
      <nav className="nav">
        <div className="container">
          <NavLinks menuOpen={menuOpen} handleNavClick={handleNavClick} />
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-label="Menú"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {/* Modales */}
      <LoginModal
        isOpen={showLogin}
        onClose={closeModals}
        onSwitchToRegister={openRegister}
        prefilledData={prefilledLoginData}
        onLoginSuccess={() => {
          // Actualizar estado del usuario después del login
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const decoded = jwtDecode(token);
              setUser(decoded);
            } catch (error) {
              console.error("Error decodificando token:", error);
            }
          }
          setPrefilledLoginData(null); // Limpiar datos después del login
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={closeModals}
        onSwitchToLogin={openLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <CartModal />
    </header>
  );
};

export default Header;
