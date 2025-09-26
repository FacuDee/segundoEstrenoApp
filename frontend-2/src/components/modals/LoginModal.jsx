import React from "react";
import "./Modal.css";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>INICIAR SESIÓN</h2>
          <span className="close" onClick={onClose}>×</span>
        </div>
        <form>
          <input type="text" placeholder="Usuario" required autoComplete="username" />
          <input type="password" placeholder="Contraseña" required autoComplete="current-password" />
          <button type="submit">ENTRAR</button>
          <p className="question">
            ¿Todavía no te registraste?
            <button type="button" className="link-btn" onClick={onSwitchToRegister}>CREAR CUENTA</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
