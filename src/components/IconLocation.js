import L from 'leaflet';

const iconLocation = new L.Icon({
    iconUrl: require('../resources/mylocation_icon.png'),
    iconRetinaUrl: require('../resources/mylocation_icon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
});

export { iconLocation };
