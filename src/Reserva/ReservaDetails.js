import React, {useEffect, useState} from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import Loading from '../components/Loading';
import {Etiqueta, Parrafo} from '../Reserva/ReservaDetails.elements';
import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import { StyledButton } from '../components/GeneralButton/GeneralButton.elements';


export default function ReservaDetails() {

    const [reserva, setReserva] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fechaFin, setFechaFin] = useState(new Date())
    const id = parseInt(useParams().id)
    const today = new Date()
    const cookies = new Cookies();
    const usuario = cookies.get('UserData');
    console.log(usuario)
    const [esCliente, setEsCliente] = useState(false);
    const [esPropietario, setEsPropietario] = useState(false);

    let navigate = useNavigate();

    


    useEffect(() => {
        const DetallesReserva = async () => {
            const data = await  call(`/reservas/${id}`,"GET")
            const reserva = await data.json()
            setReserva(reserva)
            setFechaFin(new Date(reserva.fechaFin))
            const esCli = reserva.user.id===usuario.id;
            const esPro = reserva.plaza.administrador.id===usuario.id;
            setEsCliente(esCli)
            setEsPropietario(esPro)
            setIsLoading(false)
            console.log(reserva)
        }
        DetallesReserva()
    }, [id]);

    console.log(fechaFin)
    
    //const esCliente = reserva.user.id===usuario.id;
    //const esPropietario = reserva.plaza.administrador.id===usuario.id;
    console.log(esCliente)
    console.log(esPropietario)


    function confirmarServicio(id) {
        const url = '/reservas/'+id+'/confirmar'
        call(url,'GET').then(response => response.json()).then(response=>console.log(response))
        
    }

    function generarIncidencia(id) {
        const url = '/reservas/'+id+'/denegar'
        call(url,'GET').then(response => response.json()).then(response=>console.log(response)).then(response => {
            if(response.ok) {
                navigate("/reservas/"+id+"/incidencia/new")
            }
        })
        
        

        
    }

    //Pantalla de carga
    if (isLoading) {
        return <Loading/>;
      }
      let validaFecha = fechaFin<today.toLocaleString()
      let validaEstado = fechaFin<today.toLocaleString() && ((reserva.estado!=="confirmadaUsuario" && !esCliente) 
        || (reserva.estado!=="confirmadaPropietario" && !esPropietario) || reserva.estado=="confirmadaAmbos")
      let botones = validaFecha && validaEstado
      //let show = true
    return (   
        <div className="form-style-10">
            <h1>Detalles de la Reserva</h1>
                <div className="Details">
                <Etiqueta>Estado:</Etiqueta><p/> 
                <Parrafo>{reserva.estado}</Parrafo><p/>
                <Etiqueta>Precio total:</Etiqueta><p/> 
                <Parrafo>{reserva.precioTotal}€</Parrafo><p/>
                <Etiqueta>Fecha de inicio:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaInicio}</Parrafo><p/>
                <Etiqueta>Fecha de fin:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaFin}</Parrafo><p/>
                <Etiqueta>Fecha de solicitud:</Etiqueta> <p/>
                <Parrafo>{reserva.fechaSolicitud}</Parrafo><p/>
                <Etiqueta>Propietario:</Etiqueta> <p/>
                <Parrafo>{reserva.plaza.administrador.name}</Parrafo><p/>
                <Etiqueta>Comentarios:</Etiqueta> <p/>
                <Parrafo>{reserva.comentarios}</Parrafo>
                

                {
                    botones ? (
                        <><Etiqueta>Servicio:</Etiqueta>
                        <StyledButton type="button" onClick={() => confirmarServicio(reserva.id)}>Confirmar servicio</StyledButton><br/>
                        <StyledButton type="button" onClick={() => generarIncidencia(reserva.id)}>Generar incidencia</StyledButton></>

                    ) : (validaFecha ? (<Parrafo>Has confirmado este servicio</Parrafo>) : ("") 
                    
                    )
                }
                </div>
        </div>
    );
}

