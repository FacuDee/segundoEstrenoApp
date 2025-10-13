import React from 'react';
import './Compromisos.css';
import { compromisosData } from '../../data/compromisosData';
import { FaRecycle, FaLeaf, FaHandHoldingHeart, FaTshirt } from 'react-icons/fa';

const Compromisos = () => {
  // Mapeo de iconos
  const iconMap = {
    'recycle': FaRecycle,
    'leaf': FaLeaf,
    'hand-holding-heart': FaHandHoldingHeart,
    'shirt': FaTshirt
  };

  return (
    <section className="compromisos-section">
      <div className="compromisos-container">
        <h2 className="compromisos-title">NUESTROS COMPROMISOS</h2>
        <div className="compromisos-grid">
          {compromisosData.map((compromiso) => {
            const IconComponent = iconMap[compromiso.icon];
            return (
              <div key={compromiso.id} className="compromiso-item">
                <IconComponent className="compromiso-icon" />
                <h3>{compromiso.title}</h3>
                <p>{compromiso.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Compromisos;