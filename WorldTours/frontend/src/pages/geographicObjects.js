import '../styles/geographic-objects.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import HotelCardForEditor from '../components/hotelsForEditor/hotelCardForEditor';
import all from '../img/all.svg';
import map from '../img/map.png';
import RegionCard from '../components/geographicObjects/regionCard';
import CountryCard from '../components/geographicObjects/countryCard';
const token = localStorage.getItem("token");

function GeographicObjects() {
	// const [filter, setFilter] = useState({
	// 	regionId: 0,
	// 	countryId: 0,
	// 	cityId: 0,
    //     minHotelStars: 1,
    //     maxHotelStars: 5,
	// });

	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [geographicObjects, setGeographicObjects] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState({
		id: null,
		name: null,
		imageUrl: null
	});

	const regionImageFile = useRef(null);;

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
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
	const loadPhotos = (e) => {
		if (!e.target.files) return; // Проверяем, что файлы есть

    const file = e.target.files[0]; // Берем первый файл

    if (!file) return; // Проверяем, что файл существует

    const newImageUrl = URL.createObjectURL(file); // Создаём ссылку на изображение
    setSelectedRegion((prevRegion) => ({
        ...prevRegion,
        imageUrl: newImageUrl
    }));
	};
    // Функция для открытия input по нажатию на изображение
    const setPhotoUropenFileDialogToSelectPhoto = () => {
        regionImageFile.current.click();
    };

    const selectRegion = async (region) => {
		setSelectedRegion(region)

        const response = await axios.get(`https://localhost:7276/direction/countries?regionId=${region.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		const countriesData = response.data;
		setCountries(countriesData);
	}

	const deleteHotel = async (id) => {
        await axios.delete(`https://localhost:7276/hotel/delete?hotelId=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		window.location.href = '/hotels_for_editor';
	}

	
	return (
		<div className="hotels-for-editor narrow-conteiner">
			<Header SearchInputComponent={<input  type='text' placeholder='Поиск'/>} AddButtonComponent={<button><Link to='/hotel_editor/0'><b>Добавить отель</b></Link></button>}/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='geographic-object-editor-parametrs'>
					{(selectedRegion.id !== null && selectedRegion.id !== 0 && selectedRegion.id !== undefined) && 
						<>
							<ArrowBackIcon className='back-to-regions-arrow' onClick={() => setSelectedRegion({id: null, imageUrl: null, name: null})}/>
							<img src={selectedRegion.imageUrl} onClick={setPhotoUropenFileDialogToSelectPhoto} className='geographic-object-editor-image'/>
							<input
								type="file" 
								multiple  
								ref={ regionImageFile } 
								onChange={loadPhotos} 
								style={{ display: 'none' }} accept="image/*"
							/>
							<TextField
								className='geographic-object-editor-name'
								label="Название"
								type="search"
								variant="standard"
								value={selectedRegion.name}
								onChange={(e) =>{setSelectedRegion((prevRegion) => { return {...prevRegion, name: e.target.value}})}}
							/>	
							<img src={map} className='geographic-object-editor-map'/>
							<button className='save-region-button'>Сохранить регион</button>
						</>
					}
					<SortButton/>
				</div>
				<div className="geographic-objects-list">
					{(selectedRegion.id === null || selectedRegion.id === 0 || selectedRegion.id === undefined) &&
						regions.map((region) => (<RegionCard region={region} selectRegion={() => selectRegion(region)} deleteRegion={deleteHotel}/>))
					}

					{(selectedRegion.id !== null && selectedRegion.id !== 0 && selectedRegion.id !== undefined) &&
						countries.map((counrty) => (<CountryCard country={counrty}/>))
					}
				</div>
			</main>
			
		</div>
	);
}

export default GeographicObjects;
