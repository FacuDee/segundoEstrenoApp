import React, { useState } from 'react';
import FlyerModal from '../FlyerModals/flyerModals';
import { FaRegCalendarAlt } from 'react-icons/fa';

const PostCard = ({ post }) => {
  // Estado para el modal
  const [modalFlyerUrl, setModalFlyerUrl] = useState(null);

  // Funciones para manejar el modal
  const openFlyerModal = (url) => {
    setModalFlyerUrl(url);
  };

  const closeFlyerModal = () => {
    setModalFlyerUrl(null);
  };
  
  // Función para mostrar imagen
  const renderMedia = () => {
    if (post.type === 'video') {
      return (
        <div className="blog-video">
          <iframe
            src={post.videoSrc}
            title={post.videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      );
    } else {
      return (
        <img 
          src={post.image} 
          alt={post.imageAlt || post.title} 
        />
      );
    }
  };

  // Renderiza el calendario de ferias
  const renderCalendario = () => {
    if (post.type === 'feria' && post.ferias) {
      return (
        <div className="ferias-calendario">
          {post.ferias.map((feria, index) => (
            <div key={index} className="feria-item">
              <h3>
                <FaRegCalendarAlt style={{ marginRight: '0.5rem', color: 'var(--color-primary)' }} />
                {feria.nombre}
              </h3>
              <p><strong> {feria.frecuencia}</strong></p>
              <div className="feria-buttons">
                {feria.mapaUrl && (
                  <a href={feria.mapaUrl} target="_blank" rel="noopener noreferrer" className="feria-btn-mapa">
                    Ver Ubicación
                  </a>
                )}
                {feria.flyerUrl && (
                  <button 
                    onClick={() => openFlyerModal(feria.flyerUrl)} 
                    className="feria-btn-flyer"
                  >
                    Ver Flyer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Función que muestra el botón si hay link
  const renderActionButton = () => {
    if (post.link) {
      return <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-button">{post.linkText}</a>;
    }
    return null;
  };

  return (
    <>
      {/* CLAVE: Modal FUERA del blog-card */}
      {modalFlyerUrl && (
        <FlyerModal 
          flyerUrl={modalFlyerUrl} 
          onClose={closeFlyerModal} 
        />
      )}

      <div className="blog-card">
        {renderMedia()}
        <div className="blog-content blog-content-card">
          <h2 className="blog-title">{post.title}</h2>
          <p className="blog-description">{post.description}</p>
          
          {renderCalendario()}
          
          <div className="blog-footer">
            <span className="blog-tag">{post.tag}</span>
            {renderActionButton()}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;