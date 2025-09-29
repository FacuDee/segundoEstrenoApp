
import FAQItem from './FAQItem';

const FAQList = ({ faqs }) => {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <FAQItem key={index} pregunta={faq.pregunta} respuesta={faq.respuesta} />
      ))}
    </div>
  );
};

export default FAQList;