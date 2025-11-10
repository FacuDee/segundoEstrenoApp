import React from 'react';

const FlyerModal = ({ flyerUrl, onClose }) => {
  return (
    // Contenedor principal oscuro
    <div 
      className="modal-overlay" 
      onClick={onClose} // Cierra si haces clic fuera del contenido
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Asegura que esté por encima de otros elementos
      }}
    >
      {/* Contenido del Modal (la imagen) */}
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          position: 'relative',
          backgroundColor: 'white', // Fondo opcional para la imagen
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <button 
          onClick={onClose} 
          className="modal-close-button"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            lineHeight: '1.2rem',
            width: '30px',
            height: '30px',
          }}
        >
          &times;
        </button>
        <img 
          src={flyerUrl} 
          alt="Flyer de la Feria" 
          style={{ 
            maxWidth: '100%', 
            maxHeight: 'calc(100vh - 40px)', // Ajusta al tamaño de la ventana
            display: 'block' 
          }}
        />
      </div>
    </div>
  );
};

export default FlyerModal;