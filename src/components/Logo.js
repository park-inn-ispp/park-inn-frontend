import logo from '../resources/logoSinFondo.png'
import styled from 'styled-components'

const Img = styled.img`
    width: 250px;
    height: 250px;

    @media screen and (max-width: 800px){
        width: 200px;
        height: 200px;
    }
`;

export default function Logo(){
    return <Img alt="Logo" src={logo}/>
}