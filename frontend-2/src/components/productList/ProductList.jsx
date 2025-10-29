import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaEye, FaSearch, FaFilter, FaDollarSign, FaTshirt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Parsear parámetros iniciales desde la URL
  const parseSearchParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
      category: params.get("category") || "",
      price: params.get("price") || "",
      size: params.get("size") || "",
      page: parseInt(params.get("page")) || 1,
    };
  };

  const initialParams = parseSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialParams.search);
  const [filterCategory, setFilterCategory] = useState(initialParams.category);
  const [priceFilter, setPriceFilter] = useState(initialParams.price);
  const [sizeFilter, setSizeFilter] = useState(initialParams.size);
  const [currentPage, setCurrentPage] = useState(initialParams.page);
  const [itemsPerPage] = useState(24);

  useEffect(() => {
    fetchPrendas();
    fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPrendas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prenda");
      const data = await response.json();
      setPrendas(data);
    } catch (error) {
      console.error("Error al cargar prendas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch("/api/categoria");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleAddToCart = (prenda) => {
    addToCart(prenda);
  };

  const handleVerDetalles = (prenda) => {
    const id = prenda.id_prenda ?? prenda.id;
    // navegar al detalle (no tocamos la query de la lista). El historial conservará la entrada previa
    //  con sus filtros.
    // Pasamos la query actual en el state para fallback si el usuario abrió el detalle desde fuera
    navigate(`/producto/${id}`, { state: { from: location.search } });
  };

  // Filtrado
  const filteredPrendas = prendas.filter((prenda) => {
    const matchesSearch =
      searchTerm === "" ||
      (prenda.titulo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prenda.descripcion || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === "" || prenda.categoria?.id?.toString() === filterCategory;

    let matchesPrice = true;
    if (priceFilter !== "") {
      const precio = parseFloat(prenda.precio);
      switch (priceFilter) {
        case "muy-bajo":
          matchesPrice = precio <= 25000;
          break;
        case "bajo":
          matchesPrice = precio > 25000 && precio <= 50000;
          break;
        case "medio":
          matchesPrice = precio > 50000 && precio <= 80000;
          break;
        case "alto":
          matchesPrice = precio > 80000 && precio <= 100000;
          break;
        case "muy-alto":
          matchesPrice = precio > 100000;
          break;
        default:
          matchesPrice = true;
      }
    }

    const matchesSize =
      sizeFilter === "" || (prenda.talle && prenda.talle.toString().toLowerCase() === sizeFilter.toString().toLowerCase());

    return matchesSearch && matchesCategory && matchesPrice && matchesSize;
  });

  // Paginación
  const totalPages = Math.ceil(filteredPrendas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrendas = filteredPrendas.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sincronizar estado -> URL (para que al usar "atrás" se restauren los filtros)
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (filterCategory) params.set("category", filterCategory);
    if (priceFilter) params.set("price", priceFilter);
    if (sizeFilter) params.set("size", sizeFilter);
    if (currentPage && currentPage > 1) params.set("page", String(currentPage));

    const newSearch = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");
    if (newSearch !== currentSearch) {
      // push en historial para poder retroceder a estados anteriores de filtros
      navigate(`?${newSearch}`, { replace: false });
    }
  }, [searchTerm, filterCategory, priceFilter, sizeFilter, currentPage, navigate, location.search]);

  // Aplicar URL -> estado (cuando el usuario usa atrás/adelante o llega con query)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setFilterCategory(params.get("category") || "");
    setPriceFilter(params.get("price") || "");
    setSizeFilter(params.get("size") || "");
    setCurrentPage(parseInt(params.get("page")) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Resetear página a 1 al cambiar filtros desde UI
  const onChangeSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const onChangeCategory = (value) => {
    setFilterCategory(value);
    setCurrentPage(1);
  };
  const onChangePrice = (value) => {
    setPriceFilter(value);
    setCurrentPage(1);
  };
  const onChangeSize = (value) => {
    setSizeFilter(value);
    setCurrentPage(1);
  };

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
            onChange={(e) => onChangeSearch(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="category-filter">
            <FaFilter className="filter-icon" />
            <select value={filterCategory} onChange={(e) => onChangeCategory(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id.toString()}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="size-filter">
            <FaTshirt className="filter-icon" />
            <select value={sizeFilter} onChange={(e) => onChangeSize(e.target.value)}>
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
            <select value={priceFilter} onChange={(e) => onChangePrice(e.target.value)}>
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
            key={prenda.id_prenda ?? prenda.id ?? idx}
            className="product-item card-producto"
            onClick={() => handleVerDetalles(prenda)}
            style={{ cursor: "pointer" }}
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
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-btn">
            Anterior
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2;
              })
              .map((page, index, array) => {
                const elements = [];
                if (index > 0 && array[index - 1] < page - 1) {
                  elements.push(
                    <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                elements.push(
                  <button key={page} onClick={() => handlePageChange(page)} className={`pagination-btn ${currentPage === page ? "active" : ""}`}>
                    {page}
                  </button>
                );
                return elements;
              })
              .flat()}
          </div>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-btn">
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;