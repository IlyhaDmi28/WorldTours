import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import ClickableMap from '../general/clickableMap'
import CityEditor from './cityEditor'
import close from '../../img/close.svg'
import map from '../../img/map.png'
const token = localStorage.getItem("token");

function CountryEditor({indexOfSelectedCountry, countries}) {   
    const [indexOfSelectedCity, setIndexOfSelectedCity] = useState(-1);
    const [isOpenCityEditor, setIsOpenCityEditor] = useState(false);
    const [isOpenCountryMap, setIsOpenCountryMap] = useState(false);

    const [country, setCountry] = useState({
        id: null,
        name: null,
        flagUrl: null,
        mainDescription: null,
        lat: null,
        lng: null,
        cities: []
    });

    useEffect(() => {
        const getData = async () => {
            try {
                let response;

                response = await axios.get(`https://localhost:7276/direction/country_for_editor?countryId=${countries[indexOfSelectedCountry].id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                const countryData = response.data;
                setCountry(countryData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

    const openCityEditor = (index) => {
        setIndexOfSelectedCity(index);
        setIsOpenCityEditor(true);
    }
    
    const closeCityEditor = () => {
        setIndexOfSelectedCity(-1);
        setIsOpenCityEditor(false);
    }


    const changeCountry = (e) => {
        const { name, value } = e.target;
        setCountry((prevCountry) => ({
            ...prevCountry,
            [name]: value,
        }));
    };

    return (
        <div className="country-editor">
            <div className='country'>
                <div className='country-editor-info'>
                    <img className='country-editor-flag' src={country.flagUrl}/>
                    <TextField
                        className='country-editor-name-input' 
                        name='name'
                        placeholder='Название'
                        type="search" 
                        variant="standard"
                        value={country.name}
                        onChange={changeCountry}
                    />
                    <img className='country-editor-map' src={map} onClick={() => setIsOpenCountryMap(true)}/>
                    <Modal open={isOpenCountryMap} onClose={() => setIsOpenCountryMap(false)} className='hotel-map-on-modal'>
                        <ClickableMap 
                            lat={country.lat} 
                            lng={country.lng}
                            setLocation={setCountry}
                        />
                    </Modal>
                </div>

                <div className="country-editor-desription">
                    <div><b>Общее описание</b></div>
                    <TextField className='country-editor-desription-input'
                        name="mainDescription"
                        multiline
                        value={country.mainDescription}
                        rows={7}
                        maxRows={20}
                        placeholder='Описание'
                        onChange={changeCountry}
                    />
                </div>
                <Button className='save-country-button'variant="contained">Сохранить</Button>
            </div>
            <div className='cities-list'>
                {country.cities.map((city, index) => (
                    <div className='city-card' onClick={() => openCityEditor(index)}>
                        <b>
                            {city.name}
                        </b>
                    </div>
                ))}
            </div>

            <Modal className='city-modal' open={isOpenCityEditor} onClose={closeCityEditor} >
				<CityEditor indexOfSelectedCity={indexOfSelectedCity} cities={country.cities} closeModal={closeCityEditor}/>
			</Modal>
            

        </div>
    );
}

export default CountryEditor;
