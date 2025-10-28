import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import { useState } from 'react';





function Filter({ setPrendas, productos }) {
   const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [ordenPrecio, setOrdenPrecio] = useState("");

  // aplicar ambos filtros
  const aplicarFiltros = (categoria, orden) => {
    let productosFiltrados = [...productos];
    // filtrar por categoria
     if (categoria !== "") {
      productosFiltrados = productosFiltrados.filter((p) => p.categoria === categoria);
    }

 // Ordenar por precio
    if (orden === 'asc') {
      productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'desc') {
      productosFiltrados.sort((a, b) => b.precio - a.precio);
    }
const handleCategoriaChange = (e) => {
      const categoria = e.target.value;
     setCategoriaSeleccionada(categoria);
    aplicarFiltros(categoria, ordenPrecio);
    };
     const handlePrecioChange = (e) => {
    const orden = e.target.value;
    setOrdenPrecio(orden);
    aplicarFiltros(categoriaSeleccionada, orden);
  };


  return (
    <div>
      <CategoryFilter productos={productos} onCategoriaChange={handleCategoriaChange} />
      <PriceFilter onPrecioChange={handlePrecioChange} />
    </div>
  )
};

}

export default Filter
