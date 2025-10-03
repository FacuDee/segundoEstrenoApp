import { useCart } from '../../context/CartContext';
import { FaTimes, FaShoppingBag, FaTrash } from 'react-icons/fa';
import CartItem from './CartItem';
import Swal from 'sweetalert2';
import './CartModal.css';

const CartModal = () => {
  const { cartItems, isCartOpen, closeCart, clearCart, removeFromCart, getCartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción vaciará completamente tu carrito',
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
        title: 'Carrito vaciado',
        text: 'Tu carrito ha sido vaciado exitosamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={closeCart}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>
            <FaShoppingBag /> Carrito ({cartItems.length})
          </h3>
          <button className="cart-modal-close" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingBag className="empty-icon" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                ))}
              </div>
              
              <div className="cart-modal-total">
                <strong>Total: ${getCartTotal().toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-modal-footer">
            <button className="btn-clear" onClick={handleClearCart}>
              <FaTrash /> Vaciar
            </button>
            <a href="/carrito" className="btn-checkout" onClick={closeCart}>
              Ver Carrito Completo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;