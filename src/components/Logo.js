import logo from '../resources/logoSinFondo.png'

export default function Logo(props){
    return <img style={{width: props.size}} alt="Logo" src={logo}/>
}