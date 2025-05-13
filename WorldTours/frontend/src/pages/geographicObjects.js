import '../styles/geographic-objects.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import TextField from '@mui/material/TextField';
import HotelCardForEditor from '../components/hotelsForEditor/hotelCardForEditor';
import all from '../img/all.svg';
import map from '../img/map.png';
import RegionCard from '../components/geographicObjects/regionCard';
import CountryCard from '../components/geographicObjects/countryCard';
import CountryEditor from '../components/geographicObjects/countryEditor';
import world from '../img/world.jpg';
const token = localStorage.getItem("token");

function GeographicObjects() {
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState({
		id: null,
		name: null,
		imageUrl: null
	});
	const [isOpenCountryEditor, setIsOpenCountryEditor] = useState(false);
	const [indexOfSelectedCountry, setIndexOfSelectedCountry] = useState(-1);

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

	const openCountryEditor = (index) => {
        setIndexOfSelectedCountry(index);
        setIsOpenCountryEditor(true);
    }

	const closeCountryEditor = () => {
        setIndexOfSelectedCountry(-1);
        setIsOpenCountryEditor(false);
    }

	const getSearchedItems = async(e) => {
		const response = await axios.get(`https://localhost:7276/direction/countries?regionId=${selectedRegion.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		const countriesData = response.data.filter(item => item.name.startsWith(e.target.value));
		setCountries(countriesData);
	}

	const deleteCountry = async (id) => {
        await axios.delete(`https://localhost:7276/direction/delete_country?countryId=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		setCountries(countries.filter(country => country.id !== id))
	}

	
	return (
		<div className="hotels-for-editor narrow-conteiner">
			<Header 
				SearchInputComponent={
					<TextField
						className='search-input'
						label="Поиск страны"
						type="search"
						variant="standard"
						onChange={getSearchedItems}
						disabled={selectedRegion.id === null}
					/>
					// <input  type='text' placeholder='Поиск'/>
				} 
				AddButtonComponent={<button onClick={(e) => {e.stopPropagation(); closeCountryEditor(); openCountryEditor(-1); setSelectedRegion({id: null, imageUrl: null, name: null})}}><b>Добавить страну</b></button>}
			/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='geographic-object-editor-parametrs'>
					{(selectedRegion.id !== null && selectedRegion.id !== undefined && indexOfSelectedCountry === -1) && 
						<>
							<ArrowBackIcon className='back-to-regions-arrow' onClick={() => setSelectedRegion({id: null, imageUrl: null, name: null})}/>
							<img src={selectedRegion.imageUrl}  className='geographic-object-editor-image'/>
							<b className='geographic-object-editor-name'>{selectedRegion.name}</b>
						</>
					}
					{isOpenCountryEditor &&
						<ArrowBackIcon className='back-to-regions-arrow' onClick={closeCountryEditor}/>
					}
					<SortButton/>
				</div>
				{
					isOpenCountryEditor ?  
					<CountryEditor indexOfSelectedCountry={indexOfSelectedCountry} countries={countries}/> :
					<div className="geographic-objects-list">
						{((selectedRegion.id === null || selectedRegion.id === undefined) && indexOfSelectedCountry === -1) &&
							<>
								<RegionCard region={{id: 0, name: 'Все страны', imageUrl: world}} selectRegion={() => selectRegion({id: 0, name: 'Все страны', imageUrl: world})}/>
								{regions.map((region) => (<RegionCard region={region} selectRegion={() => selectRegion(region)}/>))}
							</>
						}

						{(selectedRegion.id !== null && selectedRegion.id !== undefined && indexOfSelectedCountry === -1) &&
							countries.map((counrty, index) => (<CountryCard country={counrty} openCountryEditor={() => openCountryEditor(index)} deleteCountry={deleteCountry}/>))
						}
					</div>
				}
					{/* <Modal className='country-modal' open={isOpenCountry} onClose={closeCountry} >
						<Country indexOfSelectedCountry={indexOfSelectedCountry} countries={countries} closeModal={closeCountry}/>
					</Modal> */}
			</main>
			
		</div>
	);
}

export default GeographicObjects;
