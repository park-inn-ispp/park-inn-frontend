import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import {Etiqueta, Parrafo} from '../Reserva/ReservaDetails.elements';
import call from '../Util/Caller';

export default function ReservaDetails() {

    const [reserva, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const id = parseInt(useParams().id)

    useEffect(() => {
        const DetallesReserva = async () => {
            const data = await  call(`/reservas/plaza/${id}`,"GET")
            const reserva = await data.json()
            setReserva(reserva)
            setIsLoading(false)
            console.log(reserva)
        }
        DetallesReserva()
    }, [id]);

    //Pantalla de carga
    if (isLoading) {
        return <Loading/>;
      }

    return (   
        <div className="form-style-10">
            <h1>Detalles de la Reserva</h1>
                <div className="Details">
                <Etiqueta>Estado:</Etiqueta><p/> 
                <Parrafo>{reserva.estado}</Parrafo><p/>
                <Etiqueta>Precio total:</Etiqueta><p/> 
                <Parrafo>{reserva.precioTotal}€</Parrafo><p/>
                <Etiqueta>Fecha de inicio:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaInicio.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Fecha de fin:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaFin.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Fecha de solicitud:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaSolicitud.split('T')[0]}</Parrafo><p/>
                <Etiqueta>Usuario:</Etiqueta> <p/>
                <Parrafo>{reserva.user.name}</Parrafo><p/>
                <Etiqueta>Comentarios:</Etiqueta> <p/>
                <Parrafo>{reserva.comentarios}</Parrafo>
                </div>
        </div>
    );
}

