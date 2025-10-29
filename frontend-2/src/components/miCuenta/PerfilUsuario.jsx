import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PerfilUsuario = ({ user, onUserUpdate }) => {
  
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Campos que existen en la BD
    username: user.username || user.nombre || '',
    email: user.email || '',
    // Campos locales (no en BD)
    telefono: '',
    direccion: ''
  });

  // Obtener el ID correcto del usuario
  const userId = user.sub || user.id;

  // Estado para gestionar la solicitud de vendedor
  const [solicitudStatus, setSolicitudStatus] = useState(null); // null | 'enviando' | 'enviada' | 'error'

  // Cargar datos locales del localStorage
  useEffect(() => {
    const localData = localStorage.getItem(`userProfile_${userId}`);
    if (localData) {
      const parsed = JSON.parse(localData);
      setFormData(prev => ({
        ...prev,
        telefono: parsed.telefono || '',
        direccion: parsed.direccion || ''
      }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Datos para la base de datos (solo campos que realmente cambiaron)
      const dbData = {};
      
      if (formData.username !== (user.username || user.nombre)) {
        dbData.username = formData.username;
      }
      
      if (formData.email !== user.email) {
        dbData.email = formData.email;
      }
      
      // Si no hay cambios en BD, solo actualizar localStorage
      if (Object.keys(dbData).length === 0) {
        // Solo guardar datos locales
        const localData = {
          telefono: formData.telefono,
          direccion: formData.direccion
        };
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(localData));
        
        setEditing(false);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Información local actualizada correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        return;
      }
      
      // Datos para localStorage (campos adicionales)
      const localData = {
        telefono: formData.telefono,
        direccion: formData.direccion
      };
      
      // Actualizar en la BD usando el endpoint de perfil
      const response = await fetch(`/api/usuario/${userId}/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dbData)
      });

      if (response.ok) {
        // Obtener los datos actualizados del servidor
        const updatedUser = await response.json();
        
        // Actualizar el token en localStorage con los nuevos datos
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
          try {
            const decoded = JSON.parse(atob(currentToken.split('.')[1])); // Decodificar payload
            const newPayload = {
              ...decoded,
              username: updatedUser.username || formData.username,
              email: updatedUser.email || formData.email
            };
            
            // Crear nuevo token actualizado (simulado - en producción el backend enviaría uno nuevo)
            const tokenParts = currentToken.split('.');
            const newTokenPayload = btoa(JSON.stringify(newPayload));
            const newToken = `${tokenParts[0]}.${newTokenPayload}.${tokenParts[2]}`;
            localStorage.setItem('token', newToken);
            
            // Crear objeto de datos actualizados
            const newTokenData = { ...user, ...updatedUser };
            
            // Notificar al componente padre sobre la actualización
            if (onUserUpdate) {
              onUserUpdate(newTokenData);
            }
            
            // Disparar evento personalizado para notificar a otros componentes
            window.dispatchEvent(new CustomEvent('userUpdated', { 
              detail: newTokenData 
            }));
          } catch (error) {
            console.error('Error actualizando token:', error);
          }
        }
        
        // Guardar datos locales
        localStorage.setItem(`userProfile_${userId}`, JSON.stringify(localData));
        
        setEditing(false);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Perfil actualizado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('Error del servidor:', errorData);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al actualizar el perfil',
        icon: 'error'
      });
    }
  };

  const handleCancel = () => {
    const localData = localStorage.getItem(`userProfile_${userId}`);
    const parsed = localData ? JSON.parse(localData) : {};
    
    setFormData({
      username: user.username || user.nombre || '',
      email: user.email || '',
      telefono: parsed.telefono || '',
      direccion: parsed.direccion || ''
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
          <label>Nombre de usuario</label>
          {editing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.username || user.nombre}</p>
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
            <p>{formData.telefono || 'No especificado'}</p>
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
            <p>{formData.direccion || 'No especificada'}</p>
          )}
        </div>

        <div className="info-group">
          <label>Rol</label>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <p className={`rol-badge rol-${user.rol}`}>
              {user.rol === 'admin' ? 'Administrador' : 
               user.rol === 'vendedor' ? 'Vendedor' : 'Comprador'}
            </p>

            {user.rol === 'comprador' && (
              <>
                <button
                  className="btn-solicitar-vendedor"
                  onClick={async () => {
                    if (solicitudStatus === 'enviando' || solicitudStatus === 'enviada') return;
                    setSolicitudStatus('enviando');
                    try {
                      const token = localStorage.getItem('token');
                      const body = { userId: userId, username: user.username || user.nombre };
                      const res = await fetch(`/api/solicitud-vendedor`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(body)
                      });

                      if (res.ok) {
                        setSolicitudStatus('enviada');
                        Swal.fire({
                          title: 'Solicitud enviada',
                          text: 'Tu solicitud para ser vendedor fue enviada al administrador. Pronto recibirás una respuesta.',
                          icon: 'success',
                          timer: 4000,
                          showConfirmButton: false
                        });
                      } else if (res.status === 401) {
                        setSolicitudStatus('error');
                        Swal.fire({ title: 'No autorizado', text: 'Inicia sesión e intenta de nuevo.', icon: 'warning' });
                      } else {
                        const err = await res.json().catch(() => null);
                        setSolicitudStatus('error');
                        Swal.fire({ title: 'Error', text: err?.message || 'No se pudo enviar la solicitud', icon: 'error' });
                      }
                    } catch (err) {
                      console.error(err);
                      setSolicitudStatus('error');
                      Swal.fire({ title: 'Error', text: 'Error al enviar la solicitud', icon: 'error' });
                    }
                  }}
                  disabled={solicitudStatus === 'enviando' || solicitudStatus === 'enviada'}
                >
                  {solicitudStatus === 'enviando' ? 'Enviando...' : solicitudStatus === 'enviada' ? 'Solicitud enviada' : 'Quiero ser vendedor'}
                </button>
              </>
            )}
          </div>
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