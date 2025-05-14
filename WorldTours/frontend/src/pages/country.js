
import '../styles/country.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Header from '../components/general/header';
const token = localStorage.getItem("token");

function Country() {   
    const location = useLocation();
    const [isOpenCountryMap, setIsOpenCountryMap] = useState(false);
    const [flagUrl, setFlagUrl] = useState('');
    const [center, setCenter] = useState(null);
    const [country, setCountry] = useState({
        id: 0,
        name: '',
        mainDescription: '',
        levelOfDevelopment: 1,
        lat: 50,
        lng: 50,
        region: '',
        cities: []
    });

    
    useEffect(() => {
        const getData = async () => {
            try {
                const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

                let response;
                response = await axios.get(`https://localhost:7276/direction/country?countryId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                const countryData = response.data;
                setCountry(countryData);
                setFlagUrl(countryData.flagUrl);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

    useEffect(() => {
        if (country?.lat && country?.lng) {
            setCenter([country.lat, country.lng]);
        }
    }, [country]);
    
    const getLevelOfDevelopmentName = (id) => {
        switch(id) {
            case 0: return 'Бедная';
            case 1: return 'Развивающаяся';
            case 2: return 'Развитая';
            case 3: return 'Высокоразвитая';
            default: return 'Неудалось определить';
        }
    } 

    return (
        <div className="country narrow-conteiner">
            <Header />
            <div className="line-under-header"></div>
            
            <div className='vertical-list-page'>
                <div className='country-flag-and-name'>
                    <img 
                        className='country-editor-flag' 
                        src={flagUrl}
                    />
                    <b className='country-name'>{country.name}</b>
                </div>

                <div className='country-info'>
                    <div><b>Регион</b>: {country.region}</div>
                    <div><b>Уровень развития</b>: {getLevelOfDevelopmentName(country.levelOfDevelopment)}</div>
                </div>

                <div className="country-desription">
                    {country.mainDescription}
                </div>

                {center ? (
                    <MapContainer className='country-map' center={center} zoom={5} key={center.join(",")}>
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

                <div className='cities'>
                    <b>Города: </b>
                    <div className='cities-list'>
                        {country.cities.map((city) => (
                            <div className='city-card'>
                                <Link to={`/city/${city.id}`}>
                                    <b>
                                        {city.name}
                                    </b>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Country;
