import {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValid}) => {

    const[disponible, setDisponible]=useState(0)
    const[gastado, setGastado]= useState(0)
    const[porcentaje, setPorcentaje]= useState(0)

    useEffect(() => {
     const totalGastado= gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);
     setGastado(totalGastado)
     const totalDisponible = presupuesto - totalGastado
     setDisponible(totalDisponible)
    
     
    }, [gastos])

    useEffect(()=>{
        const nuevoPorcentaje = ((gastado*100) / presupuesto).toFixed(2)

        // ((presupuuesto - disponible) / presupuesto )*100
        setTimeout(() => {
           setPorcentaje(nuevoPorcentaje)
        }, 500);
        
    })

    const handleResetApp = ()=>{
        const resultado = confirm("Deseas reiniciar la aplicacion")
        if(resultado){
            setPresupuesto(0)
        setGastos([])
        setIsValid(false)
        }

        
    }

    


    

    function formateaCantidad(cantidad){
        return cantidad.toLocaleString(
            'en-US',
            {style: 'currency', currency: 'USD'}
            )
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            
           <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#dc2626": "#3b82f6",
                        trailColor: "#f5f5f5",
                        textColor: porcentaje > 100 ? "#dc2626": "#3b82f6"
                    })}
                    text= {`${porcentaje}% Gastado`}
           />

        </div>
        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >RESET APP</button>
            <p>
                <span>Presupuesto: </span>
                {formateaCantidad(Number(presupuesto))}
                </p>
            <p className={`${disponible < 0 ? "negativo": ""}`}>
                <span>Disponible: </span>
                {formateaCantidad(Number(disponible))}
                </p>
            <p>
                <span>Gastado: </span>
                {formateaCantidad(Number(gastado))}
                </p>
        </div>
    </div>
  )
}
