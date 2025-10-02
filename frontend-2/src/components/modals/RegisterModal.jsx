
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Modal.css";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {

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
      const res = await fetch("/api/auth/register", {
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
      
      // No hacer login automático, mostrar mensaje de éxito
      onClose();
      
      // Mostrar Sweet Alert de registro exitoso
      Swal.fire({
        title: '¡Registro exitoso!',
        text: `Cuenta creada correctamente para ${email}. Ahora puedes iniciar sesión.`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
        confirmButtonText: 'Iniciar Sesión',
        timerProgressBar: true,
        allowOutsideClick: false
      }).then((result) => {
        // Redirigir al login con datos prellenados
        if (onRegisterSuccess) {
          onRegisterSuccess(email, password);
        }
        onSwitchToLogin();
      });
      
      // Si el usuario no hace clic, redirigir automáticamente
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess(email, password);
        }
        onSwitchToLogin();
      }, 3100);
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
