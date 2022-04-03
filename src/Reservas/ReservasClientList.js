import React, { Component } from 'react';
import ListComponent from '../components/ListComponent'
import call from '../Util/Caller';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ReservasList extends Component{
    constructor(props){
        super(props);
        this.state = {reservas: []};
    }

    componentDidMount(){
        const usuario = cookies.get('UserData');
        call(`/reservas/usuario/`+usuario.id,"GET")
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