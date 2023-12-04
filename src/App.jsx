import { useState,useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import Modal from './components/Modal'
import ListadoGasto from './components/ListadoGasto';
import { generaID } from './helpers';
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import { number, object } from 'prop-types';


function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0)
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false)
  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [gastos,setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")):[])
  const [editarGasto,setEditarGasto] = useState({})
  const [filtro,setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])


useEffect(() => {
if(Object.keys(editarGasto).length > 0) {
  setModal(true)
  
  setTimeout(() => {
    setAnimarModal(true)
  }, 100);
}
}, [editarGasto])

useEffect(() => {
 localStorage.setItem("presupuesto",presupuesto ?? 0)
}, [presupuesto])

useEffect(() => {
  localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
 }, [gastos])

useEffect(() => {
  if (filtro) {
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

    setGastosFiltrados(gastosFiltrados)
  }


}, [filtro])


useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem("presupuesto"))??0
  if (presupuestoLS > 0) {
    setisValidPresupuesto(true)
  }
}, [])


  const handlerNuevoGasto = () => {

    setModal(true)
    setEditarGasto({})
    setTimeout(() => {
      setAnimarModal(true)
  }, 100);

  }

  const guardarGastos = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }
    else {
      gasto.id = generaID();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])

    }


    setAnimarModal(false)
    setEditarGasto({})
    setTimeout(() => {
        setModal(false)
    }, 100);



  }

  const eliminarGasto = (id) => {

    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
    

  }



  return (
  <div className={modal ? 'fijar' : ''}>
    <Header 
    presupuesto = {presupuesto}
    setPresupuesto = {setPresupuesto}
    setisValidPresupuesto = {setisValidPresupuesto}
    isValidPresupuesto ={isValidPresupuesto}
    gastos = {gastos}
    setGastos = {setGastos}
    />

    {isValidPresupuesto?

      <>
      <main>
      <Filtros
      filtro={filtro}
      setFiltro={setFiltro}

      />


      <ListadoGasto
      gastos = {gastos}
      setEditarGasto = {setEditarGasto}
      eliminarGasto = {eliminarGasto}
      gastosFiltrados = {gastosFiltrados}
      filtro={filtro}
      />
      </main>

        <div className='nuevo-gasto'>

              <img 

              src={IconoNuevoGasto}
              alt="Ingresar Nuevo Gasto" 
              onClick={handlerNuevoGasto}
              />

        </div> 
        
      </> 
        
        : null
      
     
    }

    {modal && <Modal 
    setModal = {setModal}
    animarModal ={animarModal}
    setAnimarModal ={setAnimarModal}
    guardarGastos = {guardarGastos}
    editarGasto ={editarGasto}
    setEditarGasto = {setEditarGasto}
    />}

    


  </div>
  )
}

export default App
