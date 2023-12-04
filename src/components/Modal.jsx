
import {useState,useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarIcon from '../img/cerrar.svg'

const Modal = ({setModal,animarModal,setAnimarModal,guardarGastos,editarGasto,setEditarGasto}) => {

    const [nombre,setNombre] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [categoria,setCategoria] = useState('')
    const [mensaje,setMensaje] = useState('')
    const [fecha,setFecha] = useState('')
    const [id,setID] = useState('')

    useEffect(() => {
        if(Object.keys(editarGasto).length > 0) {
            setNombre(editarGasto.nombre)
            setCantidad(editarGasto.cantidad)
            setCategoria(editarGasto.categoria)
            setID(editarGasto.id)
            setFecha(editarGasto.fecha)
          }
    }, [editarGasto])
    

    const handlerSubmit = (e) => {
        e.preventDefault();

        if ([nombre,cantidad,categoria].includes('')) {
            
            setMensaje("Todos los Campos son Obligatorios")

            setTimeout(() => {
                setMensaje("")
            }, 3000);

            return;
        }

        guardarGastos({nombre,cantidad,categoria,id,fecha})

    }


    const ocultarModal = () => {

        setAnimarModal(false)
        setEditarGasto({})

        setTimeout(() => {
            setModal(false)
        }, 250);
    }

  return (

    <div className="modal">
        <div className="cerrar-modal"> 

        <img src={CerrarIcon} alt="Icono de cerrar" 
        onClick={ocultarModal}
        
        />

        </div>

        <form onSubmit={handlerSubmit}
        
        className={`formulario ${animarModal ? "animar": " " }`}>

            <legend>{editarGasto.nombre? "Editar Gasto": "Nuevo Gasto"} </legend>


            {mensaje && <Mensaje tipo={"error"} > {mensaje} </Mensaje>}

            <div className='campo'>
            <label htmlFor="nombre">Nombre de Gasto</label>
                <input 
                id='nombre'
                type="text" 
                placeholder='Añade el nombre del gasto'
                value={nombre}
                onChange={(e)=> setNombre(e.target.value)}
                
                />

            </div>

            <div className='campo'>
            <label htmlFor="cantidad">Cantidad</label>
                <input 
                id='cantidad'
                type="number" 
                placeholder='Añade la cantidad del gasto'
                value={cantidad}
                onChange={(e)=> setCantidad(Number(e.target.value))}
                
                />

            </div>

            <div className='campo'>
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria"
                value={categoria}
                onChange={(e)=> setCategoria(e.target.value)}
            
            >

                <option value = "">-- Seleccione -- </option>
                <option value = "Ahorro">  Ahorro </option>
                <option value = "comida"> Comida  </option>
                <option value = "casa"> Casa  </option>
                <option value = "gastos"> Gastos Varios </option>
                <option value = "ocio"> Ocio  </option>
                <option value = "salud"> Salud  </option>
                <option value = "suscripciones"> Suscripciones  </option>


            </select>
                
             <input 
             type="submit"
             value={editarGasto.nombre? "Guardar Cambios": "Añadir Gasto"}>
             
             </input>

            </div>
        </form>

    </div>


  )
}

export default Modal