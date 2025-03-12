import '../styles/hotels-for-editor.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import HotelCardForEditor from '../components/hotelsForEditor/hotelCardForEditor';
const token = localStorage.getItem("token");

function HotelsForEditor() {
	// const [filter, setFilter] = useState({
	// 	regionId: 0,
	// 	countryId: 0,
	// 	cityId: 0,
    //     minHotelStars: 1,
    //     maxHotelStars: 5,
	// });

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
					<button className='select-hotel-place'>
						Выберите месторасположение
						<div>Страна, город</div>
					</button>

					<div className="hotels-stars-filters-parametr">
						<div>
							<label>Мин. звёзд:</label>
							<Rating name="min-hotel-stars" defaultValue={1} precision={1} size="small"/>
						</div>

						<div>
							<label>Макс. звёзд:</label>
							<Rating name="max-hotel-stars" defaultValue={5} precision={1} size="small"/>
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
