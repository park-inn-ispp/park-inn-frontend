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
      const id = this.props.match.params.id;
	 this.fetchData(id);
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
                attributes={[{position:1,val:'id'},{position:2,val:'estado'},{position:3,val:'precioTotal'},{position:4,val:'fechaInicio'},{position:5,val:'fechaFin'},{position:6,val:'fechaSolicitud'},{position:7,val:'comentarios'},{position:8,val:'incidencias'}]} 
                headers={['id','estado','precioTotal','fechaInicio','fechaFin', 'fechaSolicitud', 'comentarios','incidencias']}
                />
        );
    }
}
export default ReservasOwnerList;
