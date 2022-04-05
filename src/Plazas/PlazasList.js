import React, { Component } from 'react';
import ListComponentPlazas from '../components/ListComponentPlazas'
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
import Loading from '../components/Loading';
const cookies = new Cookies();

class PlazasList extends Component {

    constructor(props) {
        super(props);
        this.state = {plazas: ["Loading"]};
        //this.remove = this.remove.bind(this);
    }
    
    componentDidMount() {
        const usuario = cookies.get('UserData');
        call('/plazas/plazasDelUsuario/'+usuario.id,'GET')
            .then(response => response.json())
            .then((data) =>{
                
                
                var i= 0
                var numeroPlazas = Object.keys(data).length;
                
                data.map(plaza => {
                    data[i]["editURL"]= "/plaza/edit/"+ data[i]["id"]
                    data[i]["reservasURL"]= "/mis-reservas-de-mis-plazas/plaza/"+ data[i]["id"]
                    i++
                })
                this.setState({plazas: data})
            });
    }
    
    

    render() {       
        if(this.state.plazas[0]==="Loading"){
            return (
                <div>
                    <Loading />
                </div>)
        }else if(this.state.plazas.length===0 || this.state.plazas==="undefined"){
            return (
                <div>
                    <h2>No hay plazas asociadas a este usuario</h2>
                    <a href="plaza/create">Crear nueva plaza </a>
                </div>)
        }else{
            return (
                <div> 
                    <a href="plaza/create">Crear nueva plaza </a>
                    <ListComponentPlazas
                        header={"direccion"} 
                        data={this.state.plazas} 
                        attributes={[{position:1,val:'direccion'},{position:2,val:'precioHora'},{position:3,val:'fianza'},{position:4,val:'editURL'}, {position:5,val:'reservasURL'}]} 
                        headers={['Dirección', 'Precio hora','Fianza','Detalles', 'Reservas']}
                    />
                </div>
            );
        }

    }
}
export default PlazasList;
