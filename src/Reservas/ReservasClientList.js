import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
import CardReservas from '../components/CardReservas';
import image1 from "../assets/no-image-available-icon-6.jpg";
import Leyenda from "../components/Leyenda";
import parsearFechas from "../Util/FechasParser";
import NoElements from "../components/NoElements";
import GeneralButton from "../components/GeneralButton/GeneraButton";
import { StyledButton } from "../components/GeneralButton/GeneralButton.elements";
import { BsWindowSidebar } from "react-icons/bs";
import { Container, Wrapper } from "../Plazas/PlazasList.elements";
const cookies = new Cookies();



export default function ReservaClientList(){
    let navigate = useNavigate();
    const [reservas, setReservas] = useState(['loading']);
    const usuario = cookies.get('UserData');
     
    useEffect(() => {
        call(`/reservas/usuario/`+usuario.id,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[usuario.id]);

    if (reservas[0] === 'loading'){
        return(
            <Loading></Loading>
        )
    }
    if (reservas === 'undefined' || reservas.length === 0){
        return(
            <div>
            <NoElements message={"¡Aún no tienes ninguna reserva! ¿A qué esperas?"} buttonMessage={"🠮"} buttonRef={"/"}/>

            </div>
        )
    }


    return(
        <Wrapper>
            <Leyenda></Leyenda>
            <Container>
              {reservas.map(reserva => (
                  <CardReservas id={reserva.id} direccion={reserva.direccion} 
                   fechaInicio={parsearFechas(reserva.fechaInicio)} fechaFin={parsearFechas(reserva.fechaFin)} precioTotal={reserva.precioTotal} estado={reserva.estado}
                 />))}
            </Container>
        </Wrapper>
    );
}