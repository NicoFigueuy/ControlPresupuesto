import { useState } from 'react'
import { MensajeError } from '../MensajeError'
const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValid}) => {

      const[mensaje, setMensaje]=useState("")

    const handlePresupuesto= (e)=>{
      e.preventDefault()

      if(!presupuesto || presupuesto<=0) {
        setMensaje("presupuesto Invalido")
        return
      }
      setMensaje("")
      setIsValid(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
    <form className='formulario'
          onSubmit={handlePresupuesto}
    >
        <div className='campo'></div>
        <label>Definir presupuesto</label>
        <input
        className='nuevo-presupuesto'
        placeholder='Añade tu presupuesto'
         type="number" 
         value={presupuesto}
         onChange={e=> {
          Number(setPresupuesto(e.target.value))}

         }/>

         <input 
         type="submit"  
         value={"Añadir"}/>
          {mensaje && <MensajeError tipo="error">{mensaje}</MensajeError>}
        
        
    </form>
    </div>
  )
}

export default NuevoPresupuesto