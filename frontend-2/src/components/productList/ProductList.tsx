import './productList.css'
import { useState } from 'react'
import SelectorDeCategoria from './SelectorDeCategoria'

    export const productos = [
  {
    titulo: "Remera oversize vintage",
    precio: 12000,
    categoria: "remera",
    imagen: "/../public/productos/producto1.jpg",
    talle: "L",
    descripcion:
      "Remera de corte amplio estilo vintage, ideal para un look relajado y moderno.",
  },
  {
    titulo: "Zapatillas urbanas",
    precio: 35000,
    categoria: "calzado",
    imagen: "/productos/producto2.png",
    talle: "42",
    descripcion:
      "Zapatillas cómodas y versátiles para uso diario con estilo urbano.",
  },
  {
    titulo: "Pantalón cargo beige",
    precio: 22000,
    categoria: "pantalones",
    imagen: "/productos/producto3.jpg",
    talle: "M",
    descripcion:
      "Pantalón cargo de algodón con múltiples bolsillos y corte moderno.",
  },
  {
    titulo: "Campera denim clásica",
    precio: 38000,
    categoria: "camperas",
    imagen:"/productos/producto4.jpg",
    talle: "L",
    descripcion:
      "Campera de jean atemporal, perfecta para combinar con cualquier outfit.",
  },
  {
    titulo: "Top lencero negro",
    precio: 11000,
    categoria: "remera",
    imagen: "/productos/producto5.jpg",
    talle: "S",
    descripcion:
      "Top elegante de encaje negro con tirantes finos, ideal para la noche.",
  },
  {
    titulo: "Borcegos cuero negro",
    precio: 40000,
    categoria: "calzado",
    imagen: "/productos/producto6.jpg",
    talle: "40",
    descripcion:
      "Borcegos de cuero negro con diseño clásico, perfectos para el invierno.",
  },
  {
    titulo: "Pantalón recto sastrero",
    precio: 23000,
    categoria: "pantalones",
    imagen: "/productos/producto7.jpg",
    talle: "S",
    descripcion:
      "Pantalón sastrero de corte recto, ideal para un look elegante y formal.",
  },
  {
    titulo: "Campera inflable Kappa",
    precio: 42000,
    categoria: "camperas",
    imagen: "/productos/producto8.jpg",
    talle: "XL",
    descripcion:
      "Campera inflable con abrigo térmico y estilo deportivo de la marca Kappa.",
  },
  {
    titulo: "Remera gráfica 90s",
    precio: 15500,
    categoria: "remera",
    imagen: "/productos/producto9.jpg",
    talle: "M",
    descripcion:
      "Remera con diseño gráfico estilo noventoso, un guiño a la nostalgia.",
  },
  {
    titulo: "Zapatillas deportivas",
    precio: 37000,
    categoria: "calzado",
    imagen: "/productos/producto10.jpg",
    talle: "42",
    descripcion:
      "Zapatillas con tecnología de amortiguación, ideales para entrenar o caminar.",
  },
  {
    titulo: "Pantalón jean roturas",
    precio: 21000,
    categoria: "pantalones",
    imagen: "/productos/producto11.png",
    talle: "L",
    descripcion:
      "Jean con roturas modernas, estilo casual para todos los días.",
  },
  {
    titulo: "Campera cuero sintético",
    precio: 39500,
    categoria: "camperas",
    imagen: "/productos/producto12.jpg",
    talle: "M",
    descripcion:
      "Campera de cuero sintético con estilo urbano, resistente y con actitud.",
  },
  {
    titulo: "Remera básica negra",
    precio: 11500,
    categoria: "remera",
    imagen: "/productos/producto13.jpg",
    talle: "S",
    descripcion: "Remera lisa de algodón negra, para cualquier ocasión.",
  },
  {
    titulo: "Botines gamuza marrón",
    precio: 56000,
    categoria: "calzado",
    imagen: "/productos/producto14.jpg",
    talle: "40",
    descripcion:
      "Botines de gamuza marrón con diseño elegante y suela resistente.",
  },
  {
    titulo: "Campera vintage deportiva River Plate",
    precio: 51000,
    categoria: "camperas",
    imagen: "/productos/producto15.png",
    talle: "L",
    descripcion:
      "Campera retro de River Plate, para hinchas con estilo deportivo y nostálgico.",
  },
  {
    titulo: "Vestido floreado midi",
    precio: 24000,
    categoria: "vestidos",
    imagen: "/productos/producto16.jpeg",
    talle: "M",
    descripcion:
      "Vestido midi con estampado floral, fresco y femenino para el verano.",
  },
];


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
       <SelectorDeCategoria productos={productos} onCategoriaChange={handleCategoriaChange} />
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
