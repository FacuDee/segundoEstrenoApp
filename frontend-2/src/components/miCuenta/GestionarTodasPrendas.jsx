import React, { useState, useEffect } from 'react';
import { FaTshirt, FaTrash, FaUser, FaTag, FaSearch, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './GestionarTodasPrendas.css';

const GestionarTodasPrendas = () => {
  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    fetchAllPrendas();
    fetchCategorias();
  }, []);

  const fetchAllPrendas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/prenda/admin/todas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar prendas');
      }
      
      const data = await response.json();
      setPrendas(data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al cargar las prendas',
        icon: 'error'
      });
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

  const handleDeletePrenda = async (prendaId, titulo) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción eliminará la prenda "${titulo}" permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-darker)',
      cancelButtonColor: 'var(--color-text-light)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/prenda/admin/${prendaId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar prenda');
        }

        // Actualizar la lista
        setPrendas(prendas.filter(p => p.id !== prendaId));
        
        Swal.fire({
          title: 'Eliminado',
          text: 'La prenda ha sido eliminada exitosamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al eliminar la prenda',
          icon: 'error'
        });
      }
    }
  };

  const filteredPrendas = prendas.filter(prenda => {
    const matchesSearch = (prenda.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (prenda.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (prenda.vendedor?.username || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || prenda.categoria?.id.toString() === filterCategory;
    return matchesSearch && matchesCategory;
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
  }, [searchTerm, filterCategory]);

  if (loading) return <div className="loading">Cargando todas las prendas...</div>;

  return (
    <div className="gestionar-todas-prendas">
      <div className="section-header">
        <FaTshirt className="section-icon" />
        <h2>Todas las Prendas</h2>
        <span className="total-count">{filteredPrendas.length} prendas</span>
      </div>

      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o vendedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
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
      </div>

      {filteredPrendas.length === 0 ? (
        <div className="no-prendas">
          <FaTshirt className="empty-icon" />
          <p>No se encontraron prendas</p>
        </div>
      ) : (
        <>
          <div className="prendas-grid">
            {paginatedPrendas.map(prenda => (
              <div key={prenda.id} className="prenda-card">
                <div className="prenda-image">
                  {prenda.imagen_url ? (
                    <img src={prenda.imagen_url} alt={prenda.titulo} />
                  ) : (
                    <div className="no-image">
                      <FaTshirt />
                    </div>
                  )}
                </div>
                
                <div className="prenda-info">
                  <h3 className="prenda-titulo">{prenda.titulo}</h3>
                  <p className="prenda-descripcion">{prenda.descripcion}</p>
                  
                  <div className="prenda-details">
                    <div className="detail-item">
                      <FaUser className="detail-icon" />
                      <span>Vendedor: {prenda.vendedor?.username || 'Sin vendedor'}</span>
                    </div>
                    
                    <div className="detail-item">
                      <FaTag className="detail-icon" />
                      <span>Categoría: {prenda.categoria?.nombre || 'Sin categoría'}</span>
                    </div>
                    
                    <div className="detail-item">
                      <FaTshirt className="detail-icon" />
                      <span>Talle: {prenda.talle}</span>
                    </div>
                    
                    <div className="detail-item price">
                      <span className="precio">${prenda.precio}</span>
                    </div>
                  </div>

                  <div className="prenda-status">
                    <span className={`status ${prenda.disponible ? 'disponible' : 'no-disponible'}`}>
                      {prenda.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>

                <div className="prenda-actions">
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeletePrenda(prenda.id, prenda.titulo)}
                    title="Eliminar prenda"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Información de paginación y controles */}
          {filteredPrendas.length > 0 && (
            <div className="pagination-info">
              <p>
                Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPrendas.length)} de {filteredPrendas.length} prendas
              </p>
            </div>
          )}

          {/* Controles de paginación */}
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
        </>
      )}
    </div>
  );
};

export default GestionarTodasPrendas;