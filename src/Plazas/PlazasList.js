import React, { Component } from 'react';
import ListComponentPlazas from '../components/ListComponentPlazas'
import call from '../Util/Caller';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class PlazasList extends Component {

    constructor(props) {
        super(props);
        this.state = {plazas: []};
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
                    i++
                })
                this.setState({plazas: data})
            });
    }
    
    

    render() {       
        
        return (
            <div> 
                <a href="plaza/create">Crear nueva plaza </a>
                <ListComponentPlazas
                    header={"direccion"} 
                    data={this.state.plazas} 
                    attributes={[{position:1,val:'id'},{position:2,val:'direccion'},{position:3,val:'largo'},{position:4,val:'fianza'},{position:5,val:'editURL'}]} 
                    headers={['id','direccion','largo','fianza','Detalles']}
                />
            </div>
        );
    }
}
export default PlazasList;
