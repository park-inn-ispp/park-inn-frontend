import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListReserva from '../components/ListReserva'

class ReservasList extends Component{
    constructor(props){
        super(props);
        this.state = {reservas: []};
    }

    componentDidMount(){
        fetch('https://park-inn-ispp-be.herokuapp.com/reservas/usuario/1')
        .then(response => response.json())
        .then((data) => {
            this.setState({reservas: data})
        });
    }

    render(){
        return(
            <ListReserva
                header={"fechaSolicitud"}
                data={this.state.reservas}
                attributes={[{position:1,val:'id'},{position:2,val:'fechaSolicitud'},{position:3,val:'fechaInicio'},{position:4,val:'fechaFin'}]} 
                headers={['id', 'fechaSolicitud', 'fechaInicio', 'fechaFin']}
                />
        );
    }
}
export default ReservasList;