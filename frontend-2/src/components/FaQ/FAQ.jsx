
import FAQList from './FAQList';
import "./FAQ.css";
import { faqsComprar, faqsVender } from '../../data/faqData';
import { FaShoppingBag, FaStore } from 'react-icons/fa';

const FAQ = () => {
  return (
    <section className="main-container">
      <div className="seller-info">
        <h2>
          <FaShoppingBag className="faq-icon" />
          ¿Querés comprar?
        </h2>
        <FAQList faqs={faqsComprar} />
      </div>
      
      <div className="seller-info">
        <h2>
          <FaStore className="faq-icon" />
          ¿Querés vender?
        </h2>
        <FAQList faqs={faqsVender} />
      </div>
    </section>
  );
};

export default FAQ;
