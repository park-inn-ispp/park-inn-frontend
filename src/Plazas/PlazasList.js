import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ListComponent from '../components/ListComponent'
class PlazasList extends Component {

    constructor(props) {
        super(props);
        this.state = {plazas: []};
        //this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        fetch('https://park-inn-ispp-be.herokuapp.com/plazas/all')
            .then(response => response.json())
            .then((data) =>{
                this.setState({plazas: data})
                
            });
    }
    
    render() {       

        return (
                <ListComponent 
                    header={"direccion"} 
                    data={this.state.plazas} 
                    attributes={[{position:1,val:'id'},{position:2,val:'direccion'},{position:3,val:'largo'},{position:4,val:'fianza'}]} 
                    headers={['id','direccion','largo','fianza']}
                />
        );
    }
}
export default PlazasList;
