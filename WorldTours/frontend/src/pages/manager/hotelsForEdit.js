import '../../styles/hotels-for-edit.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { Rating  } from "@mui/material";
import FilterButton from "../../components/tours/filterButton";
import SortButton from "../../components/general/sortButton";
import Header from '../../components/general/header';
import BookingCardForManager from '../../components/bookings/bookingCardForManager';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
const token = localStorage.getItem("token");

function HotelsForEdit() {
	const [filter, setFilter] = useState({
		regionId: 0,
		countryId: 0,
		cityId: 0,
        minHotelStars: 1,
        maxHotelStars: 5,
	});

	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false]);
	const authUser = useSelector((state) => state.authUser.value);
	const [bookings, setBookings] = useState([]);
	const [allBookings, setAllBookings] = useState([]);
	const [notConfirmedBookings, setNotConfirmedBookings] = useState([]);
	const [confirmedBookings, setConfirmedBookings] = useState([]);
 	const [minNumberLightHotelStars, setMinNumberLightHotelStars] = useState(filter.minHotelStars);
	const [maxNumberLightHotelStars, setMaxNumberLightHotelStars] = useState(filter.maxHotelStars);

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				const bookingData = response.data;
				console.log(bookingData);
				setBookings(bookingData);
				setAllBookings(bookingData);
				setNotConfirmedBookings(bookingData.filter(booking => booking.status === null));
				setConfirmedBookings(bookingData.filter(booking => booking.status === true));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
    const handlClickChangeBookingListButton = (buttonId) => {
		let arr = [];
		for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
			arr[i] = i === buttonId;
		}

		switch(buttonId) {
			case 0: setBookings(allBookings); break;
			case 1: setBookings(notConfirmedBookings); break;
			case 2: setBookings(confirmedBookings); break;
			default: setBookings(allBookings); break;
		}

		setIsAllButtonActive(arr);
    };

	const confirmBooking = async (id) => {
		if(authUser.blockedStatus) {
			alert("Вы не подтвердить бронь тура, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.patch(`https://localhost:7276/booking/confirm?bookingId=${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		const response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
            headers: {
                'Authorization': 'Bearer ' + token,
             }
        });

		const bookingData = response.data;
		const notConfirmedBookingsData = bookingData.filter(booking => booking.status === null);
		const confirmedBookingsData =bookingData.filter(booking => booking.status === true);
		setAllBookings(bookingData);
		setNotConfirmedBookings(notConfirmedBookingsData);
		setConfirmedBookings(confirmedBookingsData);
		setBookings(bookingData);

		for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
			if(isChangeBookingListButtonsActive[i]) {
				switch(i) {
					case 0: setBookings(bookingData); return;
					case 1: setBookings(notConfirmedBookingsData); return;
					case 2: setBookings(confirmedBookingsData); return;
					default: setBookings(bookingData); return;
				}
			}
		}
	}

	const deleteBooking = async (id) => {
		if(authUser.blockedStatus) {
			alert("Вы не удалить бронь тура, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.delete(`https://localhost:7276/booking/delete?bookingId=${id}`, {
            headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
            headers: {
                'Authorization': 'Bearer ' + token,
             }
        });

		const bookingData = response.data;
		const notConfirmedBookingsData = bookingData.filter(booking => booking.status === null);
		const confirmedBookingsData =bookingData.filter(booking => booking.status === true);
		setAllBookings(bookingData);
		setNotConfirmedBookings(notConfirmedBookingsData);
		setConfirmedBookings(confirmedBookingsData);
		setBookings(bookingData);

		for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
			if(isChangeBookingListButtonsActive[i]) {
				switch(i) {
					case 0: setBookings(bookingData); return;
					case 1: setBookings(notConfirmedBookingsData); return;
					case 2: setBookings(confirmedBookingsData); return;
					default: setBookings(bookingData); return;
				}
			}
		}
	}

	const ClickMinHotelStars = (hotelStarButtonId) => {
        setMinNumberLightHotelStars(hotelStarButtonId);
        setFilter((prevfilter) => ({
            ...prevfilter,
            ["minHotelStars"]: hotelStarButtonId,
        }));
    }

    const ClickMaxHotelStars = (hotelStarButtonId) => {
        setMaxNumberLightHotelStars(hotelStarButtonId);
        setFilter((prevfilter) => ({
            ...prevfilter,
            ["maxHotelStars"]: hotelStarButtonId,
        }));
    }

	return (
		<div className="bookings narrow-conteiner">
			<Header/>
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
				<div className="bookings-list">
					{bookings.map((booking) => (<BookingCardForManager booking={booking} deleteBooking={deleteBooking} confirmBooking={confirmBooking}/>))}
				</div>
			</main>
			
		</div>
	);
}

export default HotelsForEdit;
