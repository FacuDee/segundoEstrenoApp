import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Banner.css';
import bannerImage from '../../assets/banners/bannerHorizontal.png';

// Componente Banner que redirige a la página de prendas al hacer clic
const Banner = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate('/prendas');
  };

  return (
    <section className="banner-section">
      <div 
        className="banner-container"
        onClick={handleBannerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleBannerClick();
          }
        }}
      >
        <img 
          src={bannerImage} 
          alt="Banner promocional Segundo Estreno - Haz clic para ver todas las prendas" 
          className="banner-image"
        />
      </div>
    </section>
  );
};

export default Banner;