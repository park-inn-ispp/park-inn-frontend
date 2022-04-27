import React from "react";
import PropTypes from "prop-types";
import call from "../Util/Caller";
import "./table.css";
import parsearFechas from "../Util/FechasParser";
import { Columna, Fila, Tabla, TD, TH, TR, Enlace } from "./TabalMisReservas.elemnts";

function aceptarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/aceptar', 'GET')
    .THen(response => {


      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}


function rechazarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/rechazar', 'GET')
    .THen(response => {
      console.log(response)

      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}
function cancelarReserva(reservaId) {
  call(`/reservas/`+reservaId+'/cancelar', 'GET')
    .THen(response => {
      console.log(response)

      if (response.ok){
        //navigate(`/mis-reservas-de-mis-plazas/plaza/`+id)
        window.location.reload()
      }
    })
}



function ListaMisReservas(data) {
  let canceledDiv =  <div className="cancelada"></div>
  let pendenTDiv =  <div className="pendiente"></div>
  let aceptedDiv =  <div className="aceptada"></div>
  
    return (
      
    <Tabla cellSpacing="0">
      <Columna>
      <TR>
        <TH>Cliente</TH>
        <TH>Fecha Inicio</TH>
        <TH>Fecha Fin</TH>
        <TH>Precio total</TH>
        <TH>Estado</TH>
        <TH>Acciones</TH>
        <TH>Detalles</TH>
      </TR>
      </Columna>
      <tbody>
      
      {data.data.map(element =>{
        return(
          <TR>
            <TD>{element.user.name}</TD>
            <TD>{parsearFechas(element.fechaInicio)}</TD>
            <TD>{parsearFechas(element.fechaFin)}</TD>
            <TD>{element.precioTotal} €</TD>
            <TD>{element.estado==="aceptada" ? 
                aceptedDiv
                : element.estado==="cancelada" ?
                canceledDiv
                :pendenTDiv}</TD>
            <TD>{element.estado==="pendiente" ?
                      <Fila>
                      <button type='button' class='btnAceptar' onClick={() => aceptarReserva(element.id)}>&#10004;</button>
                      <button type='button' class='btnCancelar' onClick={() => rechazarReserva(element.id)}>X</button>
                       </Fila>
                      : ("")
                    }
                    
                {element.estado==="aceptada" ?
                      <>
                      <button type='button' class='btnCancelar' onClick={() => cancelarReserva(element.id)}>X</button>
                      </>
                      : ("")
              
              }
              </TD>
              
            <TD>
              <Enlace to={"/reservas/"+element.id} className="btn btn-outline-secondary border-0" rel="noreferrer">Detalles</Enlace></TD>
           
        </TR>
        )
      })}
      </tbody>
   </Tabla>
  );
}

ListaMisReservas.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default ListaMisReservas;