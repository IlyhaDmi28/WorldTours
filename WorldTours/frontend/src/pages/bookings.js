import '../styles/bookings.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../context/userContext';
import Header from '../components/general/header';
import BookingCard from '../components/bookings/bookingCard';
const token = localStorage.getItem("token");

function Bookings() {
	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false, false]);
	const {authUser, setAuthUser} = useContext(UserContext);
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get(`https://localhost:7276/booking/bookings?userId=${authUser.id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				const bookingData = response.data;
				console.log(bookingData);
				setBookings(bookingData);
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

		setIsAllButtonActive(arr);
    };

	const deleteBooking = async (id) => {
        await axios.delete(`https://localhost:7276/booking/delete?bookingId=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		setBookings(bookings.filter(booking => booking.id !== id))
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
					Отправленные
				</button>
				
				<button
					onClick={() => handlClickChangeBookingListButton(2)}
					style={isChangeBookingListButtonsActive[2]  ? {backgroundColor: 'rgb(60, 80, 254)', color: 'white'} : {}}
				>
					Подтверждённые
				</button>

				<button
					onClick={() => handlClickChangeBookingListButton(3)}
					style={isChangeBookingListButtonsActive[3]  ? {backgroundColor: 'rgb(224, 190, 39)', color: 'white'} : {}}
				>
					Оплаченные
				</button>
			</div>
			<div className="bookings-list">
				{bookings.map((booking) => (<BookingCard booking={booking} deleteBooking={deleteBooking}/>))}
			</div>
		</div>
	);
}

export default Bookings;
