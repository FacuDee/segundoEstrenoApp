import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaRegAddressCard } from "react-icons/fa";
import PerfilUsuario from '../../components/miCuenta/PerfilUsuario.jsx';
import ComprasUsuario from '../../components/miCuenta/ComprasUsuario.jsx';
import VentasUsuario from '../../components/miCuenta/VentasUsuario.jsx';
import PrendasGestion from '../../components/miCuenta/PrendasGestion.jsx';
import UsuariosAdmin from '../../components/miCuenta/UsuariosAdmin.jsx';
import GestionarTodasPrendas from '../../components/miCuenta/GestionarTodasPrendas.jsx';
import './MiCuenta.css';

const MiCuenta = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // Se establecerá después de cargar el usuario

  // Función para actualizar el usuario después de cambios en el perfil
  const handleUserUpdate = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        
        // Establecer la pestaña por defecto basada en el rol
        const isVendedorOrAdmin = decoded.rol === 'vendedor' || decoded.rol === 'admin';
        setActiveTab(isVendedorOrAdmin ? 'prendas' : 'perfil');
      } catch (error) {
        console.error('Error decodificando token:', error);
        // Redirigir al login si el token es inválido
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } else {
      // Redirigir al login si no hay token
      window.location.href = '/';
    }
  }, []);

  if (!user || !activeTab) {
    return <div className="loading">Cargando...</div>;
  }

  const isVendedor = user.rol === 'vendedor' || user.rol === 'admin';
  const isAdmin = user.rol === 'admin';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <PerfilUsuario user={user} onUserUpdate={handleUserUpdate} />;
      case 'compras':
        return <ComprasUsuario userId={user.sub || user.id} />;
      case 'ventas':
        return isVendedor ? <VentasUsuario userId={user.sub || user.id} /> : null;
      case 'prendas':
        return isVendedor ? <PrendasGestion userId={user.sub || user.id} user={user} /> : null;
      case 'usuarios':
        return isAdmin ? <UsuariosAdmin /> : null;
      case 'todas-prendas':
        return isAdmin ? <GestionarTodasPrendas /> : null;
      default:
        return <PerfilUsuario user={user} onUserUpdate={handleUserUpdate} />;
    }
  };

  return (
    <div className="micuenta-container">
      <div className="micuenta-header">
        <h1>
          <FaRegAddressCard className="micuenta-user-icon" />
          Mi Cuenta
        </h1>
        <p>Bienvenido/a, {user.username || user.nombre}</p>
      </div>

      <div className="micuenta-content">
        <nav className="micuenta-nav">
          <button
            className={activeTab === 'perfil' ? 'active' : ''}
            onClick={() => setActiveTab('perfil')}
          >
            Mi Perfil
          </button>
          
          <button
            className={activeTab === 'compras' ? 'active' : ''}
            onClick={() => setActiveTab('compras')}
          >
            Mis Compras
          </button>

          {isVendedor && (
            <>
              <button
                className={activeTab === 'ventas' ? 'active' : ''}
                onClick={() => setActiveTab('ventas')}
              >
                Mis Ventas
              </button>
              
              <button
                className={activeTab === 'prendas' ? 'active' : ''}
                onClick={() => setActiveTab('prendas')}
              >
                Gestionar Prendas
              </button>
            </>
          )}

          {isAdmin && (
            <>
              <button
                className={activeTab === 'usuarios' ? 'active' : ''}
                onClick={() => setActiveTab('usuarios')}
              >
                Gestionar Usuarios
              </button>
              
              <button
                className={activeTab === 'todas-prendas' ? 'active' : ''}
                onClick={() => setActiveTab('todas-prendas')}
              >
                Todas las Prendas
              </button>
            </>
          )}
        </nav>

        <div className="micuenta-panel">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default MiCuenta;