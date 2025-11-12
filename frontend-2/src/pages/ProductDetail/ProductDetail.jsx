import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTshirt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

// Componente principal de detalle de producto
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const [prenda, setPrenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Cargar detalle de prenda
  useEffect(() => {
    fetchPrendaDetail();
  }, [id]);

  // Función para obtener detalle de prenda
  const fetchPrendaDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/prenda/${id}`);
      if (!response.ok) {
        throw new Error('Prenda no encontrada');
      }
      const data = await response.json();
      setPrenda(data);
      
      // Cargar productos relacionados
      await fetchProductosRelacionados(data.categoria?.id);
    } catch (error) {
      console.error('Error al cargar prenda:', error);
      navigate('/prendas'); // Redirigir si no se encuentra
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener productos relacionados
  const fetchProductosRelacionados = async (categoriaId) => {
    if (!categoriaId) return;
    
    // Obtener todas las prendas
    try {
      const response = await fetch('/api/prenda');
      const data = await response.json();
      
      // Filtrar productos de la misma categoría, excluyendo el actual
      const relacionados = data
        .filter(p => p.categoria?.id === categoriaId && p.id !== parseInt(id))
        .slice(0, 3);
      
      setProductosRelacionados(relacionados);
    } catch (error) {
      console.error('Error al cargar productos relacionados:', error);
    }
  };

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    addToCart(prenda);
  };

  // Navegar a producto relacionado
  const handleProductoRelacionado = (producto) => {
    // No permitir navegación si no está disponible
    if (!producto.disponible) return;
    
    // Pasar el `from` original si existe para mantener la referencia a la lista y sus filtros
    const fromQuery = location && location.state && location.state.from ? location.state.from : location.search || '';
    navigate(`/producto/${producto.id}`, { state: { from: fromQuery } });
  };

  // Volver a la lista de productos
  const handleVolver = () => {
    // Si hay historial (venimos desde la lista), usar back para restaurar query y scroll
    try {
      // React Router no expone length del history, pero window.history.state?.idx (Vite/React Router) o window.history.length pueden ayudar.
      // Intentamos navegar atrás primero para preservar exactamente la entrada anterior (incl. query string).
      if (window.history && window.history.length > 1) {
        navigate(-1);
        return;
      }
    } catch (err) {
      // ignore
    }

  // Fallback: si el ProductList nos pasó la query en state, úsala para reconstruir la URL
  const fromQuery = location && location.state && location.state.from ? location.state.from : '';
    if (fromQuery) {
      navigate(`/prendas?${fromQuery.replace(/^\?/, '')}`);
    } else {
      navigate('/prendas');
    }
  };

  // Funciones para el efecto zoom
  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Renderizado condicional
  if (loading) {
    return (
      <main>
        <div className="loading-container">
          <div className="loading">Cargando producto...</div>
        </div>
      </main>
    );
  }

  if (!prenda) {
    return (
      <main>
        <div className="error-container">
          <p>Producto no encontrado</p>
          <button onClick={handleVolver} className="detalle-btn">
            Volver a productos
          </button>
        </div>
      </main>
    );
  }

  // Renderizar detalle de prenda
  return (
    <main>
      <div className="detalle-container">
        <div className="detalle-left">
          <div 
            className="detalle-img"
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img 
              ref={imgRef}
              src={prenda.imagen_url} 
              alt={prenda.titulo}
              className={isZooming ? 'zooming' : ''}
              style={isZooming ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
            />
            {isZooming && (
              <div 
                className="zoom-lens"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`
                }}
              />
            )}
          </div>
        </div>
        
        <div className="detalle-info">
          <h2>{prenda.titulo}</h2>
          <div className="detalle-precio">${prenda.precio}</div>
          
          {prenda.categoria && (
            <p><strong>Categoría:</strong> {prenda.categoria.nombre}</p>
          )}
          
          <p><strong>Talle:</strong> {prenda.talle || "No especificado"}</p>
          
          <div className="detalle-btns">
            <button onClick={handleVolver} className="detalle-btn btn-volver">
              <FaArrowLeft /> Volver
            </button>
            <button onClick={handleAddToCart} className="detalle-btn btn-agregar">
              <FaShoppingCart /> Agregar al carrito
            </button>
          </div>
        </div>
        
        {prenda.descripcion && (
          <div className="detalle-descripcion-full">
            <strong>Descripción:</strong>
            <p>{prenda.descripcion}</p>
          </div>
        )}
      </div>

      {/* Banner publicitario */}
      <div id="banner-publicidad">
        <a href="https://yazuka.com.ar/" target="_blank" className="banner-link">
          <img 
            src="/src/assets/banners/banner-detalle.webp" 
            alt="Publicidad" 
            className="banner-img"
          />
        </a>
      </div>

      {/* Productos relacionados */}
      {productosRelacionados.length > 0 && (
        <div className="productos-relacionados">
          <h3 className="relacionados-titulo">Productos relacionados</h3>
          <div className="relacionados-grid">
            {productosRelacionados.map((producto) => (
              <div 
                key={producto.id} 
                className={`relacionado-card ${!producto.disponible ? 'no-disponible' : ''}`}
                onClick={() => handleProductoRelacionado(producto)}
              >
                <div className="relacionado-img">
                  <img src={producto.imagen_url} alt={producto.titulo} />
                  {!producto.disponible && (
                    <div className="no-disponible-overlay">
                      <span>No disponible</span>
                    </div>
                  )}
                </div>
                <div className="relacionado-info">
                  <h4>{producto.titulo}</h4>
                  <p className="relacionado-precio">${producto.precio}</p>
                  <button className="relacionado-ver-btn" disabled={!producto.disponible}>
                    <FaTshirt /> {producto.disponible ? 'Ver producto' : 'No disponible'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;