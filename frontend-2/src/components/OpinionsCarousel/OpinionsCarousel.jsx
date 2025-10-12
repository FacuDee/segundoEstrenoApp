import React, { useState, useEffect, useRef, useCallback } from 'react';
import './OpinionsCarousel.css';
import { usuarios } from '../../data/OpinionsData';

const obtenerEstrellas = (puntaje) => {
  const llenas = "★".repeat(Math.floor(puntaje));
  const media = puntaje % 1 >= 0.5 ? "½" : "";
  const vacías = "☆".repeat(5 - Math.ceil(puntaje));
  return `${llenas}${media}${vacías}`;
};

const OpinionsCarousel = () => {
  const [indiceActual, setIndiceActual] = useState(1); // Empezamos en 1 para permitir clonar
  const [transicionActiva, setTransicionActiva] = useState(true);
  const [esVisible, setEsVisible] = useState(true);
  const carruselRef = useRef(null);
  const intervalRef = useRef(null);
  const total = usuarios.length;

  // Crear array con elementos clonados para carrusel infinito
  const usuariosExtendidos = [
    usuarios[total - 1], // Último elemento al inicio
    ...usuarios,
    usuarios[0] // Primer elemento al final
  ];

  const moverCarrusel = (direccion) => {
    if (!transicionActiva) return;
    
    setIndiceActual(prev => prev + direccion);
  };

  const moverCarruselAutomatico = useCallback(() => {
    if (transicionActiva && esVisible) {
      setIndiceActual(prev => prev + 1);
    }
  }, [transicionActiva, esVisible]);

  // Manejar visibilidad de página
  useEffect(() => {
    const handleVisibilityChange = () => {
      setEsVisible(!document.hidden);
    };

    const handleFocus = () => setEsVisible(true);
    const handleBlur = () => setEsVisible(false);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Manejar intervalo automático
  useEffect(() => {
    if (esVisible && transicionActiva) {
      intervalRef.current = setInterval(moverCarruselAutomatico, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [moverCarruselAutomatico, esVisible, transicionActiva]);

  // Aplicar transform de manera más robusta
  const actualizarPosicion = useCallback(() => {
    if (!carruselRef.current) return;
    
    const elemento = carruselRef.current;
    elemento.style.transition = transicionActiva ? 'transform 0.5s ease-in-out' : 'none';
    elemento.style.transform = `translateX(-${indiceActual * 100}%)`;
  }, [indiceActual, transicionActiva]);

  useEffect(() => {
    if (!carruselRef.current) return;

    const elemento = carruselRef.current;
    
    const handleTransitionEnd = () => {
      setTransicionActiva(false);
      
      if (indiceActual === 0) {
        // Si estamos en el clon del último, saltar al último real
        setIndiceActual(total);
      } else if (indiceActual === total + 1) {
        // Si estamos en el clon del primero, saltar al primero real
        setIndiceActual(1);
      }
      
      setTimeout(() => setTransicionActiva(true), 50);
    };

    // Aplicar posición
    actualizarPosicion();

    // Escuchar fin de transición
    elemento.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      if (elemento) {
        elemento.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [indiceActual, total, transicionActiva, actualizarPosicion]);

  // Revalidar posición cuando el componente se vuelve visible
  useEffect(() => {
    if (esVisible) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        actualizarPosicion();
      }, 100);
    }
  }, [esVisible, actualizarPosicion]);

  return (
    <section className="opiniones">
      <h2 className='titulo-opiniones'>LA OPINIÓN DE NUESTRA COMUNIDAD</h2>
      <div className="carousel-container-opiniones">
        <button className="opiniones-btn nav-left" onClick={() => moverCarrusel(-1)}>❮</button>
        <div className="carousel-opiniones-wrapper">
          <div className="carousel-opiniones" ref={carruselRef}>
            {usuariosExtendidos.map((usuario, idx) => (
              <div className="user-card" key={`${idx}-${usuario.name}`}>
                <img src={usuario.image} alt={`Foto de ${usuario.name}`} />
                <div className="user-name">{usuario.name}</div>
                <div>
                  <strong>Calificación:</strong>{" "}
                  <span className="stars">
                    {obtenerEstrellas(usuario.rating)} ({usuario.rating.toFixed(1)})
                  </span>
                </div>
                <div className="opinion-text">"{usuario.reviews[0]}"</div>
              </div>
            ))}
          </div>
        </div>
        <button className="opiniones-btn nav-right" onClick={() => moverCarrusel(1)}>❯</button>
      </div>
      <div className="opiniones-dots">
        {usuarios.map((_, idx) => {
          // Calcular el índice real considerando los clones
          const indiceReal = indiceActual === 0 ? total - 1 : 
                           indiceActual === total + 1 ? 0 : 
                           indiceActual - 1;
          
          return (
            <button
              key={idx}
              className={`opiniones-dot${idx === indiceReal ? " active" : ""}`}
              onClick={() => setIndiceActual(idx + 1)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OpinionsCarousel;