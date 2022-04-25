import React from "react";
import PropTypes from "prop-types";
import { Principal, Tarjeta, Datos, Editar, Botones, Eliminar, Reservas, Direccion } from "./card.elements";

function Card({title, ancho, largo, precioHora, esAireLibre, urlEdit, urlReserva }) {
  return (
    <Principal>
      <Tarjeta>
        <Direccion>DIRECCIÓN: {title}</Direccion>
        <Datos>DIMENSIONES: {ancho}m x {largo}m</Datos>
        <Datos>PRECIO: {precioHora}€</Datos>
        <Datos>EXTERIOR: {esAireLibre}</Datos>
        <Botones>
          <Editar to={urlEdit}>Editar</Editar>
          <Reservas to={urlReserva}>Reservas</Reservas>
          <Eliminar to=''>Eliminar</Eliminar>
        </Botones>
      </Tarjeta>
    </Principal>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;