import React, { useState, useEffect } from 'react';
import { FaTshirt, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './PrendasGestion.css';

const PrendasGestion = ({ userId, user }) => {
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPrenda, setEditingPrenda] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    talle: '',
    categoria: '',
    imagen_url: ''
  });

  useEffect(() => {
    fetchPrendas();
    fetchCategorias();
  }, [userId]);

  const fetchPrendas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/prenda/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPrendas(data);
      } else {
        const errorData = await response.json();
        console.error('Error al cargar prendas:', response.status, errorData);
        
        if (response.status === 401) {
          Swal.fire({
            title: 'Error de autenticación',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
            icon: 'error'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar las prendas',
            icon: 'error'
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar prendas:', error);
      
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión al cargar las prendas',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/categoria');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const method = editingPrenda ? 'PUT' : 'POST';
      
      // Usar endpoint admin si es admin y está editando
      const isAdmin = user?.rol === 'admin';
      let url;
      if (editingPrenda) {
        url = isAdmin ? `/api/prenda/admin/${editingPrenda.id}` : `/api/prenda/${editingPrenda.id}`;
      } else {
        url = '/api/prenda';
      }
      
      // Preparar los datos con el formato correcto
      const dataToSend = {
        ...formData,
        categoria: parseInt(formData.categoria), // Convertir a número
        precio: parseFloat(formData.precio) // Convertir a número
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        fetchPrendas();
        resetForm();
        
        Swal.fire({
          title: '¡Éxito!',
          text: editingPrenda ? 'Prenda actualizada correctamente' : 'Prenda creada correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        const errorData = await response.json();
        
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al guardar la prenda',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error al guardar prenda:', error);
      alert('Error al guardar la prenda');
    }
  };

  const handleEdit = (prenda) => {
    setEditingPrenda(prenda);
    setFormData({
      titulo: prenda.titulo,
      descripcion: prenda.descripcion,
      precio: prenda.precio.toString(),
      talle: prenda.talle,
      categoria: prenda.categoria?.id?.toString() || '',
      imagen_url: prenda.imagen_url
    });
    setShowForm(true);
  };

  const handleDelete = async (id, titulo) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar "${titulo}"? Esta acción no se puede deshacer.`,
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
        const response = await fetch(`/api/prenda/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchPrendas();
          
          Swal.fire({
            title: '¡Eliminada!',
            text: 'La prenda ha sido eliminada correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          const errorData = await response.json();
          
          Swal.fire({
            title: 'Error',
            text: errorData.message || 'Error al eliminar la prenda',
            icon: 'error'
          });
        }
      } catch (error) {
        console.error('Error al eliminar prenda:', error);
        
        Swal.fire({
          title: 'Error',
          text: 'Error de conexión al eliminar la prenda',
          icon: 'error'
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      precio: '',
      talle: '',
      categoria: '',
      imagen_url: ''
    });
    setEditingPrenda(null);
    setShowForm(false);
  };

  // Lógica de paginación
  const totalPages = Math.ceil(prendas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrendas = prendas.slice(startIndex, startIndex + itemsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resetear página cuando cambien las prendas
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [prendas.length, currentPage, totalPages]);

  if (loading) return <div className="loading">Cargando prendas...</div>;

  return (
    <div className="prendas-gestion">
      <div className="section-header">
        <FaTshirt className="section-icon" />
        <h2>Gestionar Prendas</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          <FaPlus /> Agregar Prenda
        </button>
      </div>

      {showForm && (
        <div className="prenda-form-overlay">
          <div className="prenda-form">
            <h3>{editingPrenda ? 'Editar Prenda' : 'Nueva Prenda'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="talle"
                placeholder="Talle"
                value={formData.talle}
                onChange={handleInputChange}
                required
              />
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
              <input
                type="url"
                name="imagen_url"
                placeholder="URL de la imagen"
                value={formData.imagen_url}
                onChange={handleInputChange}
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  {editingPrenda ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="prendas-grid">
        {paginatedPrendas.map(prenda => (
          <div key={prenda.id} className="prenda-card card-producto">
            <div className="imagen-contenedor">
              <img src={prenda.imagen_url} alt={prenda.titulo} />
              <div className="btns-hover">
                <button onClick={() => handleEdit(prenda)} title="Editar">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(prenda.id, prenda.titulo)} title="Eliminar">
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="contenido prenda-info">
              <h3>{prenda.titulo}</h3>
              <p className="precio">${prenda.precio}</p>
              <p className="talle">Talle: {prenda.talle}</p>
            </div>
          </div>
        ))}
      </div>

      {prendas.length === 0 && (
        <div className="empty-state">
          <p>No tienes prendas registradas. ¡Agrega tu primera prenda!</p>
        </div>
      )}

      {/* Información de paginación y controles */}
      {prendas.length > 0 && (
        <div className="pagination-info">
          <p>
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, prendas.length)} de {prendas.length} prendas
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
    </div>
  );
};

export default PrendasGestion;