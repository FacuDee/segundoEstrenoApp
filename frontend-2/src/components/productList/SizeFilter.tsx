import { productos } from './ProductList';


const tallesUnicos = [...new Set(productos.map((p) => p.talle))];
  const selectTalle = document.getElementById("filtro-talle");
  if (selectTalle) {
    tallesUnicos.forEach((t) => {
      const opcion = document.createElement("option");
      opcion.value = t;
      opcion.textContent = t;
      selectTalle.appendChild(opcion);
    });
  }