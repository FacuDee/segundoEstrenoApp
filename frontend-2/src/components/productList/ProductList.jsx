import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye, FaSearch, FaFilter, FaDollarSign, FaTshirt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./ProductList.css";
import Filter from "./Filter";

const ProductList = () => {
  const navigate = useNavigate();
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPrendas();
    fetchCategorias();
  }, []);

  const fetchPrendas = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/prendas");
      const data = await response.json();
      console.log(data);
      setPrendas(data);
    } catch (error) {
      console.error('Error al cargar prendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/categoria');
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

  // Lógica de paginación
  const totalPages = Math.ceil(filteredPrendas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrendas = filteredPrendas.slice(startIndex, startIndex + itemsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, priceFilter, sizeFilter]);

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
        {paginatedPrendas.map((prenda, idx) => (
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
      
      {/* Información de paginación y controles - FUERA del grid */}
      {filteredPrendas.length > 0 && (
        <div className="pagination-info">
          <p>
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPrendas.length)} de {filteredPrendas.length} productos
          </p>
        </div>
      )}
      
      {/* Controles de paginación - FUERA del grid */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Anterior
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Mostrar páginas relevantes (primera, última, actual y adyacentes)
                return page === 1 || 
                       page === totalPages || 
                       Math.abs(page - currentPage) <= 2;
              })
              .map((page, index, array) => {
                // Agregar puntos suspensivos si hay saltos
                const elements = [];
                if (index > 0 && array[index - 1] < page - 1) {
                  elements.push(
                    <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                elements.push(
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                );
                return elements;
              })
              .flat()}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
    
  );
};

export default ProductList;
