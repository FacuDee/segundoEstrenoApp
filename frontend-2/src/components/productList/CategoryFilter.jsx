import React from 'react'


const capitalizar = (texto) => {
    if (!texto) return ''; 
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

function CategoryFilter({ productos, onCategoriaChange }) {
  const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];

  return (
    <div>
        <label htmlFor="filtro-categoria">Filtrar por Categoría:</label>
        <select id="filtro-categoria" onChange={onCategoriaChange}>
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>
              {capitalizar(cat)}</option>
          ))}
        </select>
      </div >
    );
  }





export default CategoryFilter;

