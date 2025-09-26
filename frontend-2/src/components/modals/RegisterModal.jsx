
import React, { useState } from "react";
import "./Modal.css";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error al registrar");
        return;
      }
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onClose();
      // Aquí podrías actualizar el estado global de usuario si lo tienes
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>CREA TU CUENTA</h2>
          <span className="close" onClick={onClose}>×</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Repetir contraseña"
            required
            autoComplete="current-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button type="submit">REGISTRARSE</button>
          {error && <div style={{ color: "red", marginTop: "0.5em" }}>{error}</div>}
          <p className="question">
            ¿Ya tenés una cuenta?
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>
              INICIAR SESIÓN
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
