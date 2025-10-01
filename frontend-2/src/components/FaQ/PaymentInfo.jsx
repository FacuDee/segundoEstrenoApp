import './FAQ.css';
import img1 from '../../assets/mediosDePago/1.png';
import img2 from '../../assets/mediosDePago/2.png';
import img3 from '../../assets/mediosDePago/3.png';
import img4 from '../../assets/mediosDePago/4.png';
import img5 from '../../assets/mediosDePago/5.png';
import img6 from '../../assets/mediosDePago/6.png';

const paymentMethods = [
  { src: img1, alt: 'Mercado Pago' },
  { src: img2, alt: 'Modo' },
  { src: img3, alt: 'Visa' },
  { src: img4, alt: 'Mastercard' },
  { src: img5, alt: 'American' },
  { src: img6, alt: 'PagoFacil' },
];


const PaymentInfo = () => {
    return (
        <div className="payment-info">
            <h2>Métodos de pago</h2>
            <div className="payment-grid">
                {paymentMethods.map((method, index) => (
                    <div className="payment-item" key={index}>
                        <img src={method.src} alt={method.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentInfo;