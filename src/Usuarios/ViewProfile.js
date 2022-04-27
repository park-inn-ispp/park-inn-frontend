import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import { Etiqueta, Parrafo, Global, Wrapper, Editar, Title } from "../Usuarios/ViewProfileElements";
import { Line } from "../Plaza/EditPlaza.elements";


export default function ViewProfile(){

    const[user, setUser] = useState(['loading']);
    const id = parseInt(useParams().id)

    let navigate = useNavigate();

    useEffect(() => {
        call(`/clients/${id}`, "GET")
        .then(response => response.json())
        .then((res) => setUser(res));
    },[id]);
    console.log(user)

    if (user[0] === 'loading'){
        return(
            <Loading></Loading>
        )
    }

    return(
        
        <Global>
            <Wrapper>
                <Title>Consultar perfil</Title>  
                <Line><Etiqueta>Nombre: </Etiqueta><Parrafo>{user.name}</Parrafo></Line>
                <Line><Etiqueta>Apellidos: </Etiqueta><Parrafo>{user.surname}</Parrafo></Line>
                <Line><Etiqueta>Correo: </Etiqueta><Parrafo>{user.email}</Parrafo></Line>
                <Line><Etiqueta>Teléfono: </Etiqueta><Parrafo>{user.phone}</Parrafo></Line>
                <Editar value="Editar" onClick={() => navigate(`/clients/edit/${id}`)}></Editar>
            </Wrapper>
        </Global>
    )
}