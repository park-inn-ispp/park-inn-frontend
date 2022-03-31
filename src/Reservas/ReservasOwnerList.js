import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListComponent from '../components/ListComponent'
import call from '../Util/Caller';
class ReservasOwnerList extends Component{
    constructor(props){
        super(props);
        this.state = {reservas: []};
    }

    componentDidMount(){
        call(`/reservas/plaza/${id}`,"GET")
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
                attributes={[{position:1,val:'id'},{position:2,val:'fechaInicio'},{position:3,val:'fechaFin'}, {position:4,val:'plaza.direccion'}, {position:5,val:'user.name'}. {position:6,val:'comentarios'}]} 
                headers={['id', 'fechaInicio', 'fechaFin', 'direccion', 'nombre','comentarios']}
                />
        );
    }
}
export default ReservasOwnerList;
