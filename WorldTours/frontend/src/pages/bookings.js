import '../styles/bookings.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import BookingCard from '../components/bookings/bookingCard';

function Bookings() {
	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false, false]);

    const handlClickChangeBookingListButton = (buttonId) => {
		let arr = [];
		for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
			arr[i] = i === buttonId;
		}

		setIsAllButtonActive(arr);
    };

	const booking = {
		name: 'Логово Андрея ЧЧЧЧЧЧЧЧЧЧЧЧЧЧ',
		country: 'Страна',
		city: 'город',
		hotelStars: 5,
		price: 800,
	};


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
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
			</div>
		</div>
	);
}

export default Bookings;
