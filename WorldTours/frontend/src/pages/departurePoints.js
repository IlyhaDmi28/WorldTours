import '../styles/departure-points.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import DeparturePointCard from '../components/departurePoints/departurePointCard';
import DeparturePointEditor from '../components/departurePoints/departurePointEditor';
import airplane from '../img/airplane.svg'
import bus from '../img/bus.svg'
import ship from '../img/ship.svg'
const token = localStorage.getItem("token");

function DeparturePoints() {
	// const [filter, setFilter] = useState({
	// 	regionId: 0,
	// 	countryId: 0,
	// 	cityId: 0,
    //     minHotelStars: 1,
    //     maxHotelStars: 5,
	// });

	const [hotels, setHotels] = useState([]);
	const [departurePoints, setDeparturePoints] = useState([
		{id: 1, transportTypeId: 1, name: 'Zzzz', country: 'Украiна', city: 'Москва', address: 'ул. Хуя, д. 43' },
		{id: 2, transportTypeId: 2, name: 'Oooo', country: 'Украiна', city: 'Москва', address: 'ул. Хуя, д. 43' },
		{id: 3, transportTypeId: 3, name: 'Vvvv', country: 'Украiна', city: 'Москва', address: 'ул. Хуя, д. 43' },
		{id: 4, transportTypeId: 1, name: 'Vvvv', country: 'Украiна', city: 'Москва', address: 'ул. Хуя, д. 43' },
	]);
	const [indexOfSelectedDeparturePoint, setIndexOfSelectedDeparturePoint] = useState(-1);

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

	// const deleteBooking = async (id) => {
	// 	if(authUser.blockedStatus) {
	// 		alert("Вы не удалить бронь тура, так как ваш профиль был заблокирован!");
	// 		return;
	// 	}

    //     await axios.delete(`https://localhost:7276/booking/delete?bookingId=${id}`, {
    //         headers: {
	// 			'Authorization': 'Bearer ' + token,
	// 		}
	// 	});

	// 	const response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //          }
    //     });

	// 	const bookingData = response.data;
	// 	const notConfirmedBookingsData = bookingData.filter(booking => booking.status === null);
	// 	const confirmedBookingsData =bookingData.filter(booking => booking.status === true);
	// 	setAllBookings(bookingData);
	// 	setNotConfirmedBookings(notConfirmedBookingsData);
	// 	setConfirmedBookings(confirmedBookingsData);
	// 	setBookings(bookingData);

	// 	for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
	// 		if(isChangeBookingListButtonsActive[i]) {
	// 			switch(i) {
	// 				case 0: setBookings(bookingData); return;
	// 				case 1: setBookings(notConfirmedBookingsData); return;
	// 				case 2: setBookings(confirmedBookingsData); return;
	// 				default: setBookings(bookingData); return;
	// 			}
	// 		}
	// 	}
	// }

	
	return (
		<div className="departure-points narrow-conteiner">
			<Header SearchInputComponent={<input  type='text' placeholder='Поиск'/>} AddButtonComponent={<button onClick={() => setIndexOfSelectedDeparturePoint(0)}><b>Добавить пункт отправления</b></button>}/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='vertical-list-filters-parameters'>
					<button className='select-location'>
						Выберите месторасположение
						<div>Страна, город</div>
					</button>

					<div className="transport-list-on-filter">
						<img src={airplane}/>
						<img src={bus}/>
						<img src={ship}/>
					</div>

					{/* <Button className="editor-list-more-filters" variant="outlined"></Button> */}
					<div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div>
				</div>
				<div className="departure-points-list">
					{departurePoints.map((departurePoint) => (<DeparturePointCard departurePoint={departurePoint}/>))}
				</div>
				<Modal className='departure-point-editor-modal' open={indexOfSelectedDeparturePoint !== -1} onClose={() => setIndexOfSelectedDeparturePoint(-1)} >
					<DeparturePointEditor indexOfSelectedRoomType={indexOfSelectedDeparturePoint} roomTypes={departurePoints} setRoomTypes={setDeparturePoints} closeModal={() => setIndexOfSelectedDeparturePoint(-1)}/>
				</Modal>
			</main>
			
		</div>
	);
}

export default DeparturePoints;
