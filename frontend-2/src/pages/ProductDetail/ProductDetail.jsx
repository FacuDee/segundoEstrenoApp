import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTshirt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [prenda, setPrenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    fetchPrendaDetail();
  }, [id]);

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

  const fetchProductosRelacionados = async (categoriaId) => {
    if (!categoriaId) return;
    
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

  const handleAddToCart = () => {
    addToCart(prenda);
  };

  const handleProductoRelacionado = (producto) => {
    navigate(`/producto/${producto.id}`);
  };

  const handleVolver = () => {
    navigate('/prendas');
  };

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

  return (
    <main>
      <div className="detalle-container">
        <div className="detalle-img">
          <img src={prenda.imagen_url} alt={prenda.titulo} />
          <div className="detalle-descripcion-hover">
            {prenda.descripcion || "Sin descripción"}
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
      </div>

      {/* Banner publicitario */}
      <div id="banner-publicidad">
        <a href="https://yazuka.com.ar/" target="_blank" className="banner-link">
          <img 
            src="https://facudee.github.io/segundoEstrenoApp/frontend/images/banners/banner-detalle.webp" 
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
                className="relacionado-card"
                onClick={() => handleProductoRelacionado(producto)}
              >
                <div className="relacionado-img">
                  <img src={producto.imagen_url} alt={producto.titulo} />
                </div>
                <div className="relacionado-info">
                  <h4>{producto.titulo}</h4>
                  <p className="relacionado-precio">${producto.precio}</p>
                  <button className="relacionado-ver-btn">
                    <FaTshirt /> Ver producto
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