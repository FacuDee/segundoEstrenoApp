import React, { useState, useEffect, useRef } from 'react';
import './OpinionsCarousel.css';

const usuarios = [
  {
    name: "Sofía Rivas",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    reviews: [
      "Excelente calidad y muy amable, todo llegó en perfecto estado. Amo la página. ¡La ropa es hermosa!",
    ],
  },
  {
    name: "Mauro Schmidt",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    reviews: ["Me encantó la experiencia. Envío rápido y prendas impecables."],
  },
  {
    name: "Luis Ortega",
    rating: 4.2,
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    reviews: ["Excelente calidad, parecía ropa nueva. Muy recomendable."],
  },
  {
    name: "Camila Soto",
    rating: 4.4,
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    reviews: ["Buena atención, variedad de estilos y precios accesibles."],
  },
];

const obtenerEstrellas = (puntaje) => {
  const llenas = "★".repeat(Math.floor(puntaje));
  const media = puntaje % 1 >= 0.5 ? "½" : "";
  const vacías = "☆".repeat(5 - Math.ceil(puntaje));
  return `${llenas}${media}${vacías}`;
};

const OpinionsCarousel = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const carruselRef = useRef(null);

  const moverCarrusel = (direccion) => {
    const total = usuarios.length;
    setIndiceActual((prev) => (prev + direccion + total) % total);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      moverCarrusel(1);
    }, 8000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (carruselRef.current) {
      carruselRef.current.style.transform = `translateX(-${indiceActual * 100}%)`;
    }
  }, [indiceActual]);

  return (
    <section className="opiniones">
      <h2>LO QUE DICEN NUESTROS COMPRADORES</h2>
      <div className="carousel-container-opiniones">
        <button className="opiniones-btn nav-left" onClick={() => moverCarrusel(-1)}>❮</button>
        <div className="carousel-opiniones-wrapper">
          <div className="carousel-opiniones" ref={carruselRef}>
            {usuarios.map((usuario, idx) => (
              <div className="user-card" key={idx}>
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
        {usuarios.map((_, idx) => (
          <button
            key={idx}
            className={`opiniones-dot${idx === indiceActual ? " active" : ""}`}
            onClick={() => setIndiceActual(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default OpinionsCarousel;