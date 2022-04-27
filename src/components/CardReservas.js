import { Principal, Tarjeta, Datos, Direccion } from "./CardReservas.elements";

export default function CardReservas({id, direccion, fechaInicio, fechaFin, precioTotal, estado}) {
  let canceledDiv =  <div className="cancelada"></div>
  let pendenTDiv =  <div className="pendiente"></div>
  let aceptedDiv =  <div className="aceptada"></div>
  console.log(estado)
  return (
   
    <Principal>
      <Tarjeta to={`/reservas/${id}`}>
        <Direccion>{direccion}</Direccion>
        <Datos>Fecha Inicio: {fechaInicio}</Datos>
        <Datos>Fecha Fin: {fechaFin}</Datos>
        <Datos>Precio Total: {precioTotal} €</Datos>
        <Datos>{estado==="aceptada" ? 
                aceptedDiv
                : estado==="rechazada" || estado==="cancelada" ?
                canceledDiv
                :pendenTDiv}</Datos>
      </Tarjeta>
    </Principal>
  );
}
