
import React, { useState } from "react";
import "./Modal.css";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error de autenticación");
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onClose();
      // Acá se podrías actualizar el estado global de usuario
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>INICIAR SESIÓN</h2>
          <span className="close" onClick={onClose}>×</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">ENTRAR</button>
          {error && <div style={{ color: "red", marginTop: "0.5em" }}>{error}</div>}
          <p className="question">
            ¿Todavía no te registraste?
            <button type="button" className="link-btn" onClick={onSwitchToRegister}>
              CREAR CUENTA
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
