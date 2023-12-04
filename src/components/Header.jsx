import ControlGastos from './ControlGastos'
import NuevoPresupuesto from './NuevoPresupuesto'


const Header = ({
  presupuesto,
  gastos,
  setPresupuesto,
  isValidPresupuesto,
  setisValidPresupuesto,
  setGastos
}) => {
  return (
    <header>
        <h1>
            Planificador de Gastos
        </h1>
        {isValidPresupuesto? 

        <ControlGastos
        presupuesto = {presupuesto}
        gastos = {gastos}
        setGastos = {setGastos}
        setPresupuesto = {setPresupuesto}
        setisValidPresupuesto = {setisValidPresupuesto}
        /> : 
        
        <NuevoPresupuesto
         presupuesto = {presupuesto}
         setPresupuesto = {setPresupuesto}
         setisValidPresupuesto = {setisValidPresupuesto}
        />
        
        
        }




        
    
    </header>
  )
}

export default Header