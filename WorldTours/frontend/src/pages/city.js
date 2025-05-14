import '../styles/city.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Header from '../components/general/header';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ClickableMap from '../components/general/clickableMap'
import map from '../img/map.png'
const token = localStorage.getItem("token");

function City() {   
    const location = useLocation();
    const [center, setCenter] = useState(null);
    const [city, setCity] = useState({
        id: 0,
        name: '',
        mainDescription: null,
        lat: 50,
        lng: 50,
        climate: '',
        country: '',
        landmarks: []
    });

    
    useEffect(() => {
        const getData = async () => {
            try {
                const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

                let response;
                response = await axios.get(`https://localhost:7276/direction/city?cityId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                const cityData = response.data;
                setCity(cityData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

    useEffect(() => {
        if (city?.lat && city?.lng) {
            setCenter([city.lat, city.lng]);
        }
    }, [city]);

    return (
        <div className="city narrow-conteiner">
            <Header />
            <div className="line-under-header"></div>
            
            <div className='vertical-list-page'>
                <div className='city-name'>
                    <b>{city.name}</b>
                </div>

                <div className='city-info'>
                    <div><b>Страна</b>: {city.country}</div>
                    <div><b>Климат</b>: {city.climate}</div>
                </div>
                {
                    city.landmarks.length !== 0 &&
                    <div className='landmarks'>
                        <b>Достопримечательности: </b>
                        <span>
                            {city.landmarks.join(", ")}
                        </span>
                    </div>
                }

                <div className="city-desription">
                    {city.mainDescription}
                </div>

                {center ? (
                    <MapContainer className='city-map' center={center} zoom={5} key={center.join(",")}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker 
                            position={center} 
                            icon={ new L.Icon({
                                iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34], 
                                shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                                shadowSize: [41, 41], 
                            })}
                        />
                    </MapContainer>
                ) : <p>Загрузка карты...</p>}
            </div>
        </div>
    );
}

export default City;
