import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';
import L from 'leaflet'
import garages from '../assets/plazas_ejemplo.json'
import axios from 'axios';
import { map } from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl: require('../resources/logoSinFondo.png'),
    iconRetinaUrl: require('../resources/logoSinFondo.png'),
    iconAnchor: null,
    popupAnchor: [0, -40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.point(90, 90),
});

let prueba = 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson';



function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
  
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));

        fetch(
          prueba
          ).then(
            res => res.json()
          ).then(
            data => L.geoJSON(data).addTo(map)
          ).catch(error => console.error('Error:', error))


        const parksGeoJson = new L.GeoJSON(garages, {
          onEachFeature: (feature = {} , layer) => {
            const { properties = {} } = feature;
            if (!properties.Precio_hora ) return;
            layer.bindPopup('<h1>' + properties.Precio_hora + ' €' + '</h1> <a href="/reserva-plaza"><button>Reservar plaza</button></a>');
          }
        });
        parksGeoJson.addTo(map);
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

export default MapView