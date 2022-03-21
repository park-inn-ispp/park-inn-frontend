import MapView from './components/react-leaflet';
import './App.css';
import Buscador from './components/Buscador';
import {RemoveScrollBar} from 'react-remove-scroll-bar';


export default function Home(){
    return (
        <div className='App'>
            <RemoveScrollBar />
            <Buscador/>     
            <MapView /> 
        </div>
    )

}