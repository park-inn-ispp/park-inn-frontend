import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  



const MapView = () => {

    

    return(
    <MapContainer center = {{lat: '37.38406547983248', lng: '-5.970668744392564'}} zoom={17}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
    </MapContainer>
    );
};

export default MapView;