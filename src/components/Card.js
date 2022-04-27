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
    <Principal>
      <Tarjeta to={`/disponibilidad/${id}`}>
        <Direccion>DIRECCIÓN: {title}</Direccion>
        <Datos>DIMENSIONES: {ancho}m x {largo}m</Datos>
        <Datos>PRECIO: {precioHora}€</Datos>
        <Datos>EXTERIOR: {esAireLibre}</Datos>
        <Botones>
          <Editar to={urlEdit}>Editar</Editar>
          <Reservas to={urlReserva}>Reservas</Reservas>
          <Eliminar onClick={deletePlaza} to=''>Eliminar</Eliminar>
        </Botones>
      </Tarjeta>
    </Principal>
  );
}


export default Card;