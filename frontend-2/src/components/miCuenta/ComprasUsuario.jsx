import React, { useState, useEffect } from 'react';
import { FaShoppingBag, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const ComprasUsuario = ({ userId }) => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompras();
  }, [userId]);

  const fetchCompras = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/transaccion/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCompras(data);
      }
    } catch (error) {
      console.error('Error al cargar compras:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando compras...</div>;

  return (
    <div className="compras-usuario">
      <div className="section-header">
        <FaShoppingBag className="section-icon" />
        <h2>Mis Compras</h2>
      </div>

      {compras.length === 0 ? (
        <div className="empty-state">
          <p>No tienes compras registradas aún.</p>
        </div>
      ) : (
        <div className="compras-list">
          {compras.map(compra => (
            <div key={compra.id} className="compra-item">
              <div className="compra-info">
                <h3>Compra # {compra.id}</h3>
                <div className="compra-details">
                  <span className="fecha">
                    <FaCalendarAlt /> {new Date(compra.fecha).toLocaleDateString()}
                  </span>
                  <span className="total">
                    <FaDollarSign /> {compra.total}
                  </span>
                </div>
              </div>
              <div className="compra-prendas">
                {compra.prendas && compra.prendas.map(prenda => (
                  <div key={prenda.id} className="prenda-comprada">
                    <img src={prenda.imagen_url} alt={prenda.titulo} />
                    <div className="prenda-info">
                      <h4>{prenda.titulo}</h4>
                      <p>${prenda.precio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComprasUsuario;