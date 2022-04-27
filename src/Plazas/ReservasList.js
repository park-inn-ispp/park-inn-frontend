import React, { Component } from 'react';
import ListComponent from '../components/ListComponent'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import call from '../Util/Caller';
class ReservasList extends Component {

    constructor(props) {
        super(props);
        this.state = {reservas: []};
    }
    
    componentDidMount() {
        
        call(`/reservas/all`,"GET") 
            .then(response => response.json())
            .then(data =>{ this.setState({ reservas: data})});
    }
        render() {       

        return (
            
                <div>
                <ReactNotifications />
                <ListComponent 
                header={"estado"} 
                data={this.state.reservas} 
                attributes={[{position:1,val:'id'},{position:2,val:'estado'},{position:3,val:'precioTotal'},{position:4,val:'fechaInicio'},{position:5,val:'fechaFin'},{position:6,val:'fechaSolicitud'},{position:7,val:'comentarios'},{position:8,val:'incidencias'}]} 
                headers={['id','estado','precioTotal','fechaInicio','fechaFin', 'fechaSolicitud', 'comentarios','incidencias']}
                />
                 </div> 
                );
            
        
    }

}
export default ReservasList;



