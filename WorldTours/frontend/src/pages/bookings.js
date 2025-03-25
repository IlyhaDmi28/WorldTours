import '../styles/bookings.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import BookingsFilters from '../components/bookings/bookingsFilters'
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Modal from '@mui/material/Modal';
import Header from '../components/general/header';
import BookingCard from '../components/bookings/bookingCard';
import Booking from '../components/bookings/booking';
const token = localStorage.getItem("token");

function Bookings() {
	const authUser = useSelector((state) => state.authUser.value);
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	const [isChangeBookingListButtonsActive, setIsAllButtonActive] = useState([true, false, false, false]);
	const [bookings, setBookings] = useState([]);
	const [indexOfSelectedBooking, setIndexOfSelectedBooking] = useState(-1);
	const [isOpenBooking, setIsOpenBooking] = useState(false);

	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
	});
	

	const [filter, setFilter] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		bookingStatus: null,
		minLandingDateOfDeparture: "",
        minArrivalDateOfDeparture: "",
        minLandingDateOfReturn: "",
        minArrivalDateOfReturn: "",
		maxLandingDateOfDeparture: "",
        maxArrivalDateOfDeparture: "",
        maxLandingDateOfReturn: "",
        maxArrivalDateOfReturn: "",
        departmentDepartureId: 0
	});

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
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const getBookings = async () => {
		const response = await axios.post(`https://localhost:7276/booking/filtred_bookings?userId=${authUser.id}`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;
		setBookings(toursData);
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
					getBookings();
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

		const response = await axios.post(`https://localhost:7276/booking/filtred_bookings?userId=${authUser.id}`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const bookingsData = response.data;

		setBookings(bookingsData);
	}

	const directions = [
        null,
        <Regions selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries regionId={filter.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities countyId={filter.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]
	
    const handlClickChangeBookingListButton = async (buttonId) => {
		setFilter((prevFilter) => { return {
			...prevFilter,
			bookingStatus: buttonId
		}})

		const updatedFilter = {
			...filter,
			bookingStatus: buttonId === 0 ? null : buttonId - 1
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/booking/filtred_bookings?userId=${authUser.id}`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const bookingsData = response.data;

		setBookings(bookingsData);
		let arr = [];
		for(let i = 0; i < isChangeBookingListButtonsActive.length; i++) {
			arr[i] = i === buttonId;
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
					<button className='select-location' onClick={() => {deleteSelectedDirection(); setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}}>
						Направление
						<div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
					</button>
					<div className='directions-area'>
						{directions[directionsPageInndex]}
					</div>
					

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
						<FilterButton text={"Ещё фильтры"} openFilters={() => {setIsOpenFilter(true)}}/>
						<Modal className='modal-window' open={isOpenFilter} onClose={() => setIsOpenFilter(false)} >
							<BookingsFilters filter={filter} setFilter={setFilter} setBookings={setBookings}/>
						</Modal>
						{/* <SortButton/> */}
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
