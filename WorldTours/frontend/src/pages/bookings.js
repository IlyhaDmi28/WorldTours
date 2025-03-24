import '../styles/bookings.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Modal from '@mui/material/Modal';
import Header from '../components/general/header';
import BookingCard from '../components/bookings/bookingCard';
import Booking from '../components/bookings/booking';
const token = localStorage.getItem("token");

function Bookings() {
	const authUser = useSelector((state) => state.authUser.value);
	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false, false]);
	const [bookings, setBookings] = useState([]);
	const [allBookings, setAllBookings] = useState([]);
	const [notConfirmedBookings, setNotConfirmedBookings] = useState([]);
	const [confirmedBookings, setConfirmedBookings] = useState([]);
	const [indexOfSelectedBooking, setIndexOfSelectedBooking] = useState(-1);
	const [isOpenBooking, setIsOpenBooking] = useState(false);

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

	const deleteBooking = async (id) => {
		closeBooking();

        await axios.delete(`https://localhost:7276/booking/delete?bookingId=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		setAllBookings(allBookings.filter(booking => booking.id !== id));
		setNotConfirmedBookings(notConfirmedBookings.filter(booking => booking.id !== id));
		setConfirmedBookings(confirmedBookings.filter(booking => booking.id !== id));
		setBookings(bookings.filter(booking => booking.id !== id));
	}

	const openBooking = (index) => {
        setIndexOfSelectedBooking(index);
        setIsOpenBooking(true);
    }
    
    const closeBooking = () => {
        setIndexOfSelectedBooking(-1);
        setIsOpenBooking(false);
    }

	return (
		<div className="bookings narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='booking-list-filters-parameters'>
					<button className='select-location'>
						Направление
						<div>Страна, город</div>
					</button>

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
							onClick={() => handlClickChangeBookingListButton(2)}
							style={isChangeBookingListButtonsActive[2]  ? {backgroundColor: 'rgb(224, 190, 39)', color: 'white'} : {}}
						>
							Оплаченые
						</button>

					</div>

					{/* <Button className="editor-list-more-filters" variant="outlined"></Button> */}
					<div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div>
				</div>
				
				<div className="bookings-list">
					{bookings.map((booking, index) => (
						<BookingCard 
							booking={booking} 
							deleteBooking={deleteBooking}
							openBooking={() => openBooking(index)}
						/>))}
				</div>

				<Modal className='booking-modal' open={isOpenBooking} onClose={closeBooking} >
					<Booking indexOfSelectedBooking={indexOfSelectedBooking} deleteBooking={deleteBooking} bookings={bookings} closeModal={closeBooking}/>
				</Modal>
			</main>
		</div>
	);
}

export default Bookings;
