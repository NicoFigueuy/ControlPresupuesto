import { useState, useEffect } from "react"

export const Filtro = ({filtro, setFiltro}) => {


  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className="campo">
                <label> Filtrar Gastos</label>
                <select 
                    value={filtro}
                    onChange={e=> setFiltro(e.target.value)}
                >
                    <option value= "">-- Todas las categorias --</option>
                    <option value= "ahorro">Ahoro</option>
                    <option value= "casa">Casa</option>
                    <option value= "salud">Salud </option>
                    <option value= "comida">Comida</option>
                    <option value= "ocio">Ocio</option>
                    <option value= "suscripciones">susripciones</option>
                </select>
            </div>

        </form>
        
    </div>
  )
}
