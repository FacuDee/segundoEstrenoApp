import React, { useState, useEffect } from 'react';
import { FaTshirt, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const PrendasGestion = ({ userId }) => {
  const [prendas, setPrendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPrenda, setEditingPrenda] = useState(null);
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
      const response = await fetch(`/prenda/usuario/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPrendas(data);
      }
    } catch (error) {
      console.error('Error al cargar prendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/categoria');
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
      const url = editingPrenda ? `/prenda/${editingPrenda.id}` : '/prenda';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPrendas();
        resetForm();
        alert(editingPrenda ? 'Prenda actualizada' : 'Prenda creada correctamente');
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
      precio: prenda.precio,
      talle: prenda.talle,
      categoria: prenda.categoria?.id || '',
      imagen_url: prenda.imagen_url
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta prenda?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/prenda/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchPrendas();
          alert('Prenda eliminada correctamente');
        }
      } catch (error) {
        console.error('Error al eliminar prenda:', error);
        alert('Error al eliminar la prenda');
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
        {prendas.map(prenda => (
          <div key={prenda.id} className="prenda-card">
            <img src={prenda.imagen_url} alt={prenda.titulo} />
            <div className="prenda-info">
              <h3>{prenda.titulo}</h3>
              <p className="precio">${prenda.precio}</p>
              <p className="talle">Talle: {prenda.talle}</p>
            </div>
            <div className="prenda-actions">
              <button onClick={() => handleEdit(prenda)} title="Editar">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(prenda.id)} title="Eliminar" className="btn-delete">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {prendas.length === 0 && (
        <div className="empty-state">
          <p>No tienes prendas registradas. ¡Agrega tu primera prenda!</p>
        </div>
      )}
    </div>
  );
};

export default PrendasGestion;