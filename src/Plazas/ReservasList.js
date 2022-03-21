import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListComponent from '../components/ListComponent'
class ReservasList extends Component {

    constructor(props) {
        super(props);
        this.state = {reservas: []};
       // this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('https://park-inn-ispp-be.herokuapp.com/propietarios/reservas/all')
            .then(response => response.json())
            .then(data =>{ this.setState({ reservas: data})});
    }


    
        
        render() {       

        return (
            

                <ListComponent 
                header={"estado"} 
                data={this.state.reservas} 
                attributes={[{position:1,val:'id'},{position:2,val:'estado'},{position:3,val:'precioTotal'},{position:4,val:'fechaInicio'},{position:5,val:'fechaFin'},{position:6,val:'fechaSolicitud'},{position:7,val:'comentarios'},{position:8,val:'incidencias'}]} 
                headers={['id','estado','precioTotal','fechaInicio','fechaFin', 'fechaSolicitud', 'comentarios','incidencias']}
                />
                );
        
    }

}
export default ReservasList;



