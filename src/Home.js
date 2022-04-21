import React, { useState } from "react";
import MapView from './components/react-leaflet';
import './App.css';
import {RemoveScrollBar} from 'react-remove-scroll-bar';


export default function Home(){

    


    return (
        <div className='App'>
            <RemoveScrollBar />  
            <MapView/>
            
        </div>
    )

}
