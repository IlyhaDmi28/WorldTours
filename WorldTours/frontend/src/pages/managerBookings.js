import '../styles/bookings.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../context/userContext';
import Header from '../components/general/header';
import BookingCardForManager from '../components/bookings/bookingCardForManager';
const token = localStorage.getItem("token");

function ManagerBookings() {
	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false]);
	const {authUser, setAuthUser} = useContext(UserContext);
	const [bookings, setBookings] = useState([]);
	const [allBookings, setAllBookings] = useState([]);
	const [notConfirmedBookings, setNotConfirmedBookings] = useState([]);
	const [confirmedBookings, setConfirmedBookings] = useState([]);

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
        await axios.patch(`https://localhost:7276/booking/confirm?bookingId=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		let response;
		response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
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
        await axios.delete(`https://localhost:7276/booking/delete?bookingId=${id}`, {
            headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		let response;
		response = await axios.get(`https://localhost:7276/booking/bookings_for_manager`, {
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

	return (
		<div className="bookings narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className='change-show-bookings-list'>
				<button 
					onClick={() => handlClickChangeBookingListButton(0)}
					style={isChangeBookingListButtonsActive[0] ? {backgroundColor: 'rgb(209, 216, 0', color: 'white'} : {}}
				>
					Все
				</button>

				<button 
					onClick={() => handlClickChangeBookingListButton(1)}
					style={isChangeBookingListButtonsActive[1] ? {backgroundColor: 'rgb(69, 189, 69)', color: 'white'}: {}}
				>
					Не подтверждённые
				</button>
				
				<button
					onClick={() => handlClickChangeBookingListButton(2)}
					style={isChangeBookingListButtonsActive[2]  ? {backgroundColor: 'rgb(60, 80, 254)', color: 'white'} : {}}
				>
					Подтверждённые
				</button>
			</div>
			<div className="bookings-list">
				{bookings.map((booking) => (<BookingCardForManager booking={booking} deleteBooking={deleteBooking} confirmBooking={confirmBooking}/>))}
			</div>
		</div>
	);
}

export default ManagerBookings;
