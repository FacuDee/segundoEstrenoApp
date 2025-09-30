
import FAQList from './FAQList';
import "./FAQ.css";
import { faqsComprar, faqsVender } from './faqData';
import PaymentInfo from './PaymentInfo';

const FAQ = () => {
  return (
    <section className="main-container">
      <div className="seller-info">
        <h2>¿Querés comprar?</h2>
        <FAQList faqs={faqsComprar} />
      </div>

       <PaymentInfo /> {/* ← Sección de métodos de pago */}

  
      <div className="seller-info">
        <h2>¿Querés vender?</h2>
        <FAQList faqs={faqsVender} />
      </div>
    </section>
  );
};

export default FAQ;
