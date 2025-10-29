import React, { useState, useEffect } from 'react';
import { FaTimes, FaShoppingBag, FaStore } from 'react-icons/fa';
import './UserDetailModal.css';

const UserDetailModal = ({ user, isOpen, onClose }) => {
  const [userPrendas, setUserPrendas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserPrendas();
    }
  }, [isOpen, user]);

  const fetchUserPrendas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let endpoint = '';
      
      if (user.rol === 'comprador') {
        // Por ahora, no mostramos compras hasta implementar correctamente las transacciones
        setUserPrendas([]);
        setLoading(false);
        return;
      } else if (user.rol === 'vendedor' || user.rol === 'admin') {
        // Buscar prendas publicadas por el vendedor
        endpoint = `/api/prenda/usuario/${user.id}`;
      }
      
      if (endpoint) {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserPrendas(data);
        } else {
          console.error('Error al obtener prendas del usuario:', response.status);
        }
      }
    } catch (error) {
      console.error('Error al cargar prendas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="user-detail-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Detalle del Usuario</h3>
          <button onClick={onClose} className="btn-close">
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <div className="user-info-grid">
            <div className="info-item">
              <label>Usuario:</label>
              <span>{user.username || user.nombre}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Rol:</label>
              <span className={`rol-badge rol-${user.rol}`}>
                {user.rol}
              </span>
            </div>
            <div className="info-item">
              <label>Fecha de Registro:</label>
              <span>{new Date(user.createdAt || Date.now()).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          {/* Sección de prendas según el rol */}
          <div className="user-prendas-section">
            <div className="section-header">
              {user.rol === 'comprador' ? (
                <>
                  <FaShoppingBag className="section-icon" />
                  <h4>Prendas Compradas</h4>
                </>
              ) : user.rol === 'vendedor' ? (
                <>
                  <FaStore className="section-icon" />
                  <h4>Prendas Publicadas</h4>
                </>
              ) : (
                <>
                  <FaStore className="section-icon" />
                  <h4>Actividad</h4>
                </>
              )}
            </div>

            {loading ? (
              <div className="loading-prendas">Cargando prendas...</div>
            ) : userPrendas.length > 0 ? (
              <div className="prendas-list">
                {userPrendas.map((item, index) => (
                  <div key={item.id || index} className="prenda-item">
                    {user.rol === 'comprador' ? (
                      // Mostrar transacción/compra
                      <>
                        <div className="prenda-info">
                          <span className="prenda-name">Compra #{item.id}</span>
                          <span className="prenda-date">
                            {new Date(item.fecha || item.createdAt).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="prenda-price">
                          ${item.total || item.precio}
                        </div>
                      </>
                    ) : (
                      // Mostrar prenda publicada con imagen, nombre y precio
                      <>
                        <div className="prenda-image">
                          {item.imagen_url ? (
                            <img 
                              src={item.imagen_url} 
                              alt={item.titulo}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="image-placeholder">📷</div>';
                              }}
                            />
                          ) : (
                            <div className="image-placeholder">📷</div>
                          )}
                        </div>
                        <div className="prenda-info">
                          <div className="prenda-name">{item.titulo}</div>
                          <div className="prenda-category">
                            {item.categoria?.nombre || 'Sin categoría'} • Talle {item.talle}
                          </div>
                        </div>
                        <div className="prenda-price">
                          ${item.precio}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-prendas">
                {user.rol === 'comprador' 
                  ? 'Sistema de compras en desarrollo' 
                  : user.rol === 'vendedor' 
                  ? 'No tiene prendas publicadas' 
                  : 'Sin actividad registrada'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;