import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductosDestacados();
  }, []);

  const fetchProductosDestacados = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/prenda");

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const prendas = await response.json();

      // Filtrar solo prendas disponibles y con imagen
      const prendasDisponibles = prendas.filter(
        (prenda) => prenda.disponible && prenda.imagen_url
      );

      // Seleccionar 3 prendas aleatorias
      const prendasAleatorias = prendasDisponibles
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setProductosDestacados(prendasAleatorias);
    } catch (error) {
      console.error("Error al cargar productos destacados:", error);
      // En caso de error, mantener array vacío
      setProductosDestacados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerMas = (prenda) => {
    if (prenda && prenda.id === "todos") {
      navigate("/prendas");
    } else {
      navigate(`/producto/${prenda.id}`);
    }
  };

  if (loading) {
    return (
      <section className="destacados">
        <h2 className="titulo-destacados">PRODUCTOS DESTACADOS</h2>
        <div className="doble">
          <div className="loading-featured">Cargando productos...</div>
        </div>
      </section>
    );
  }

  if (productosDestacados.length === 0) {
    return (
      <section className="destacados">
        <h2 className="titulo-destacados">PRODUCTOS DESTACADOS</h2>
        <div className="doble">
          <div className="no-products">
            No hay productos disponibles en este momento.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destacados">
      <h2 className="titulo-destacados">PRODUCTOS DESTACADOS</h2>
      <div className="doble">
        {productosDestacados.map((prenda) => (
          <div className="card" key={prenda.id}>
            <img
              className="imgCard"
              src={prenda.imagen_url}
              alt={prenda.titulo}
            />
            <div className="card-info">
              <h3>{prenda.titulo}</h3>
              <p className="precio-destacado">${prenda.precio}</p>
              <button
                className="btn-ver-mas"
                onClick={() => handleVerMas(prenda)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn-ver-todos"
          onClick={() => handleVerMas({ id: "todos" })}
        >
          Ver todas las prendas
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
