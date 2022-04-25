import React from "react";
import PropTypes from "prop-types";
import call from "../Util/Caller";
import "./table.css";
import parsearFechas from "../Util/FechasParser";
function aceptarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/aceptar', 'GET')
    .then(response => {


      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}


function rechazarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/rechazar', 'GET')
    .then(response => {
      console.log(response)

      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}
function cancelarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/cancelar', 'GET')
    .then(response => {
      console.log(response)

      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}



function ListaMisReservas(data) {
  let canceledDiv =  <div className="cancelada"></div>
  let pendentDiv =  <div className="pendiente"></div>
  let aceptedDiv =  <div className="aceptada"></div>
  
    return (
      

    <table cellSpacing="0">
      <thead>
      <tr>
        <th>Direccion</th>
        <th>Cliente</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
        <th>Precio total</th>
        <th>Estado</th>
        <th>Acciones</th>
        <th>Detalles</th>
      </tr>
      </thead>
      <tbody>
      
      {data.data.map(element =>{
        return(
          <tr>
            <td>{element.direccion}</td>
            <td>{element.user.name}</td>
            <td>{parsearFechas(element.fechaInicio)}</td>
            <td>{parsearFechas(element.fechaFin)}</td>
            <td>{element.precioTotal}</td>
            <td>{element.estado=="aceptada" ? 
                aceptedDiv
                : element.estado=="cancelada" ?
                canceledDiv
                :pendentDiv}</td>
            <td>{element.estado=="pendiente" ?
                      <>
                      <button type='button' class='btnAceptar' onClick={() => aceptarReserva(element.id)}>&#10004;</button>

                      <button type='button' class='btnCancelar' onClick={() => rechazarReserva(element.id)}>X</button>
                       </>
                      : ("")
                    }
                    
                {element.estado=="aceptada" ?
                      <>
                      <button type='button' class='btnCancelar' onClick={() => cancelarReserva(element.id)}>X</button>
                      </>
                      : ("")
              
              }
              </td>
              
            <td><a
                href={"/reservas/"+element.id}
                className="btn btn-outline-secondary border-0"
                rel="noreferrer"
              >Detalles</a></td>
           
        </tr>
        )
      })}
      </tbody>
         
      


      
   </table>
  );
}

ListaMisReservas.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default ListaMisReservas;