import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import Plaza from './/components/Plaza'



const MapView = () => {
    

    const [state, setstate] = useState({
        currentLocation: {lat: '37.38406547983248', lng: '-15.970668744392564'}
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setstate({
                    currentLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    } 
                })
                console.log(state.currentLocation)
            }, 
            function (error) {
                console.log(error)
            }
        )
      }, [])

    return(
    <MapContainer center = {state.currentLocation} zoom={18}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
         <Plaza />
    </MapContainer>
    );
};

export default MapView;