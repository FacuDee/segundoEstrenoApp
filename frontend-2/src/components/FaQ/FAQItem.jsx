import React, { useState } from 'react';

const FAQItem = ({ pregunta, respuesta }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="faq-item">
      <div className={`faq-title ${visible ? 'active' : ''}`} onClick={() => setVisible(!visible)}>
        {pregunta}
        <span className="faq-arrow">
          <svg width="16" height="16" viewBox="0 0 20 20">
            <path d="M2,6 l8,8,8,-8" stroke="#885a89" strokeWidth="2" fill="none" />
          </svg>
        </span>
      </div>
      {visible && <div className="faq-content">{respuesta}</div>}
    </div>
  );
};

export default FAQItem;