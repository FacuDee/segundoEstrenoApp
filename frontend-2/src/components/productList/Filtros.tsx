import React from 'react'
import FiltroDeCategoria from './FiltroDeCategoria'

function Filtros({ productos, handleCategoriaChange }) {
  return (
    <div>
      <FiltroDeCategoria productos={productos} onCategoriaChange={handleCategoriaChange} />
    </div>
  )
}

export default Filtros
