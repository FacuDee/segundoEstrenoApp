import React, { useState } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const PerfilUsuario = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    email: user.email || '',
    telefono: user.telefono || '',
    direccion: user.direccion || ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/usuario/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEditing(false);
        // Aquí podrías actualizar el contexto del usuario o mostrar un mensaje de éxito
        alert('Perfil actualizado correctamente');
      } else {
        throw new Error('Error al actualizar perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: user.nombre || '',
      email: user.email || '',
      telefono: user.telefono || '',
      direccion: user.direccion || ''
    });
    setEditing(false);
  };

  return (
    <div className="perfil-usuario">
      <div className="perfil-header">
        <FaUser className="perfil-icon" />
        <h2>Mi Perfil</h2>
        {!editing && (
          <button className="btn-edit" onClick={() => setEditing(true)}>
            <FaEdit /> Editar
          </button>
        )}
      </div>

      <div className="perfil-info">
        <div className="info-group">
          <label>Nombre completo</label>
          {editing ? (
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.nombre}</p>
          )}
        </div>

        <div className="info-group">
          <label>Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <div className="info-group">
          <label>Teléfono</label>
          {editing ? (
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Ingrese su teléfono"
            />
          ) : (
            <p>{user.telefono || 'No especificado'}</p>
          )}
        </div>

        <div className="info-group">
          <label>Dirección</label>
          {editing ? (
            <textarea
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Ingrese su dirección"
              rows="3"
            />
          ) : (
            <p>{user.direccion || 'No especificada'}</p>
          )}
        </div>

        <div className="info-group">
          <label>Rol</label>
          <p className={`rol-badge rol-${user.rol}`}>
            {user.rol === 'admin' ? 'Administrador' : 
             user.rol === 'vendedor' ? 'Vendedor' : 'Comprador'}
          </p>
        </div>

        {editing && (
          <div className="perfil-actions">
            <button className="btn-save" onClick={handleSave}>
              <FaSave /> Guardar
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              <FaTimes /> Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;