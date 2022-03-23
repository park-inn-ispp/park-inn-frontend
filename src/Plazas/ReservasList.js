import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListComponent from '../components/ListComponent'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class ReservasList extends Component {

    constructor(props) {
        super(props);
        this.state = {reservas: []};
       // this.remove = this.remove.bind(this);
    }
    
    componentDidMount() {
        fetch('https://park-inn-ispp-be.herokuapp.com/reservas/usuario/1')
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



