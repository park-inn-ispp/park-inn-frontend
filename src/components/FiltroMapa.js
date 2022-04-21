import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import L from 'leaflet';
import GeoJSON from 'geojson';
import call from '../Util/Caller';

export default function Submit(precioHora){
    const [plazas, setPlazas] = useState([]);
    const map = useMap();

    useEffect(() => {
      const Plazas = async () => {
          const data = await call('/plazas/all', 'GET');
          const plazas = await data.json()
          setPlazas(plazas);
      }
      Plazas();
    
      
    }, []);
  
    let dataFilter = plazas.filter(p => p.precioHora > precioHora);
    let geojson = GeoJSON.parse(dataFilter, {Point: ['latitud', 'longitud'],include: ['id', 'precioHora', 'fianza']});
    
      L.geoJSON(geojson, {
        onEachFeature: function(feature, layer){
          layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
        }
      }).addTo(map)
  }