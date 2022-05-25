import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import GeneralButton from '../components/GeneralButton/GeneraButton';
import {Enlace, Title, Global, Container, Wrapper, NuevaPlaza, Down} from "../Plazas/PlazasList.elements"
import Card from '../components/Card';
import NoElements from '../components/NoElements';
const cookies = new Cookies();

export default function PlazasList() {
    const [plazas, setPlazas] = useState(["Loading"]);
    const usuario = cookies.get('UserData');

    useEffect (() => {
        
            call('/plazas/plazasDelUsuario/'+usuario.id,'GET')
            .then(response => response.json())
            .then((data) =>{
                setPlazas(["Loading"]);
                var i= 0
                data.map(plazas => {
                    data[i]["editURL"]= "/plaza/edit/"+ data[i]["id"]
                    data[i]["reservasURL"]= "/mis-reservas-de-mis-plazas/plaza/"+ data[i]["id"]
                    data[i]["horarioURL"]="/disponibilidad/"+data[i]["id"]
                    i++
                    return plazas
                })
                setPlazas(data);
            })
            .catch(e =>{
                setPlazas(new Array(0))
            });
       


    }, [usuario.id])

    if (plazas[0] === 'Loading'){
        return(
            <Loading/>
        )
        }
        if (plazas[0] === 'Empty' || plazas.length === 0){
        return(
            <div>
            <NoElements message={"¡Aún no tienes ninguna plaza! ¿A qué esperas?"} buttonMessage={"->"} buttonRef={"/plaza/create"}/>

            </div>
            )
        }


        return (
            <Wrapper>
                <Down>
                    <NuevaPlaza to="/plaza/create">Crear nueva plaza</NuevaPlaza>
                </Down>
                <Container>
                    {plazas.map(plaza => (
                        <Card id={plaza.id} title={plaza.direccion} ancho={plaza.ancho} largo ={plaza.largo} precioHora={plaza.precioHora} esAireLibre={plaza.esAireLibre ? 'Si' : 'No' } urlEdit={plaza.editURL} urlReserva={plaza.reservasURL} urlHorario={plazas.horarioURL}/>
                    ))}
                </Container> 
            </Wrapper>
        );
}

    
