
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "./Modal.css";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess, prefilledData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Actualizar campos cuando se reciben datos prellenados
  React.useEffect(() => {
    if (prefilledData && isOpen) {
      setEmail(prefilledData.email || "");
      setPassword(prefilledData.password || "");
      setError(""); // Limpiar errores previos
    }
  }, [prefilledData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
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
      
      // Decodificar token para obtener info del usuario
      const decoded = jwtDecode(data.access_token);
      const userName = decoded.nombre || decoded.username || decoded.email;
      
      onClose();
      
      // Actualizar estado del header
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Mostrar mensaje de bienvenida con Sweet Alert
      Swal.fire({
        title: '¡Bienvenido/a!',
        text: `Hola ${userName}, gracias por ser parte de Segundo Estreno.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        allowOutsideClick: false
      }).then(() => {
        // Redirigir a Mi Cuenta después del alert
        navigate('/micuenta');
      });
      
      // Si el usuario cierra el alert manualmente, también redirigir  
      setTimeout(() => {
        navigate('/micuenta');
      }, 2100);
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
