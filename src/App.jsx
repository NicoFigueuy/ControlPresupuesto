
import { useState, useEffect } from "react"
import Header from "./components/Header"
import {Modal} from "./components/Modal"
import nuevoGasto from "./img/nuevo-gasto.svg"
import {ListadoGastos} from "./components/ListadoGastos"
import {Filtro} from "./components/Filtro"

function App() {
const[presupuesto, setPresupuesto]=useState(localStorage.getItem("presupuesto") ?? 0)
    const[isValid,setIsValid]=useState(false)
    const[modal,setModal]=useState(false)
    const [animarModal, setAnimarModal]= useState(false)
    const [gastos, setGastos]= useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")): [])
    const [gastoEditar, setGastoEditar]= useState({})
    const [filtro, setFiltro]= useState("")
    const[gastosFiltrados, setGastosFiltrados]= useState([])

    useEffect(()=>{
      if(Object.keys(gastoEditar).length > 0){
        handleNuevoGasto()
      }
    },[gastoEditar])

    useEffect(()=>{
        Number(localStorage.setItem("presupuesto", presupuesto ?? 0))
    },[presupuesto])

    useEffect(()=>{
        localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
    },[gastos])

    useEffect(()=>{
      const presupuestoLs = localStorage.getItem("presupuesto") ?? 0
      if(presupuestoLs > 0) {
        setIsValid(true)
      }
    },[])

    useEffect(()=>{
      if(filtro){
        const gastosFiltro = gastos.filter(gasto=> gasto.categoria === filtro)
        setGastosFiltrados(gastosFiltro)
      }
       
    },[filtro])

     const handleNuevoGasto =  ( )=>{
      setModal(true)
    
      setTimeout(()=>{
        setAnimarModal(true);
      },250)
     } 

     const generarId = ()=>{
      const random = Math.random().toString(36).substring(1,3)
      const fecha = Date.now().toString(36)
      return random + fecha
     }

     const guardarGasto = gasto => {
      if(gasto.id){
        //Actulizar
        const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
      }else{
          //nuevo gasto
          gasto.fecha =Date.now()
      gasto.id = generarId()
        setGastos([...gastos, gasto])
      }
      
     }

const eliminarGasto = id =>{
  const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
  setGastos(gastosActualizados)
}

    

  return (
        <div className={modal ? "fijar" : "" }>
            <Header
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            isValid={isValid}
            setIsValid={setIsValid}
            gastos = {gastos} 
            setGastos={setGastos}
            />

            {isValid && (
              <>
              <main>
                <Filtro
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                  <ListadoGastos
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto= {eliminarGasto}
                  gastosFiltrados={gastosFiltrados}
                  filtro={filtro}
                  />

              </main>
              <div className="nuevo-gasto">
                  <img src={nuevoGasto} alt="nuevo gasto"
                    onClick={handleNuevoGasto}
                  />
              </div>
              </>
            )}
              
                {modal && <Modal 
                setModal= {setModal} 
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}
            
            
        </div>
    
  )
}

export default App
