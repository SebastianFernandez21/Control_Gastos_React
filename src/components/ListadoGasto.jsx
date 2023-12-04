import React from 'react'
import Gastos from './Gastos'



const ListadoGasto = ({gastos,setEditarGasto,eliminarGasto,filtro,gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>


      {
          filtro ? (
          <>
            <h2>{gastosFiltrados.length? "Gastos":"No hay Gatos en esta Categoria"}</h2>
                {gastosFiltrados.map ( gastos => (

                <Gastos
                key={gastos.id}
                gastos={gastos}
                setEditarGasto = {setEditarGasto}
                eliminarGasto = {eliminarGasto}
                />
            ))}
          </>
       ) : (
        <>
        <h2>{gastos.length? "Gastos":"No hay Gatos"}</h2>
        {gastos.map ( gastos => (

          <Gastos
          key={gastos.id}
          gastos={gastos}
          setEditarGasto = {setEditarGasto}
          eliminarGasto = {eliminarGasto}
          />

        )) }
        </>
        )
    }
    </div>
  )
}

export default ListadoGasto