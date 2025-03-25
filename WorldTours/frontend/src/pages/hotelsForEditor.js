import '../styles/hotels-for-editor.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import HotelCardForEditor from '../components/hotelsForEditor/hotelCardForEditor';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
const token = localStorage.getItem("token");

function HotelsForEditor() {
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
	});

	const [filter, setFilter] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		minStarsNumber: 1,
		maxStarsNumber: 5,
	});

	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get(`https://localhost:7276/hotel/hotels_for_editor`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				const hotelsgData = response.data;
				console.log(hotelsgData);
				setHotels(hotelsgData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
    const getHotels = async () => {
		const response = await axios.post(`https://localhost:7276/hotel/filtred_hotels`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const hotelsData = response.data;
		setHotels(hotelsData);
	}

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (filter.regionId != null && filter.countryId != null && filter.cityId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/get?countryId=${filter.countryId}&cityId=${filter.cityId}&hotelId=${filter.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
                    
					setDirectionInfo(response.data);
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}

			if (filter.countryId != null && filter.cityId != null) {
				try {
					console.log(filter);
					getHotels();
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}
		};
	
		getDirectionInfo();
	}, [filter]);

	const selectDirection = (directionId) => {
		setFilter((prevFilter) => {
			switch (directionsPageInndex) {
				case 1:
					return {
						...prevFilter,
						regionId: directionId
					}
				case 2:
					return {
						...prevFilter,
						countryId: directionId
					}
				case 3:
					return {
						...prevFilter,
						cityId: directionId
					}
				default:
					break;
			}
		});
	};

    const deleteSelectedDirection = async () => {
		setDirectionInfo({
			country: null,
			city: null,
		});

		setFilter((prevFilter) => { 
            return {
                ...prevFilter,
                regionId: null,
                countryId: null,
                cityId: null,
            }
        });

		const updatedFilter = {
			...filter,
            regionId: null,
            countryId: null,
            cityId: null,
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/hotel/filtred_hotels`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const hotelsData = response.data;

		setHotels(hotelsData);
	}

	const directions = [
        null,
        <Regions selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries regionId={filter.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities countyId={filter.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	const changeStars = async (e) => {
		const { name, value } = e.target;
		setFilter((prevFilter) => { return {
			...prevFilter,
			[name]: +value,
		}})

		const updatedFilter = {
			...filter,
			[name]: +value,
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/hotel/filtred_hotels`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const hotelsData = response.data;

		setHotels(hotelsData);
    };

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
				<div className='hotels-filters-parametrs'>
					<button className='select-hotel-place' onClick={() => {deleteSelectedDirection(); setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}}>
						Выберите месторасположение
						<div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
					</button>
					<div className='directions-area'>
						{directions[directionsPageInndex]}
					</div>

					<div className="hotels-stars-filters-parametr">
						<div>
							<label>Мин. звёзд:</label>
							<Rating 
								name="minStarsNumber" 
								defaultValue={1} 
								precision={1} 
								size="small"
								value={filter.minStarsNumber}
								onChange={changeStars}
							 />
						</div>

						<div>
							<label>Макс. звёзд:</label>
							<Rating 
								name="maxStarsNumber"
								defaultValue={5}
								precision={1}
								size="small"
								value={filter.maxStarsNumber}
								onChange={changeStars}
							/>
						</div>
					</div>

					{/* <div className='hotels-sort-parametrs'>
						<span>Сортировать по: </span>
						<div>
							<select onChange={(e) => setFilter((prevFilter => {return {...prevFilter, sortBy: e.target.value}}))}>
								<option key={0} value={0}> Алфавиту </option>
								<option key={1} value={1}> Звёздам </option>
								<option key={2} value={2}> Количеству типов номерв </option>
								<option key={3} value={3}> Количеству номеров </option>
								<option key={4} value={4}> Количеству мест </option>
							</select>
							<div>
								<div>
									<div>По возрастанию</div>
									<input type="radio" name="drone" value="huey" checked />
								</div>
								<div>
									<div>По убыванию</div>
									<input type="radio" name="drone" value="huey" checked />
								</div>
							</div>
						</div>
					</div> */}
					{/* <Button className="editor-list-more-filters" variant="outlined"></Button> */}
					<div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div>
				</div>
				<div className="hotels-for-editor-list">
					{hotels.map((hotel) => (<HotelCardForEditor hotel={hotel} deleteHotel={deleteHotel}/>))}
				</div>
			</main>
			
		</div>
	);
}

export default HotelsForEditor;
