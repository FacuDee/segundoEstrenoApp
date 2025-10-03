import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaEye, FaSearch, FaFilter, FaDollarSign } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPrendas();
    fetchCategorias();
  }, []);

  const fetchPrendas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prenda");
      const data = await response.json();
      setPrendas(data);
    } catch (error) {
      console.error('Error al cargar prendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/categoria');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleAddToCart = (prenda) => {
    addToCart(prenda);
  };

  // Función de filtrado
  const filteredPrendas = prendas.filter(prenda => {
    // Filtro por búsqueda (título o descripción)
    const matchesSearch = searchTerm === '' || 
      (prenda.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prenda.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por categoría
    const matchesCategory = filterCategory === '' || prenda.categoria?.id.toString() === filterCategory;
    
    // Filtro por precio
    let matchesPrice = true;
    if (priceFilter !== '') {
      const precio = parseFloat(prenda.precio);
      switch (priceFilter) {
        case 'bajo':
          matchesPrice = precio < 30000;
          break;
        case 'medio':
          matchesPrice = precio >= 30000 && precio <= 80000;
          break;
        case 'alto':
          matchesPrice = precio > 80000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading) return <div className="loading">Cargando prendas...</div>;

  return (
    <div className="product-list-container">
      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters-row">
          <div className="category-filter">
            <FaFilter className="filter-icon" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id.toString()}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="price-filter">
            <FaDollarSign className="filter-icon" />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Todos los precios</option>
              <option value="bajo">Hasta $30.000</option>
              <option value="medio">$30.000 - $80.000</option>
              <option value="alto">Más de $80.000</option>
            </select>
          </div>
        </div>

        <div className="results-count">
          {filteredPrendas.length} {filteredPrendas.length === 1 ? 'prenda encontrada' : 'prendas encontradas'}
        </div>
      </div>

      <div className="product-list">
        {filteredPrendas.map((prenda, idx) => (
        <div key={prenda.id_prenda ?? idx} className="product-item card-producto">
          <div className="imagen-contenedor">
            <img src={prenda.imagen_url} alt={prenda.titulo} />
            <div className="btns-hover">
              <button title="Ver detalles">
                <FaEye />
              </button>
              <button title="Agregar a favoritos">
                <FaHeart />
              </button>
              <button 
                title="Agregar al carrito"
                onClick={() => handleAddToCart(prenda)}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
          <div className="contenido">
            <h3>{prenda.titulo}</h3>
            <p>{prenda.descripcion}</p>
            <span>${prenda.precio}</span>
          </div>
        </div>
      ))}
      
      {filteredPrendas.length === 0 && (
        <div className="no-results">
          <p>No se encontraron prendas que coincidan con los filtros seleccionados.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;
