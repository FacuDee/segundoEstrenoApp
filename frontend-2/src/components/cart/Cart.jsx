import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaShoppingBag, FaTrash, FaCreditCard } from 'react-icons/fa';
import CartItem from './CartItem';
import PaymentMethods from '../payment/PaymentMethods';
import Swal from 'sweetalert2';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Manejar la finalización de la compra
  const handleFinalizePurchase = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'El carrito está vacío',
        text: 'Debe haber al menos un producto seleccionado.',
        confirmButtonColor: 'var(--color-primary)',
      });
      return;
    }

    if (!selectedPaymentMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'Elige un método de pago',
        text: 'Debes seleccionar una forma de pago para poder realizar la compra',
        confirmButtonColor: 'var(--color-primary)',
      });
      return;
    }

    // Verificar si el usuario está logueado
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Para finalizar la compra necesitas estar logueado.',
        confirmButtonColor: 'var(--color-primary)',
      });
      return;
    }
    

    try {
      const response = await fetch('/api/transaccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prendas: cartItems.map(item => item.id),
          metodoPago: selectedPaymentMethod,
          total: getCartTotal()
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Compra realizada!',
          text: 'Tu pedido ha sido procesado correctamente',
          confirmButtonColor: 'var(--color-primary)',
        });
        
        clearCart();
        setSelectedPaymentMethod('');
      } else {
        // Leer cuerpo de error devuelto por el backend y mostrar mensaje amigable
        let errMsg = 'La prenda que intentas comprar fue publicada desde tu cuenta.';
        try {
          const errBody = await response.json();
          if (errBody && errBody.message) errMsg = errBody.message;
        } catch (e) {
          // ignore parse errors
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al procesar la compra',
          text: errMsg,
          confirmButtonColor: 'var(--color-primary)',
        });
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al procesar tu compra. Intenta nuevamente.',
        confirmButtonColor: 'var(--color-primary)',
      });
    }
  };

  // Manejar el vaciado del carrito
  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-darker)',
      cancelButtonColor: 'var(--color-text-light)',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      clearCart();
      Swal.fire({
        title: 'Se vació el Carrito',
        text: 'Se han eliminado todos los productos',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  // Si no hay prendas, se muestra el carrito vacío
  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio">
        <div className="carrito-vacio-content">
          <FaShoppingBag className="carrito-vacio-icon" />
          <h2>Tu carrito está vacío</h2>
          <p>¡Descubre nuestras prendas de segunda mano!</p>
          <a href="/prendas" className="btn-primary">
            Ver Prendas
          </a>
        </div>
      </div>
    );
  }

  // Return principal del carrito con productos
  return (
    <div className="carrito-container">
      <div className="carrito-section">
        <div className="carrito-header">
          <h1>
            <FaShoppingBag className="carrito-icon" /> 
            Mi Carrito
          </h1>
          <span className="carrito-count">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>
        
        <div className="carrito-items">
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className="carrito-summary">
          <div className="carrito-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">${getCartTotal().toFixed(2)}</span>
          </div>

          <PaymentMethods 
            onMethodSelect={setSelectedPaymentMethod}
            selectedMethod={selectedPaymentMethod}
          />
          
          <div className="carrito-actions">
            <button 
              className="btn-secondary"
              onClick={handleClearCart}
            >
              <FaTrash /> Vaciar Carrito
            </button>
            <button 
              className="btn-primary"
              onClick={handleFinalizePurchase}
            >
              <FaCreditCard /> Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      {/* Banner lateral */}
      <div className="carrito-banner">
        <a href="/prendas" className="banner-link">
          <div className="banner-content">
            <h3>¿Necesitas más prendas?</h3>
            <p>Mirá toda nuestra colección</p>
            <span className="btn-banner">Seguir Comprando</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Cart;
