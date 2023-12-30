import { useState, useEffect } from "react"
import { MensajeError } from "../MensajeError"
import iconoCerrar from "../img/cerrar.svg"


export const Modal  = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    
    const [nombre, setNombre]= useState("")
    const [cantidad, setCantidad]= useState("")
    const [categoria, setCategoria]= useState("")
    const[mensaje, setMensaje]=useState("")
    const [id,setId] = useState("")
    const[fecha, setFecha]= useState("")

    useEffect(()=>{

        if(Object.keys(gastoEditar).length > 0){
            
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)

        }
    },[])

    const ocultarModal =()=>{
       
        setAnimarModal(false)
       
        setTimeout(() => {
             setModal(false)
             setGastoEditar({})
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios")
            
         setTimeout(() => {
            setMensaje("")
         }, 3000);
        }else  {

             guardarGasto({nombre,cantidad, categoria,id, fecha})


                 setAnimarModal(false)
        
        setTimeout(() => {
             setModal(false)
        }, 500);
       
        }
    }

  return (
    <div className="modal">
        <div className='cerrar-modal'>
            <img src={iconoCerrar} alt="icono-Cerrar" 
                onClick={ocultarModal}
            />
        </div>
        <form 
            onSubmit={handleSubmit}
             className={`formulario ${animarModal ? "animar" : "cerrar"}`}>

            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {mensaje && <MensajeError tipo={"error"}>{mensaje}</MensajeError>}

            
            <div className='campo'>
                <label htmlFor="nombre">Nuevo Gasto</label>
                <input
                     type="text"
                     placeholder='Añade el nombre del gasto'
                     value={nombre}
                     onChange={e=> setNombre(e.target.value)}
                     id='nombre'
                />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input
                     type="number"
                     placeholder='Añade una cantidad $'
                     value={cantidad}
                     onChange={e=>setCantidad(Number(e.target.value))}
                     id='cantidad'
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Filtrar Gastos</label>
               <select
               id="categoria"
               value={categoria}
               onChange={e=>setCategoria(e.target.value)}
               >
                    <option value= "seleccion">-- seleccione --</option>
                    <option value= "ahorro">Ahoro</option>
                    <option value= "casa">Casa</option>
                    <option value= "salud">Salud </option>
                    <option value= "comida">Comida</option>
                    <option value= "ocio">Ocio</option>
                    <option value= "suscripciones">susripciones</option>
               </select>
            </div>
            <input className=''
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}>
                        </input>
            
        </form>
    </div>
  )
}
