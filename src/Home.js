import  { useEffect } from 'react';
import MapView from './components/react-leaflet';
import './App.css';
import Buscador from './components/Buscador';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default function Home(){
    useEffect(() => {
        if(!cookies.get('email')){
          window.location.href="./login";
        }
      }, [])
    return (
        <div className='App'>
            <RemoveScrollBar />  
            <MapView/>
            <Buscador/>
        </div>
    )

}
