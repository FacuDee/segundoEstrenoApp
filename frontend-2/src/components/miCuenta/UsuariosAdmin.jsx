import React, { useState, useEffect } from 'react';
import { FaUsers, FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UserDetailModal from './UserDetailModal.jsx';
const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsuarios();
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const token = localStorage.getItem('token');
  const res = await fetch('/api/solicitud-vendedor', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(data);
      } else {
        console.error('Error al cargar solicitudes:', res.status);
      }
    } catch (err) {
      console.error('Error al cargar solicitudes:', err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');

      
      const response = await fetch('/api/usuario', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      

      
      if (response.ok) {
        const data = await response.json();

        setUsuarios(data);
      } else {
        const errorText = await response.text();
        console.error('Error al cargar usuarios:', response.status, errorText);
        
        Swal.fire({
          title: 'Error',
          text: `No se pudieron cargar los usuarios: ${response.status}`,
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión al cargar usuarios',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole, currentRole, userName) => {
    // Mostrar confirmación antes de cambiar el rol
    const result = await Swal.fire({
      title: '¿Cambiar rol de usuario?',
      html: `¿Estás seguro de cambiar el rol de <strong>${userName}</strong><br/>de <strong>${currentRole}</strong> a <strong>${newRole}</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-darker)',
      cancelButtonColor: 'var(--color-text-light)',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
      // Si cancela, recargar usuarios para resetear el select
      fetchUsuarios();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rol: newRole })
      });

      if (response.ok) {
        fetchUsuarios();
        Swal.fire({
          title: '¡Actualizado!',
          text: `Rol cambiado a ${newRole} correctamente`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el rol',
          icon: 'error'
        });
        // Recargar usuarios para resetear el select
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error de conexión al actualizar el rol',
        icon: 'error'
      });
      // Recargar usuarios para resetear el select
      fetchUsuarios();
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
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
        const response = await fetch(`/api/usuario/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          fetchUsuarios();
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado correctamente',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el usuario',
            icon: 'error'
          });
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error de conexión al eliminar el usuario',
          icon: 'error'
        });
      }
    }
  };

  const handleViewUser = (usuario) => {
    setSelectedUser(usuario);
    setShowUserDetail(true);
  };

  const closeUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = (usuario.username || usuario.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (usuario.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || usuario.rol === filterRole;
    return matchesSearch && matchesRole;
  });

  // Lógica de paginación
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsuarios = filteredUsuarios.slice(startIndex, startIndex + itemsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole]);

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  if (usuarios.length === 0) {
    return (
      <div className="usuarios-admin">
        <div className="section-header">
          <FaUsers className="section-icon" />
          <h2>Gestionar Usuarios</h2>
        </div>
        <div className="no-users">
          <p>No se encontraron usuarios o hay un problema de conexión.</p>
          <button onClick={fetchUsuarios} className="btn-reload">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="usuarios-admin">
      <div className="section-header">
        <FaUsers className="section-icon" />
        <h2>Gestionar Usuarios</h2>
      </div>

      {/* Panel de solicitudes pendientes para admin */}
      {solicitudes && solicitudes.length > 0 && (
        <div className="solicitudes-panel">
          <h3>Solicitudes de Vendedor</h3>
          {solicitudes.filter(s => s.status === 'pendiente').length === 0 ? (
            <p>No hay solicitudes pendientes</p>
          ) : (
            <ul className="solicitudes-list">
              {solicitudes.filter(s => s.status === 'pendiente').map(solicitud => (
                <li key={solicitud.id_solicitud || solicitud.id} className="solicitud-item">
                  <div className="solicitud-info">
                    <strong>{solicitud.username}</strong>
                    <span className="fecha">{new Date(solicitud.created_at || solicitud.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="solicitud-actions">
                    <button
                      className="btn-accept"
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: 'Aceptar solicitud',
                          text: `¿Aceptar a ${solicitud.username} como vendedor?`,
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonText: 'Aceptar',
                          confirmButtonColor: 'var(--color-dark)',
                          cancelButtonText: 'Cancelar'
                        });
                        if (!confirm.isConfirmed) return;
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(`/api/solicitud-vendedor/${solicitud.id_solicitud || solicitud.id}/status`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ status: 'aceptada' })
                          });
                          if (res.ok) {
                            Swal.fire({ title: 'Aceptada', text: 'Solicitud aceptada', icon: 'success', timer: 1500, showConfirmButton: false });
                            fetchSolicitudes();
                            fetchUsuarios();
                          } else {
                            const err = await res.json().catch(() => null);
                            Swal.fire({ title: 'Error', text: err?.message || 'No se pudo aceptar', icon: 'error' });
                          }
                        } catch (err) {
                          console.error(err);
                          Swal.fire({ title: 'Error', text: 'Error al procesar la solicitud', icon: 'error' });
                        }
                      }}
                    >Aceptar</button>

                    <button
                      className="btn-reject"
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: 'Rechazar solicitud',
                          text: `¿Rechazar la solicitud de ${solicitud.username}?`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Rechazar',
                          confirmButtonColor: 'var(--color-dark)',
                          cancelButtonText: 'Cancelar'
                        });
                        if (!confirm.isConfirmed) return;
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(`/api/solicitud-vendedor/${solicitud.id_solicitud || solicitud.id}/status`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ status: 'rechazada' })
                          });
                          if (res.ok) {
                            Swal.fire({ title: 'Rechazada', text: 'Solicitud rechazada', icon: 'success', timer: 1500, showConfirmButton: false });
                            fetchSolicitudes();
                          } else {
                            const err = await res.json().catch(() => null);
                            Swal.fire({ title: 'Error', text: err?.message || 'No se pudo rechazar', icon: 'error' });
                          }
                        } catch (err) {
                          console.error(err);
                          Swal.fire({ title: 'Error', text: 'Error al procesar la solicitud', icon: 'error' });
                        }
                      }}
                    >Rechazar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="usuarios-filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por usuario o email..."
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
        <div className="stat-card stat-card-total">
          <h3>Total Usuarios</h3>
          <p className="stat-number">{usuarios.length}</p>
        </div>
        <div className="stat-card stat-card-comprador">
          <h3>Compradores</h3>
          <p className="stat-number">{usuarios.filter(u => u.rol === 'comprador').length}</p>
        </div>
        <div className="stat-card stat-card-vendedor">
          <h3>Vendedores</h3>
          <p className="stat-number">{usuarios.filter(u => u.rol === 'vendedor').length}</p>
        </div>
        <div className="stat-card stat-card-admin">
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
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.username || usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>
                  <select
                    value={usuario.rol}
                    onChange={(e) => handleRoleChange(
                      usuario.id, 
                      e.target.value, 
                      usuario.rol, 
                      usuario.username || usuario.nombre
                    )}
                    className={`rol-select rol-${usuario.rol}`}
                  >
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{new Date(usuario.createdAt || Date.now()).toLocaleDateString()}</td>
                <td>
                  <div className="user-actions">
                    <button
                      onClick={() => handleViewUser(usuario)}
                      className="btn-detail"
                      title="Ver detalle del usuario"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(usuario.id)}
                      className="btn-delete"
                      title="Eliminar usuario"
                    >
                      <FaTrash />
                    </button>
                  </div>
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

      {/* Información de paginación y controles */}
      {filteredUsuarios.length > 0 && (
        <div className="pagination-info">
          <p>
            Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsuarios.length)} de {filteredUsuarios.length} usuarios
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

      {/* Modal de detalle del usuario */}
      <UserDetailModal 
        user={selectedUser}
        isOpen={showUserDetail}
        onClose={closeUserDetail}
      />
    </div>
  );
};

export default UsuariosAdmin;