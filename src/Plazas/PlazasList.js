import call from '../Util/Caller';
import Cookies from 'universal-cookie';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import GeneralButton from '../components/GeneralButton/GeneraButton';
import {Enlace} from "../Plazas/PlazasList.elements"
import Card from '../components/Card';
import image1 from "../assets/no-image-available-icon-6.jpg";

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
                <h2>No tienes ninguna plaza creada aún</h2>
                <GeneralButton content={<Enlace to="/plaza/create">Crear nueva plaza </Enlace>}></GeneralButton>
            </div>
            )
        }


        return (
            <div>
                <GeneralButton content={<Enlace to="/plaza/create">Crear nueva plaza </Enlace>}></GeneralButton>

            <div className="container d-flex justify-content-center align-items-center h-100">

            <div className="row">
                
              {plazas.map(plaza => (
                  
                <div className="col-md-4" key={plaza.id}>
                  <Card imageSource={image1} title={plaza.direccion} ancho={plaza.ancho} largo ={plaza.largo} precioHora={plaza.precioHora} esAireLibre={plaza.esAireLibre ? 'Si' : 'No' } urlEdit={plaza.editURL} urlReserva={plaza.reservasURL} urlHorario={plazas.horarioURL}/>
                </div>
              ))}
            </div>
          </div>
          </div>
        );
}

    
