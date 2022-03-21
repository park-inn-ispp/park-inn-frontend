import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';


function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={iconLocation}>
      </Marker>
    );
  }


const MapView = () => {
    
    return(
    <MapContainer center = {{lat: '37.359555663066864', lng: '-5.98625077322988'}} zoom={17}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
      <LocationMarker />
    </MapContainer>   
    );
};

export default MapView;