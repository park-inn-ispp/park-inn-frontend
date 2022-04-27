import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import ListaMisReservas from "../components/TablaMisReservas";
import '../components/table.css'
import { Cover, Reserva } from "../components/TabalMisReservas.elemnts";


export default function ReservaOwnerList(){
    const id = useParams().id;
    const [reservas, setReservas] = useState(['loading']);
     
    useEffect(() => {
        call(`/reservas/plaza/${id}`,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[id]);

    if (reservas[0] === 'loading'){
        return(
            <Loading></Loading>
        )
    }
    if (reservas === 'undefined' || reservas.length === 0){
        return(
            <div className="container-tabla">

            <h2>Esta plaza no existe, no está disponible en este momento o no tiene reservas asociadas</h2>
            </div>

        )
    }

    return(
        <div className="container-tabla">
            <Cover>
            <Reserva>Reservas</Reserva>
            <ListaMisReservas data={reservas}/>
            </Cover>
        </div>
    );

}