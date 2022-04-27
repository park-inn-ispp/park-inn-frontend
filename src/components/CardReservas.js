import React from "react";
import { Principal, Tarjeta, Datos } from "./card.elements";


export default function CardReservas({id, direccion, fechaInicio, fechaFin, precioTotal, estado}) {
  let canceledDiv =  <div className="cancelada"></div>
  let pendenTDiv =  <div className="pendiente"></div>
  let aceptedDiv =  <div className="aceptada"></div>
  return (
    <Principal>
      <Tarjeta to={`/reservas/${id}`}>
        <Datos>Dirección: {direccion}</Datos>
        <Datos>Fecha Inicio: {fechaInicio}</Datos>
        <Datos>Fecha Fin: {fechaFin}€</Datos>
        <Datos>Precio Total: {precioTotal}</Datos>
        <Datos>{estado==="aceptada" ? 
                aceptedDiv
                : estado==="cancelada" ?
                canceledDiv
                :pendenTDiv}</Datos>
      </Tarjeta>
    </Principal>
  );
}