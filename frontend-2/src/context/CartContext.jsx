import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Crear el contexto del carrito de compras
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  // Inicializar con datos del localStorage si existen
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('carrito');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar carrito:', error);
    }
  }, [cartItems]);

  // Escuchar cambios en localStorage desde otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'carrito' && e.newValue) {
        try {
          const newCartItems = JSON.parse(e.newValue);
          setCartItems(newCartItems);
        } catch (error) {
          console.error('Error al sincronizar carrito:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Limpiar carrito cuando se cierre sesión
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      if (!token && cartItems.length > 0) {
        // Si no hay token pero hay items en el carrito, limpiarlo
        setCartItems([]);
        localStorage.removeItem('carrito');
      }
    };

    // Verificar inmediatamente
    checkAuthStatus();

    // Escuchar cambios en el localStorage del token
    const handleAuthChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        // Token eliminado (logout)
        setCartItems([]);
        localStorage.removeItem('carrito');
      }
    };

    window.addEventListener('storage', handleAuthChange);
    
    // También verificar periódicamente por si el token se elimina en la misma pestaña
    const authCheckInterval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      clearInterval(authCheckInterval);
    };
  }, [cartItems.length]);

  // Agregar producto al carrito
  const addToCart = (prenda) => {
    // Verificar si el usuario está logueado
    const token = localStorage.getItem('token');
    if (!token) {
      // Abrir el modal del carrito (vacío) y mostrar mensaje toast
      setIsCartOpen(true);
      
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión para comprar',
        text: 'Necesitas estar logueado para agregar productos al carrito',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
      return;
    }

    const existingItem = cartItems.find(item => item.id === prenda.id);
    
    if (existingItem) {
      setIsCartOpen(true); // Abrir el carrito para mostrar el producto existente
      
      Swal.fire({
        icon: 'info',
        title: 'Ya está en el carrito',
        text: 'Este producto ya se encuentra en tu carrito de compras. Son prendas únicas.',
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
      return;
    }

    setCartItems(prev => [...prev, prenda]);
    setIsCartOpen(true); // Abrir modal al agregar
    
    Swal.fire({
      icon: 'success',
      title: '¡Agregado al carrito!',
      text: `${prenda.titulo} se agregó correctamente`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  // Remover producto del carrito
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.setItem('carrito', JSON.stringify([]));
    } catch (error) {
      console.error('Error al limpiar carrito:', error);
    }
  };

  // Calcular total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.precio), 0);
  };

  // Obtener cantidad de items
  const getCartCount = () => cartItems.length;

  // Abrir/cerrar modal
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;