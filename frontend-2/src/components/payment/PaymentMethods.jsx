import './PaymentMethods.css';
import img1 from '../../assets/paymentMethods/1.png';
import img2 from '../../assets/paymentMethods/2.png';
import img3 from '../../assets/paymentMethods/3.png';
import img4 from '../../assets/paymentMethods/4.png';
import img5 from '../../assets/paymentMethods/5.png';
import img6 from '../../assets/paymentMethods/6.png';

const paymentMethods = [
  { id: 'mercadopago', src: img1, alt: 'Mercado Pago' },
  { id: 'modo', src: img2, alt: 'Modo' },
  { id: 'visa', src: img3, alt: 'Visa' },
  { id: 'mastercard', src: img4, alt: 'Mastercard' },
  { id: 'american', src: img5, alt: 'American' },
  { id: 'pagofacil', src: img6, alt: 'PagoFacil' },
];

const PaymentMethods = ({ onMethodSelect, selectedMethod }) => {
  return (
    <div className="payment-methods">
      <h3 className="payment-methods-title">Seleccione su método de pago</h3>
      <div className="payment-grid">
        {paymentMethods.map((method) => (
          <div 
            className={`payment-item ${selectedMethod === method.id ? 'selected' : ''}`} 
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
          >
            <img 
              src={method.src} 
              alt={method.alt}
              title={method.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;