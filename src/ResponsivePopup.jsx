import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import R from "leaflet-responsive-popup";
import "leaflet-responsive-popup/leaflet.responsive.popup.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.5.0/dist/images/marker-shadow.png"
});

const ResponsivePopup = () => {
  const { map } = useLeaflet();

  useEffect(() => {
    const marker = L.marker([51.5, -0.09], { icon });
    const popup = R.responsivePopup({
      hasTip: true,
      autoPan: true,
      offset: [15, 20]
    }).setContent("A pretty CSS3 responsive popup.<br> Easily customizable.");

    marker.addTo(map).bindPopup(popup);
  }, [map]);
  return null;
};

export default ResponsivePopup;
