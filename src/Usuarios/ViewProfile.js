import call from "../Util/Caller";
import {useEffect, useState} from "react";
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import Cookies from 'universal-cookie';
import { Etiqueta, Parrafo } from "../Usuarios/ViewProfileElements";
import { StyledButton } from "../components/GeneralButton/GeneralButton.elements";

const cookies = new Cookies();

export default function ViewProfile(){

    const[user, setUser] = useState(['loading']);
    const usuario = cookies.get('UserData');
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
        <div className="form-style-10">
            <h1>Consultar perfil</h1>
                <div className="Details">
                    <Etiqueta>Nombre</Etiqueta><p/>
                    <Parrafo>{user.name}</Parrafo><p/>
                    <Etiqueta>Apellidos</Etiqueta><p/>
                    <Parrafo>{user.surname}</Parrafo><p/>
                    <Etiqueta>Email</Etiqueta><p/>
                    <Parrafo>{user.email}</Parrafo><p/>
                    <Etiqueta>Número de teléfono:</Etiqueta><p/>
                    <Parrafo>{user.phone}</Parrafo><p/>
                    <StyledButton type="button" onClick={() => navigate(`/clients/${id}/edit`)}>Editar perfil</StyledButton>
                </div>
        </div>
    )
}