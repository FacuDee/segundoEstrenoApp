import React from 'react';



function PriceFilter({onPrecioChange }: { onPrecioChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {

    return (
        <div>
            <label htmlFor="filtro-precio">Filtrar por Precio:</label>
            <select id="filtro-precio" onChange={onPrecioChange}>
            <option value="">Todos</option>
            <option value="asc">Menor a Mayor</option>
            <option value="desc">Mayor a Menor</option>
          
        </select>
        
        </div>
    );
}

export default PriceFilter
