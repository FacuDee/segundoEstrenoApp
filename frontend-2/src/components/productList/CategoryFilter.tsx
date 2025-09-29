import React from 'react'



type prendas = {
  categoria: string;
}

const capitalizar = (texto: string) => {
    if (!texto) return ''; 
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

function CategoryFilter({ productos, onCategoriaChange }: { productos: prendas[], onCategoriaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
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

