import React, { useState, useEffect } from 'react';
import { FaStore, FaCalendarAlt, FaDollarSign, FaUser } from 'react-icons/fa';

const VentasUsuario = ({ userId }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    fetchVentas();
  }, [userId]);

  const fetchVentas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/transaccion/vendedor/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setVentas(data);
        const total = data.reduce((sum, venta) => sum + parseFloat(venta.total), 0);
        setTotalVentas(total);
      }
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando ventas...</div>;

  return (
    <div className="ventas-usuario">
      <div className="section-header">
        <FaStore className="section-icon" />
        <h2>Mis Ventas</h2>
      </div>

      <div className="ventas-stats">
        <div className="stat-card">
          <h3>Total de Ventas</h3>
          <p className="stat-number">{ventas.length}</p>
        </div>
        <div className="stat-card">
          <h3>Ingresos Totales</h3>
          <p className="stat-number">${totalVentas.toFixed(2)}</p>
        </div>
      </div>

      {ventas.length === 0 ? (
        <div className="empty-state">
          <p>No tienes ventas registradas aún.</p>
        </div>
      ) : (
        <div className="ventas-list">
          {ventas.map((venta, idx) => (
            <div key={`${venta.id}-${venta.fecha}-${idx}`} className="venta-item">
              <div className="venta-info">
                <h3>Venta # {venta.id}</h3>
                <div className="venta-details">
                  <span className="fecha">
                    <FaCalendarAlt /> {new Date(venta.fecha).toLocaleDateString()}
                  </span>
                  <span className="total">
                    <FaDollarSign /> {venta.total}
                  </span>
                  <span className="comprador">
                    <FaUser /> Comprador: <strong>{venta.comprador}</strong>
                  </span>
                </div>
              </div>
              <div className="venta-prendas">
                {venta.prendas && venta.prendas.map((prenda, pidx) => (
                  <div key={`${prenda.id}-${venta.id}-${pidx}`} className="prenda-vendida">
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

export default VentasUsuario;