import ListComponent from '../components/ListComponent'
import call from '../Util/Caller';
import {useEffect} from "react";
import {useParams} from "react-router-dom"

export default function ReservaOwnerList(){
    const id = useParams();
    useEffect(() => {
        call(`/reservas/plaza/${id}`,"GET")
        .then(response => response.json())
    });
    
    return(
        <ListComponent
            header={"fechaSolicitud"}
            data={this.state.reservas}
            attributes={[{position:1,val:'id'},{position:2,val:'fechaInicio'},{position:3,val:'fechaFin'}, {position:4,val:'plaza.direccion'}]} 
            headers={['id', 'fechaInicio', 'fechaFin', 'direccion']}
            />
    );
}