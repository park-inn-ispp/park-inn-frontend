import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
import { BsWindowSidebar } from "react-icons/bs";
import ListaMisReservas from "../components/TablaMisReservas";
import '../components/table.css'
const cookies = new Cookies();


export default function ReservaOwnerList(){
    let navigate = useNavigate();

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
        <div className="table-users">
            <div className="header">Mis reservas</div>
        
            <ListaMisReservas data={reservas}/>
        
        </div>
        </div>
    );

}