import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom'


class ReservaDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {details: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:8080/reserva/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({details: data}));
    }

    async remove(id) {}
    
    render() {
        const {details, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <div><h3 class= "MainTitle">Reserva {details.name}</h3></div>

                <Container fluid>
                    <div class="Details">
                        Estado:{details.estado}<p/>
                        Precio total:{details.precioTotal}<p/>
                        Fecha de inicio:{details.fechaInicio}<p/>
                        Fecha de fin:{details.fechaFin}<p/>
                        Fecha de solicitud:{details.fechaSolicitud}<p/>
                        Comentarios: {details.comentarios}
                    </div>
                </Container>
            </div>
        );
    }
}

export default ReservaDetails;