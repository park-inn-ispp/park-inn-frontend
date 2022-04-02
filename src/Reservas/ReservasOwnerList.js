import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ReservaOwnerList(){
    const id = useParams().id;
    const [reservas, setReservas] = useState();

    console.log(id);
    useEffect(() => {
        call(`/reservas/plaza/${id}`,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[id]);
    console.log(reservas);

    return(
        <div>
            <h1>Reservas</h1>
            <ListComponent
                header={"Reservas de plazas"} 
                data={reservas} 
                attributes={[{position:1,val:'fechaInicio'},{position:2,val:'fechaFin'},{position:3,val:'fechaSolicitud'}]} 
                headers={['Fecha Inicio', 'Fecha Fin', "Fecha Solicitud"]} 
            />
        </div>
    );
}