import { useState, useEffect } from 'react';
import './DiscountPopup.css';

const DiscountPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('discountPopupSeen');
        
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('discountPopupSeen', 'true');
    };

    const handleClaim = () => {
        alert('¡Código copiado! Usa PRIMERA10 en tu compra');
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div id="popup-descuento" className="popup">
            <div className="popup-contenido">
                <button className="cerrar" onClick={handleClose}>
                    &times;
                </button>
                <h2>🎉 ¡Bienvenido!</h2>
                <p>
                    Obtené un <strong>10% de descuento</strong> en tu primera compra.
                </p>
                <p>
                    Usá el código: <span className="codigo">PRIMERA10</span> al finalizar tu compra.
                </p>
                <button className="boton-aprovechar" onClick={handleClaim}>
                    ¡Aprovechar descuento!
                </button>
            </div>
        </div>
    );
};

export default DiscountPopup;