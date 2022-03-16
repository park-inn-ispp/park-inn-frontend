import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import { Marker } from 'react-leaflet';
import {  iconLocation  } from './components/IconLocation';



const MapView = () => {
    

    return(
    <MapContainer center = {{lat: '37.38406547983248', lng: '-5.970668744392564'}} zoom={17}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
        <Marker
            position={{lat: '37.38406547983248', lng: '-5.970668744392564'}}
            icon={ iconLocation }
        >
      </Marker>
    </MapContainer>
    );
};

export default MapView;