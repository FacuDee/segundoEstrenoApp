import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import "./ProductList.css";

const ProductList = () => {
  const [prendas, setPrendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/prenda")
      .then((res) => res.json())
      .then((data) => {
        setPrendas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando prendas...</div>;

  return (
    <div className="product-list">
      {prendas.map((prenda, idx) => (
        <div key={prenda.id_prenda ?? idx} className="product-item card-producto">
          <div className="imagen-contenedor">
            <img src={prenda.imagen_url} alt={prenda.titulo} />
            <div className="btns-hover">
              <button title="Ver detalles">
                <FaEye />
              </button>
              <button title="Agregar a favoritos">
                <FaHeart />
              </button>
              <button title="Agregar al carrito">
                <FaShoppingCart />
              </button>
            </div>
          </div>
          <div className="contenido">
            <h3>{prenda.titulo}</h3>
            <p>{prenda.descripcion}</p>
            <span>${prenda.precio}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;