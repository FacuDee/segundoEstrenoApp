// src/pages/Blog/Blog.jsx

import React, { useState, useEffect } from 'react';
import './Blog.css';
// ...existing code...
import PostCard from '../../components/blog/PostCard';
import { blogPosts } from '../../data/PostData';


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
      {/* Banner de reciclaje */}
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
            <li><i className="fas fa-leaf"></i> Reduce el impacto ambiental</li>
            <li><i className="fas fa-water"></i> Ahorra agua y energía</li>
            <li><i className="fas fa-tshirt"></i> Disminuye residuos textiles</li>
            <li><i className="fas fa-hands-helping"></i> Promueve el consumo responsable</li>
            <li><i className="fas fa-recycle"></i> Da nueva vida a las prendas</li>
          </ul>
        </div>
      </div>

      <main>
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
          <i className="fas fa-globe-americas planet-icon"></i>
          <div>
            <h2 style={{margin: '0 0 0.3rem 0'}}>Ahorro de agua reciclada</h2>
            <p style={{margin: 0, fontSize: '1.1rem'}}>
              En este planeta se ahorran{' '}
              <span id="waterSaved">{waterSaved.toLocaleString()}</span> litros de agua, segundo a segundo.
            </p>
          </div>
        </section>

        {/* Grid de posts del blog */}
        <section className="blog-container">
          {blogPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </main>

  {/* Usa tu Footer existente */}

      {/* Botón flotante de scroll */}
      {showScrollButton && (
        <button 
          id="btn-scroll-top" 
          title="Volver arriba"
          onClick={scrollToTop}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default Blog;