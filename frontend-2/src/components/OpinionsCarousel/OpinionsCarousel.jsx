import React, { useState, useEffect, useRef } from 'react';
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
  const carruselRef = useRef(null);
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

  const moverCarruselAutomatico = () => {
    if (transicionActiva) {
      setIndiceActual(prev => prev + 1);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(moverCarruselAutomatico, 4000);
    return () => clearInterval(intervalo);
  }, [transicionActiva]);

  useEffect(() => {
    if (!carruselRef.current) return;

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

    // Aplicar transform
    carruselRef.current.style.transition = transicionActiva ? 'transform 0.5s ease-in-out' : 'none';
    carruselRef.current.style.transform = `translateX(-${indiceActual * 100}%)`;

    // Escuchar fin de transición
    carruselRef.current.addEventListener('transitionend', handleTransitionEnd);
    
    return () => {
      if (carruselRef.current) {
        carruselRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [indiceActual, total, transicionActiva]);

  return (
    <section className="opiniones">
      <h2 className='titulo-opiniones'>LO QUE DICE NUESTRA COMUNIDAD</h2>
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