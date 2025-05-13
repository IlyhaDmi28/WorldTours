import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
    const [regions, setRegions] = useState([]);
    const [indexOfSelectedCity, setIndexOfSelectedCity] = useState(-1);
    const [indexOfHoverCity, setIndexOfHoverCity] = useState(-1);
    const [isOpenCityEditor, setIsOpenCityEditor] = useState(false);
    const [isOpenCountryMap, setIsOpenCountryMap] = useState(false);
    const [countryHasFlag, setCountryHasFlag] = useState(false);
    const [isChangeFlag, setIsChangeFlag] = useState(false);
    const flagFile = useRef(null); // <-- здесь ref создается правильно
    const [flagUrl, setFlagUrl] = useState('');

    const [country, setCountry] = useState({
        id: 0,
        name: '',
        mainDescription: '',
        levelOfDevelopment: 1,
        lat: 50,
        lng: 50,
        regionId: 1,
        cities: []
    });

    useEffect(() => {
        const getData = async () => {
            try {
                let response;
                response = await axios.get(`https://localhost:7276/direction/regions`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				const regionsData = response.data;
				console.log(regionsData);
				setRegions(regionsData);
                
                console.log(indexOfSelectedCountry);
                if(indexOfSelectedCountry !== -1) {

                    response = await axios.get(`https://localhost:7276/direction/country_for_editor?countryId=${countries[indexOfSelectedCountry].id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });

                    const countryData = response.data;
                    setCountry(countryData);
                    setFlagUrl(countryData.flagUrl);
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);
    
    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectFlag = () => {
        flagFile.current.click();
    };
    
    const changeFlag = (e) => {
        const file = e.target.files[0]; // Берем первый файл из input

        if (file) {
            setFlagUrl(URL.createObjectURL(file));
            setIsChangeFlag(true);
        }

		// if (file) {
		// 	setCountry((prevCountry) => ({
        //         ...prevCountry,
        //         flagFile: file, // Сохраняем файл в состоянии
		// 	}));

		// }
    };


    const openCityEditor = (index) => {
        console.log(index);
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

    const deleteCity = async (deletedCity) => {
        if(indexOfSelectedCountry !== -1) {
            await axios.delete(`https://localhost:7276/direction/delete_city?cityId=${deletedCity.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });
        }

        setCountry((prevCountry) => {
            return {
                ...prevCountry,
                cities: prevCountry.cities.filter(city => city !== deletedCity)
            }
        })
	}

    const setCityToCountry = async (city) => {
        if(indexOfSelectedCity !== -1) {
            const newCities = country.cities.map((c, index) => index === indexOfSelectedCity ? city : c);

            setCountry((prevCountry) => {
                return {
                    ...prevCountry,
                    cities: newCities
                }
            })
        }
        else {
            
            setCountry((prevCountry) => {
                return {
                    ...prevCountry,
                    cities: [...prevCountry.cities, city]
                }
            })
        }
        
	}

    //Вынести желательно(низ)
	const createFileFromObjectUrl = async (objectUrl, fileName) => {
		const response = await axios.get(objectUrl, { responseType: "blob" }); // Загружаем как Blob
		const blob = response.data;
		return new File([blob], fileName, { type: blob.type }); // Создаём новый File
	};
	
	const convertObjectUrlsToFiles = async (objectUrls) => {
		const filePromises = objectUrls.map((url, index) =>
			createFileFromObjectUrl(url, `copied_image_${index}.jpg`)
		);
		return await Promise.all(filePromises);
	};
	//Вынести желательно(верх)

    const saveCountry = async () => {
            console.log(country);
            const formData = new FormData();
                    
            formData.append("Id", country.id);
            formData.append("Name", country.name);
            formData.append("MainDescription", country.mainDescription);
            formData.append("RegionId", country.regionId);
            formData.append("Lat", country.lat.toString().replace(".", ","));
		    formData.append("Lng", country.lng.toString().replace(".", ","));
		    formData.append("LevelOfDevelopment", country.levelOfDevelopment);
                
            if(isChangeFlag) {
                const copiedphotosFiles = await convertObjectUrlsToFiles([flagUrl]);
                console.log(copiedphotosFiles[0]);
                formData.append("PhotoFile", copiedphotosFiles[0]); // Название должно совпадать с C#
            }
    
            try {     
                if(country.id === 0) {
                    formData.append("Cities", JSON.stringify(country.cities));
                    await axios.post('https://localhost:7276/direction/add_country', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
                else {
                    await axios.put('https://localhost:7276/direction/edit_country', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                }
                    
                window.location.href = '/tours';
            } catch (error) {
                console.error('Ошибка при изменении данных страны:', error);
            }
            
        };

    return (
        <div className="country-editor">
            <div className='country'>
                <div className='country-editor-info'>
                    <img 
                        className='country-editor-flag' 
                        src={flagUrl}
                        onClick={openFileDialogToSelectFlag}
                    />
                    <input
                        type="file"
                        ref={flagFile}
                        onChange={changeFlag}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
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

                <div className='country-editor-region'>
                    <div><b>Регион</b></div>
                    <Select className='country-editor-region-select' name="regionId" value={country.regionId} onChange={changeCountry} size='small'>
                        {regions.map((region) => (
                            <MenuItem value={region.id}>
                                {region.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <FormControl className='country-editor-level-of-developments'>
                    <FormLabel>Уровень развития</FormLabel>
                    <RadioGroup
                        row
                        name="levelOfDevelopment"
                        value={country.levelOfDevelopment}
                        onChange={changeCountry}
                    >
                        <FormControlLabel  value={3} control={<Radio size="small"/>} label="Высокоразвитая" />
                        <FormControlLabel value={2} control={<Radio size="small"/>} label="Развитая" />
                        <FormControlLabel value={1} control={<Radio size="small"/>} label="Развивающаяся" />
                        <FormControlLabel
                            value={0}
                            disabled
                            control={<Radio size="small"/>}
                            label="Бедная"
                        />
                    </RadioGroup>
                </FormControl>

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
                <Button className='save-country-button' variant="contained" onClick={saveCountry}>Сохранить</Button>
            </div>
            <div className='cities'>
                <div className='cities-list'>
                    {country.cities.map((city, index) => (
                        <div className='city-card' onClick={() => openCityEditor(index)} onMouseEnter={() => setIndexOfHoverCity(index)} onMouseLeave={() => setIndexOfHoverCity(-1)}>
                            <b>
                                {city.name}
                            </b>
                            <ClearIcon className='delete-city-button' style={{visibility: index === indexOfHoverCity ? 'visible' : 'hidden'}} onClick={(e)=>{e.stopPropagation(); deleteCity(city);}}/>
                        </div>
                    ))}
                </div>
                {/* <Button className='add-city-button' variant="contained">Добавить город</Button> */}
                <Fab className='add-city-button' color="primary" aria-label="add" onClick={() => setIsOpenCityEditor(true)}>
                    <AddIcon />
                </Fab>
            </div>

            <Modal className='city-modal' open={isOpenCityEditor} onClose={closeCityEditor} >
				<CityEditor indexOfSelectedCity={indexOfSelectedCity} cities={country.cities} countryId={country.id} setCityToCountry={setCityToCountry} closeModal={closeCityEditor}/>
			</Modal>
            

        </div>
    );
}

export default CountryEditor;
