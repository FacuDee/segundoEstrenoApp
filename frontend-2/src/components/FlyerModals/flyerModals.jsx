import React from 'react';
import './flyerModals.css';

const FlyerModal = ({ flyerUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        <img 
          src={flyerUrl} 
          alt="Flyer de la Feria" 
          className="modal-image"
        />
      </div>
    </div>
  );
};

export default FlyerModal;