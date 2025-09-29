import React from 'react';
import FAQList from './FAQList';
import "./FAQ.css";
import { faqsComprar, faqsVender } from './faqData';

const FAQ = () => {
  return (
    <section className="main-container">
      <div className="seller-info">
        <h2>¿Querés comprar?</h2>
        <FAQList faqs={faqsComprar} />
      </div>

      <div className="seller-info">
        <h2>¿Querés vender?</h2>
        <FAQList faqs={faqsVender} />
      </div>
    </section>
  );
};

export default FAQ;
