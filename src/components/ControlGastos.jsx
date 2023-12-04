import { useEffect,useState } from "react"
import { CircularProgressbar,buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
const ControlGastos = ({gastos,presupuesto,setPresupuesto,setGastos,setisValidPresupuesto}) => {


    const[porcentaje,setPorcentaje] = useState(0)
    const[disponible,setDisponible] = useState(0)
    const[gastado,setGastado] = useState(0)


    useEffect(() => {
        const totalGastado = gastos.reduce((total,gasto) => {
            
            return gasto.cantidad + total
            
        },0)

        const totalDisponible = presupuesto - totalGastado


        const nuevoPorcentaje = (((presupuesto - totalDisponible)/presupuesto) * 100).toFixed(2)


        setDisponible(totalDisponible)
        setGastado(totalGastado)


        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
    }, [gastos])
    

    const handlerResetApp = () => {

        const resultado = confirm("Deseas reiniciar presupuesto y gastos ?")

        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setisValidPresupuesto(false)
        }
    }


    const formatearPresupuesto = (cantidad) => {

        return Number(cantidad).toLocaleString('en-US',{


            style: 'currency',
            currency: 'USD'
        }
        
        
        )

    }



  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        
        <div>

            <CircularProgressbar
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor:porcentaje > 100 ? '#DC2626' : '#3B82F6'
        })}
            text= {`${porcentaje}% Gastado`}
            value={porcentaje}
            > 
                
                
            </CircularProgressbar>

 
        </div>
        
        
        
        <div className="contenido-presupuesto">

            <button className="reset-app"
            type="button"
            onClick={handlerResetApp}
            >
                Resetear App
            </button>

            <p>
                <span> Presupuesto: </span> {formatearPresupuesto(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo': ''}`}>
                <span> Disponible: </span> {formatearPresupuesto(disponible)}
            </p>

            <p>
                <span> Gastado: </span> {formatearPresupuesto(gastado)}
            </p>
        </div>
        
    
    </div>
  )
}

export default ControlGastos