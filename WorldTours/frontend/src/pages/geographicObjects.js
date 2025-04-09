import '../styles/geographic-objects.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import HotelCardForEditor from '../components/hotelsForEditor/hotelCardForEditor';
import all from '../img/all.svg';
import map from '../img/map.png';
import RegionCard from '../components/geographicObjects/regionCard';
import CountryCard from '../components/geographicObjects/countryCard';
import CountryEditor from '../components/geographicObjects/countryEditor';
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
	const [indexOfSelectedCountry, setIndexOfSelectedCountry] = useState(-1);
	const [isOpenCountry, setIsOpenCountry] = useState(false);

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

	// const openCountry = (index) => {
    //     setIndexOfSelectedCountry(index);
    //     setIsOpenCountry(true);
    // }

	// const closeCountry = () => {
    //     setIndexOfSelectedCountry(-1);
    //     setIsOpenCountry(false);
    // }

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
					{(selectedRegion.id !== null && selectedRegion.id !== 0 && selectedRegion.id !== undefined && indexOfSelectedCountry === -1) && 
						<>
							<ArrowBackIcon className='back-to-regions-arrow' onClick={() => setSelectedRegion({id: null, imageUrl: null, name: null})}/>
							<img src={selectedRegion.imageUrl}  className='geographic-object-editor-image'/>
							
							<b className='geographic-object-editor-name'>{selectedRegion.name}</b>
							
						</>
					}
					{indexOfSelectedCountry !== -1 && 
						<ArrowBackIcon className='back-to-regions-arrow' onClick={() => setIndexOfSelectedCountry(-1)}/>
					}
					<SortButton/>
				</div>
				{
					indexOfSelectedCountry === -1 ?  
					<div className="geographic-objects-list">
						{((selectedRegion.id === null || selectedRegion.id === 0 || selectedRegion.id === undefined) && indexOfSelectedCountry === -1) &&
							regions.map((region) => (<RegionCard region={region} selectRegion={() => selectRegion(region)} deleteRegion={deleteHotel}/>))
						}

						{(selectedRegion.id !== null && selectedRegion.id !== 0 && selectedRegion.id !== undefined && indexOfSelectedCountry === -1) &&
						
							countries.map((counrty, index) => (<CountryCard country={counrty} openCountryEditor={() => setIndexOfSelectedCountry(index)}/>))
							
						}
					</div> : <CountryEditor indexOfSelectedCountry={indexOfSelectedCountry} countries={countries}/>
				}
					{/* <Modal className='country-modal' open={isOpenCountry} onClose={closeCountry} >
						<Country indexOfSelectedCountry={indexOfSelectedCountry} countries={countries} closeModal={closeCountry}/>
					</Modal> */}
			</main>
			
		</div>
	);
}

export default GeographicObjects;
