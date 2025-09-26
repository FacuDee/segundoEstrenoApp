import React from "react";
import "./Modal.css";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>CREA TU CUENTA</h2>
          <span className="close" onClick={onClose}>×</span>
        </div>
        <form>
          <input type="text" placeholder="Nombre de usuario" required autoComplete="username" />
          <input type="email" placeholder="Email" required autoComplete="username" />
          <input type="password" placeholder="Contraseña" required autoComplete="current-password" />
          <input type="password" placeholder="Repetir contraseña" required autoComplete="current-password" />
          <button type="submit">REGISTRARSE</button>
          <p className="question">
            ¿Ya tenés una cuenta?
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>INICIAR SESIÓN</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
