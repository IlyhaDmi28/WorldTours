import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import '../../../node_modules/leaflet/dist/leaflet.css';


function ClickableMap() {
  const [markerPosition, setMarkerPosition] = useState([55.751244, 37.618423]);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]); // Устанавливаем координаты маркера
      },
    });
    return null;
  }

  return (
    <MapContainer className="clickable-map" center={markerPosition} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <MapClickHandler />

      <Marker position={markerPosition} />
    </MapContainer>
  );
}

export default ClickableMap;