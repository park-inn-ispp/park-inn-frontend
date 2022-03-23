import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListComponent from '../components/ListComponent'

class ReservasList extends Component{
    constructor(props){
        super(props);
        this.state = {reservas: []};
    }

    componentDidMount(){
        fetch('https://parkinn-api-v1.herokuapp.com/reservas/all')
        .then(response => response.json())
        .then((data) => {
            this.setState({reservas: data})
        });
    }

    render(){
        return(
            <ListComponent
                header={"fechaSolicitud"}
                data={this.state.reservas}
                attributes={[{position:1,val:'id'},{position:2,val:'fechaInicio'},{position:3,val:'fechaFin'}, {position:4,val:'plaza.direccion'}]} 
                headers={['id', 'fechaInicio', 'fechaFin', 'direccion']}
                />
        );
    }
}
export default ReservasList;