import Plaza_Icon from '../assets/plaza_icon.svg'
import L from 'leaflet'

export const IconLocation = L.icon(
    {iconUrl:require("../assets/plaza_icon.svg"),
    iconRetinaUrl: require("../assets/plaza_icon.svg"),
    iconSize: [35, 35],
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: "Leaflet-venue-icon",
})
