import React from "react";
import PropTypes from "prop-types";
import { Principal, Tarjeta, Datos, Editar, Botones, Eliminar, Reservas, Direccion } from "./card.elements";
import call from "../Util/Caller";
import displayNotification from "../Util/Notifications";

function Card({id, title, ancho, largo, precioHora, esAireLibre, urlEdit, urlReserva }) {
  
  const deletePlaza = evt => {
  call(`/plazas/`+id, 'DELETE')
    .then(response => {
      if (response.ok){
        displayNotification("Éxito","Plaza borrada correctamente","success");
        window.location.reload();
      }
    })
}
  return (
    
      <Tarjeta to={`/disponibilidad/${id}`}>
        <Direccion>{title}</Direccion>
        <Datos><b>PRECIO:</b> {precioHora}€</Datos>
        <Botones>
          <Editar to={urlEdit}>Editar</Editar>
          <Reservas to={urlReserva}>Reservas</Reservas>
          <Eliminar onClick={deletePlaza} to=''>Eliminar</Eliminar>
        </Botones>
      </Tarjeta>
    
  );
}


export default Card;