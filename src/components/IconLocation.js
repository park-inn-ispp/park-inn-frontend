import L from 'leaflet';


const iconLocation = new L.Icon({
    iconUrl: require('../resources/myPosition.png'),
    iconRetinaUrl: require('../resources/myPosition.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
});

export { iconLocation };
