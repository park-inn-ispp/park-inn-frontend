import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';  
import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';
import L from 'leaflet';
import GeoJSON from 'geojson';
import call from '../Util/Caller';
import FilterComponent from "./FilterComponent";

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

const frameworks = ["ReactJS", "AngularJS", "VueJS", "NodeJS", "EmberJS"];

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const [plazas, setPlazas] = useState([]);

    const map = useMap();

    useEffect(() => {
      const Plazas = async () => {
          const data = await call('/plazas/all', 'GET');
          const plazas = await data.json()
          setPlazas(plazas);
      }
      Plazas();
      function onLocationFound(e) {

        L.marker(e.latlng, {icon: iconLocation}).addTo(map) 
      }
     
       map.on('locationfound', onLocationFound);    
  }, []);


  map.locate({setView: true, maxZoom: 16});
    
  let dataFilter = plazas.filter(p => p.precioHora > 10);

  let geojson = GeoJSON.parse(dataFilter, {Point: ['latitud', 'longitud'],include: ['id', 'precioHora', 'fianza']});

  L.geoJSON(geojson, {
    onEachFeature: function(feature, layer){
      layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
    }
  }).addTo(map)
  console.log(geojson)
    
  /*
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
            L.geoJSON(data, {
              onEachFeature: function(feature, layer){
                layer.bindPopup('<h5> Precio por hora: ' + layer.feature.properties.precioHora + ' €' + '</h5> <a href="/reservas/plaza/'+layer.feature.properties.id+'"><button>Reservar plaza</button></a>')
              }
            }).addTo(map)
          }
          ).catch(error => console.error("Error: ",error));

      });
    }, [map]);
*/

const [selectedFrameworks, setSelectedFrameworks] = useState([]);
 
const handleSelect = framework => {
const isSelected = selectedFrameworks.includes(framework);
const newSelection = isSelected
? selectedFrameworks.filter(currentTech => currentTech !== framework)
: [...selectedFrameworks, framework];
setSelectedFrameworks(newSelection);};

  return(
    <>
    < FilterComponent label="JS Frameworks" onSelect={() => alert(selectedFrameworks)} >
              < div className="frameworks-list" >
                  {frameworks.map((framework, index) => {
                      const isSelected = selectedFrameworks.includes(framework);
                          return (
                              < label key={index} >
                                  < input type="checkbox" checked={isSelected} onChange={() => handleSelect(framework)}/>
                                  < span className="ml-2 text-base text-gray-500 font-heading" >
                                      {framework}
                                  </span >
                              </label >   
                          ); 
                  })}
              </div >
  </FilterComponent >
  
  </>
  );
  }


const MapView = () => {

    return(
      <MapContainer center = {{lat: '37.359555663066864', lng: '-5.98625077322988'}} zoom={8}>
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       />
       <LocationMarker />
      </MapContainer>   
      
    );
};

export default MapView