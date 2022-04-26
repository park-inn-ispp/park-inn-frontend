import React from "react";
import PropTypes from "prop-types";
import call from "../Util/Caller";
import Leyenda from "./Leyenda";
import "./card.css";
function cancelarReserva(reservaId) {

  call(`/reservas/`+reservaId+'/cancelar', 'GET')
    .then(response => {
      console.log(response)

      if (response.ok){
        //navigate(`/mis-reservas`)
        window.location.reload()
      }
    })
}


function CardReservas({ imageSource,id, title,propietario,fechaInicio,fechaFin,precioTotal, estado, urlCancelar,urlDetalles }) {
  let canceledDiv =  <div className="cancelada"></div>
  let pendentDiv =  <div className="pendiente"></div>
  let aceptedDiv =  <div className="aceptada"></div>

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">

      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <div className="card-text-div">
        <p className="card-text text-secondary">
          {(estado=='cancelada' || estado=='rechazada')
            ? canceledDiv
            : (estado=='pendiente')
              ? pendentDiv
              : aceptedDiv
              }
        </p>
        <p className="card-text text-secondary">
          {propietario
            ? "Propietario : " + propietario 
            : "Propietario : -"}
        </p>
        <p className="card-text text-secondary">
          {fechaInicio
            ? "Fecha Inicio : " + fechaInicio 
            : "Fecha Inicio : -"}
        </p>
        <p className="card-text text-secondary">
          {fechaFin
            ? "Fecha Fin : " + fechaFin 
            : "Fecha Fin : -"}
        </p>
        <p className="card-text text-secondary">
          {precioTotal
            ? "Precio total : " + precioTotal +"€"
            : "Precio total : -"}
        </p>
        
        <a
          onClick={() => cancelarReserva(id)}
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
         Cancelar

        </a>
        <a
          href={urlDetalles ? urlDetalles : "#!"}
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Detalles
        </a>
        </div>
      </div>
    </div>
  );
}


export default CardReservas;