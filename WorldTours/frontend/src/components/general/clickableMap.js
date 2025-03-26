import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Обязательно подключи стили


const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41], // Размер иконки (по умолчанию)
  iconAnchor: [12, 41], // Смещение относительно точки на карте
  popupAnchor: [1, -34], 
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41], 
});

function ClickableMap({lat, lng, setLocation}) {
  	function MapClickHandler() {
    	useMapEvents({
      		click(e) {
				if(setLocation !== undefined) {
					setLocation((prevHotel) => {return {
						...prevHotel,
						lat: e.latlng.lat,
						lng: e.latlng.lng
					}}); 
	
					axios
					.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
					.then((response) => {
						setLocation((prevHotel) => {return {
							...prevHotel,
							address: response.data.display_name
						}}); 
					})
					  .catch((error) => console.error("Ошибка геокодирования:", error));
				}
      		},
    	});
    	return null;
  	}

  return (
    <MapContainer className="clickable-map"  center={[lat, lng]} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <MapClickHandler />

      <Marker position={[lat, lng]} icon={customIcon} />
    </MapContainer>
  );
}

export default ClickableMap;