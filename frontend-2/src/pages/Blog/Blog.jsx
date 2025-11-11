// src/pages/Blog/Blog.jsx

import React, { useState, useEffect } from 'react';
import './Blog.css';
import { FaLeaf, FaWater, FaTshirt, FaHandsHelping, FaRecycle, FaGlobeAmericas, FaArrowUp } from 'react-icons/fa';
import PostCard from '../../components/blog/PostCard';
import EncuestaBlog from '../../components/blog/EncuestaBlog';
import { blogPosts } from '../../data/PostData';

// Componente principal del Blog
const Blog = () => {
  const [waterSaved, setWaterSaved] = useState(1250000);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Efecto para el contador de agua
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterSaved(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Efecto para el botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {/* Layout principal con sidebar */}
        <div className="blog-main-layout">
          {/* Contenido principal */}
          <div className="blog-content">
            {/* Introducción del blog */}
            <section className="blog-intro">
              <h2>Nuestro Blog : el futuro es circular</h2>
              <p>
                Somos un grupo comprometido con la moda circular en Argentina. Creemos que el futuro de la indumentaria pasa por la sustentabilidad, y por eso trabajamos día a día para construir una lugar consciente y responsable.
              </p>
              <p>
                Nos dedicamos a la compra y venta de ropa nueva y usada, asegurándonos de que cada prenda extienda su ciclo de vida al máximo. Cada prenda que pasa por nuestras tienda tiene una nueva oportunidad de ser útil, valiosa y cuidada.
              </p>
              <p>
                Nuestro propósito es claro, y trabajamos con pasión para alcanzarlo: <strong>recircular toda la ropa del mundo</strong>.
              </p>
            </section>

            {/* Contador de agua */}
            <section className="water-saving-container">
              <FaGlobeAmericas className="planet-icon" />
              <div>
                <h2 style={{margin: '0 0 0.3rem 0'}}>Cada prenda cuenta</h2>
                <p style={{margin: 0, fontSize: '1.1rem'}}>
                  Con la moda circular ya hemos evitado el consumo de{' '}
                  <span id="waterSaved">{waterSaved.toLocaleString()}</span> litros de agua.
                  Eso equivale a <strong>{Math.floor(waterSaved / 2700)} remeras</strong> o <strong>{Math.floor(waterSaved / 10000)} jeans</strong> que no tuvieron que fabricarse. El cambio empieza con vos.
                </p>
              </div>
            </section>

            {/* Grid de posts del blog */}
            <section className="blog-container">
              {blogPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </section>
          </div>

          {/* Banner de reciclaje lateral + Encuesta sticky juntos */}
          <div className="blog-sidebar-sticky">
            <div className="recycling-banner">
              <video 
                className="video-reciclaje" 
                src="https://d1whqwkn09gz4t.cloudfront.net/videos/impacto/ando.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto">
              </video>
              <div className="recycling-content"> 
                <h3>Beneficios de reciclar ropa</h3>
                <ul>
                  <li><FaLeaf className="recycling-icon" /> Reduce el impacto ambiental</li>
                  <li><FaWater className="recycling-icon" /> Ahorra agua y energía</li>
                  <li><FaTshirt className="recycling-icon" /> Disminuye residuos textiles</li>
                  <li><FaHandsHelping className="recycling-icon" /> Promueve el consumo responsable</li>
                  <li><FaRecycle className="recycling-icon" /> Da nueva vida a las prendas</li>
                </ul>
              </div>
            </div>
            <EncuestaBlog />
          </div>
        </div>
      </main>

      {/* Botón flotante de scroll */}
      {showScrollButton && (
        <button 
          id="btn-scroll-top" 
          title="Volver arriba"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Blog;