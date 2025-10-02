import React, { useState, useEffect } from 'react';
import { FaUsers, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/usuario', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rol: newRole })
      });

      if (response.ok) {
        fetchUsuarios();
        alert('Rol actualizado correctamente');
      }
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      alert('Error al actualizar el rol');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/usuario/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchUsuarios();
          alert('Usuario eliminado correctamente');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar el usuario');
      }
    }
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || usuario.rol === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="usuarios-admin">
      <div className="section-header">
        <FaUsers className="section-icon" />
        <h2>Gestionar Usuarios</h2>
      </div>

      <div className="usuarios-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="role-filter"
        >
          <option value="">Todos los roles</option>
          <option value="comprador">Compradores</option>
          <option value="vendedor">Vendedores</option>
          <option value="admin">Administradores</option>
        </select>
      </div>

      <div className="usuarios-stats">
        <div className="stat-card">
          <h3>Total Usuarios</h3>
          <p className="stat-number">{usuarios.length}</p>
        </div>
        <div className="stat-card">
          <h3>Compradores</h3>
          <p className="stat-number">{usuarios.filter(u => u.rol === 'comprador').length}</p>
        </div>
        <div className="stat-card">
          <h3>Vendedores</h3>
          <p className="stat-number">{usuarios.filter(u => u.rol === 'vendedor').length}</p>
        </div>
        <div className="stat-card">
          <h3>Administradores</h3>
          <p className="stat-number">{usuarios.filter(u => u.rol === 'admin').length}</p>
        </div>
      </div>

      <div className="usuarios-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <select
                    value={usuario.rol}
                    onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                    className={`rol-select rol-${usuario.rol}`}
                  >
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(usuario.createdAt || Date.now()).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(usuario.id)}
                    className="btn-delete"
                    title="Eliminar usuario"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsuarios.length === 0 && (
        <div className="empty-state">
          <p>No se encontraron usuarios que coincidan con los filtros.</p>
        </div>
      )}
    </div>
  );
};

export default UsuariosAdmin;