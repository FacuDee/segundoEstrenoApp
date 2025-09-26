import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Props: user (object with username), onLogout (function)
const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  const handleMiCuenta = () => {
    navigate("/micuenta");
    setOpen(false);
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <span id="user-icon" onClick={() => setOpen((v) => !v)}>
        <FaUserCircle className="icon" />
        <span className="user-name">{user?.username || user?.email}</span>
      </span>
      <div className={`user-dropdown${open ? "" : " hidden"}`}>
        <button
          id="mi-cuenta-btn"
          className="dropdown-item"
          onClick={handleMiCuenta}
        >
          Mi cuenta
        </button>
        <button
          id="logout-btn"
          className="dropdown-item"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
