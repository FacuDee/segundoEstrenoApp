import './productList.css'
import { useState } from 'react'
import Filtros from './Filtros'


function ProductList() {
  const [prendas, setPrendas] = useState (productos)

   const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const categoria = e.target.value;
      if (categoria === "") {
        setPrendas(productos);
      } else {
        setPrendas(productos.filter((p) => p.categoria === categoria));
      }
    };

    return (

      <div>
        <Filtros productos={productos} handleCategoriaChange={handleCategoriaChange} />
      <h2> Mostrando productos de la categoria {prendas[0]?.categoria || "todas"}</h2>
         <ul className='product-list'>
      {prendas.map((producto, index) => (
            <li key={index} className='product-item'>
              <img src={producto.imagen} alt={producto.titulo} />
              <h2 className='card-producto'>{producto.titulo}</h2>
              <p>Precio: ${producto.precio}</p>
              <p>Talle: {producto.talle}</p>
            </li>
      ))}
          </ul>
    </div>
    );
} 

export default ProductList
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

  if (loading) return <div className="loading">Cargando prendas...</div>;

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
