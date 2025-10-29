import { FaTimes, FaTshirt } from 'react-icons/fa';
import './CartItem.css';

// Componente que representa un ítem en el carrito de compras
const CartItem = ({ item, onRemove }) => {
  const handleRemove = () => {
    onRemove(item.id);
  };

  // Renderizar la información del ítem
  return (
    <div className="carrito-item">
      <div className="carrito-item-info">
        <div className="item-image">
          {item.imagen_url ? (
            <img 
              src={item.imagen_url} 
              alt={item.titulo}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="image-placeholder" style={{display: item.imagen_url ? 'none' : 'flex'}}>
            <FaTshirt />
          </div>
        </div>
        <div className="item-details">
          <h4 className="item-title">{item.titulo}</h4>
          <div className="item-meta">
            <span className="item-category">{item.categoria?.nombre || 'Sin categoría'}</span>
            <span className="item-size">Talle: {item.talle}</span>
          </div>
          <div className="item-price">${item.precio}</div>
        </div>
      </div>
      <button 
        className="quitar-item" 
        onClick={handleRemove}
        title="Quitar del carrito"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default CartItem;