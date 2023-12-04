import {useState} from 'react'
import Mensaje from './Mensaje'



const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setisValidPresupuesto}) => {

const [mensaje,setMensaje] = useState("")

const handlerPresupuesto = (event) => {
  event.preventDefault()

    if (presupuesto < 0 || !presupuesto) {
      
      setMensaje("Presupuesto no valido")

      return
      
    }
    setMensaje('')
    setisValidPresupuesto(true)
}


  return (
    <div className=' contenedor-presupuesto contenedor sombra'>
        
        <form onSubmit={handlerPresupuesto} className='formulario'>
            
            <div className='campo'>
                <label> Definir Presupuesto </label>

                <input 
                
                type="number" 
                placeholder='Añade Nuevo Presupuesto'
                className='nuevo-presupuesto'
                value={presupuesto}
                onChange={(e) => setPresupuesto(Number(e.target.value))}
                
                />
            
            </div>

            <input  type="submit"  value="Añadir" />

            {mensaje && <Mensaje tipo={"error"} >{mensaje}</Mensaje>}

        </form>

    </div>
  )
}

export default NuevoPresupuesto