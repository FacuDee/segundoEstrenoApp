import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye, FaSearch, FaFilter, FaDollarSign, FaTshirt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
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

  const handleVerDetalles = (prenda) => {
    navigate(`/producto/${prenda.id}`);
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
        case 'muy-bajo':
          matchesPrice = precio <= 25000;
          break;
        case 'bajo':
          matchesPrice = precio > 25000 && precio <= 50000;
          break;
        case 'medio':
          matchesPrice = precio > 50000 && precio <= 80000;
          break;
        case 'alto':
          matchesPrice = precio > 80000 && precio <= 100000;
          break;
        case 'muy-alto':
          matchesPrice = precio > 100000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    // Filtro por talle
    const matchesSize = sizeFilter === '' || (prenda.talle && prenda.talle.toLowerCase() === sizeFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesPrice && matchesSize;
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
          
          <div className="size-filter">
            <FaTshirt className="filter-icon" />
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option value="">Todos los talles</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
            </select>
          </div>

          <div className="price-filter">
            <FaDollarSign className="filter-icon" />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">Todos los precios</option>
              <option value="muy-bajo">Hasta $25.000</option>
              <option value="bajo">$25.000 - $50.000</option>
              <option value="medio">$50.000 - $80.000</option>
              <option value="alto">$80.000 - $100.000</option>
              <option value="muy-alto">Más de $100.000</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-list">
        {filteredPrendas.map((prenda, idx) => (
        <div 
          key={prenda.id_prenda ?? idx} 
          className="product-item card-producto"
          onClick={() => handleVerDetalles(prenda)}
          style={{ cursor: 'pointer' }}
        >
          <div className="imagen-contenedor">
            <img src={prenda.imagen_url} alt={prenda.titulo} />
            <div className="btns-hover">
              <button 
                title="Ver detalles"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVerDetalles(prenda);
                }}
              >
                <FaEye />
              </button>
              <button 
                title="Agregar al carrito"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(prenda);
                }}
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
