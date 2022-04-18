import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';
import L from 'leaflet';
import GeoJSON from 'geojson';
import call from '../Util/Caller';
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

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const [plazas, setPlazas] = useState([]);

    const map = useMap();


    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
        call(`/plazas/all`,"GET")
          .then(res => res.json())
          .then(
            data => GeoJSON.parse(data, {Point: ['latitud', 'longitud'],include: ['id', 'precioHora', 'fianza']})
          ).then(data => {

            var menosDe2 = L.geoJSON(data, { 
              onEachFeature: function(feature, layer){
                layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
              },
              filter: function(feature) { return (feature.properties.precioHora > 0 && feature.properties.precioHora <=1.99) }
            });
        
            var entre2Y5 = L.geoJSON(data, { 
              onEachFeature: function(feature, layer){
                layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
              },
              filter: function(feature) { return (feature.properties.precioHora > 1.99 && feature.properties.precioHora <=5.00) }
            });
        
            var masDe5 = L.geoJSON(data, { 
              onEachFeature: function(feature, layer){
                layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
              },
              filter: function(feature) { return feature.properties.precioHora > 5.00 }
            });

            var todas = L.geoJSON(data, { 
              onEachFeature: function(feature, layer){
                layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
              },
            });
        
        
            var baseMaps = {
              "Todo": todas,
          };
          
          var overlayMaps = {
              "Menos 2€": menosDe2,
              "2€-5€": entre2Y5,
              "Mas 5€": masDe5
          };

          L.control.layers(baseMaps, overlayMaps,{
            position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
            collapsed: true // true
        }).addTo(map);
        }).catch(error => console.error("Error: ",error));

      });
    }, [map]);


    return position === null ? null : (
      <Marker position={position} icon={iconLocation}>
      </Marker>
    );
  }


const MapView = () => {
  const position = [51.505, -0.09]
    return(
    <MapContainer center={position} zoom={15}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         />
      <LocationMarker />
    </MapContainer>   
    );
};

export default MapView