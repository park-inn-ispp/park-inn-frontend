import ListComponent from "../components/ListComponent";
import call from "../Util/Caller";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";

export default function ReservaOwnerList(){
    const id = useParams().id;
    const [reservas, setReservas] = useState(['loading']);
     
    console.log(id);
    useEffect(() => {
        call(`/reservas/plaza/${id}`,"GET")
        .then(response => response.json())
        .then((res) => setReservas(res));
    },[id]);
    console.log(reservas);
    if (reservas[0] === 'loading'){
        return(
            <Loading></Loading>
        )
    }
    if (reservas === 'undefined' || reservas.length === 0){
        return(
            <h2>Esta plaza no existe o no está disponible en este momento</h2>
        )
    }
    return(
        <div>
            <h1>Reservas</h1>
            <ListComponent
                header={"id"} 
                data={reservas} 
                attributes={[{position:1,val:'estado'},{position:2,val:'fechaInicio'},{position:3,val:'fechaFin'},{position:4,val:'fechaSolicitud'},{position:5,val:'precioTotal'}]} 
                headers={['Estado', 'Fecha Inicio', 'Fecha Fin', "Fecha Solicitud", "Precio"]} 
            />
        </div>
    );
}