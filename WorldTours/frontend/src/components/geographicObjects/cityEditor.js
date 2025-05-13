import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import ClickableMap from '../general/clickableMap'
import close from '../../img/close.svg'
import map from '../../img/map.png'
const token = localStorage.getItem("token");

function CityEditor({indexOfSelectedCity, cities, setCityToCountry, countryId, closeModal}) {   
    const [isOpenCityMap, setIsOpenCityMap] = useState(false);
    const [isOpenLandmarkEditor, setIsOpenLandmarkEditor] = useState(false);
    const [editedLandmark, setEditedLandmark] = useState('');
    const [climates, setClimates] = useState([]);
    const [city, setCity] = useState(indexOfSelectedCity !== -1 ? cities[indexOfSelectedCity] : {
        id: 0,
        name: '',
        mainDescription: null,
        lat: 50,
        lng: 50,
        climateId: 1,
        countryId: countryId,
        landmarks: []
    });
    

    useEffect(() => {
        const getData = async () => {
            try {
                let response;

                response = await axios.get(`https://localhost:7276/direction/climates`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                const climatesData = response.data;
                setClimates(climatesData);
                
                // setCity()
                // if(indexOfSelectedCity !== -1) {
                    
                // }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

    const changeCity = (e) => {
        const { name, value } = e.target;
        setCity((prevCity) => ({
            ...prevCity,
            [name]: value,
        }));
    };

    const removeLandmark = (index) => {
        setCity((prevCity) => ({
            ...prevCity,
            landmarks: prevCity.landmarks.filter((_, i) => index !== i),
        }));
    };

    const saveCity = async () => {
        const cityData = city;

        if(countryId !== 0 && countryId !== null) {
            cityData.lat = cityData.lat.toString().replace(".", ",");
            cityData.lng = cityData.lng.toString().replace(".", ",");
            if(city.id === 0) {
                await axios.post('https://localhost:7276/direction/add_city', cityData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                });
            }
            else {
                await axios.put('https://localhost:7276/direction/edit_city', cityData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    }
                });
            }
            cityData.lat = +cityData.lat.toString().replace(",", ".");
            cityData.lng = +cityData.lng.toString().replace(",", ".");
        }

        setCityToCountry(city);
        closeModal();
    }

    return (
        <div className="city-editor">
            <button className="close-modal-editor-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Редактор города</h2>

            <div className='city-editor-info'>
                <TextField
                    className='city-editor-name-input' 
                    name='name'
                    label='Название'
                    type="search" 
                    variant="standard"
                    value={city.name}
                    onChange={changeCity}
                    // InputLabelProps={{
                    //     shrink: true
                    // }}
                />
                <img className='city-editor-map' src={map} onClick={() => setIsOpenCityMap(true)}/>
                <Modal open={isOpenCityMap} onClose={() => setIsOpenCityMap(false)} className='hotel-map-on-modal'>
                    <ClickableMap 
                        lat={city.lat} 
                        lng={city.lng}
                        setLocation={setCity}
                    />
                </Modal>
            </div>

            <div className='city-editor-climate'>
                <div><b>Климат</b></div>
                <Select className='city-editor-climate-select' name="climateId" value={city.climateId} onChange={changeCity}>
                    {climates.map((climate) => (
                        <MenuItem value={climate.id}>
                            {climate.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            <div className="city-editor-desription">
                <div><b>Общее описание</b></div>
                <TextField className='city-editor-desription-input'
                    name="mainDescription"
                    multiline
                    value={city.mainDescription}
                    rows={5}
                    maxRows={20}
                    placeholder='Описание'
                    onChange={changeCity}
                />
            </div>

            <div className='city-editor-landmarks'>
                <h3>Достопримечательности</h3>
                <hr></hr>
                <div>
                    {city.landmarks.map((landmark, index) => (
                        <div className='city-editor-landmark'>
                            {landmark.name} <ClearIcon className='remove-city-landmark-button' onClick={() => removeLandmark(index)}/>
                        </div>
                    ))}
                   <AddIcon onClick={() => setIsOpenLandmarkEditor(true)}/>
                   <Dialog
                        open={isOpenLandmarkEditor}
                        onClose={() => {setIsOpenLandmarkEditor(false)}}
                        slotProps={{
                            paper: {
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();

                                    setCity((prevCity) => {

                                        return {
                                            ...prevCity,
                                            landmarks: [...prevCity.landmarks, {id: 0, name: editedLandmark}]
                                        }
                                    });
                                    setEditedLandmark('');
                                    setIsOpenLandmarkEditor(false);
                                },
                            },
                        }}
                    >
                        <DialogTitle>
                            {"Введите название достопримечательности"}
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Название"
                                sx={{marginTop: '5px', width: '100%'}}
                                value={editedLandmark}
                                type="search" 
                                variant="standard"
                                onChange={(e) => {
                                    setEditedLandmark(e.target.value)
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {setIsOpenLandmarkEditor(false)}} autoFocus>
                                Зарыть
                            </Button>
                            <Button type="submit" autoFocus>
                                Сохранить
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            
            <hr></hr>

            <div className='modal-editor-controller'>
                <button>Очистить</button>
                <button onClick={saveCity}>
                    Сохранить
                </button>
            </div>
        </div>
    );
}

export default CityEditor;
