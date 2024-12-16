import '../styles/tour.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import {UserContext} from '../context/userContext';
import Header from '../components/general/header';
import BookingMenu from '../components/tour/bookingMenu';
import noPhoto from '../img/noPhoto.png';
import star from '../img/star.svg';
import food from '../img/food.svg';
const token = localStorage.getItem("token");

function Tour() {
    const [searchParams] = useSearchParams(); // Получение query-параметров
	const location = useLocation();

	const {authUser, setAuthUser} = useContext(UserContext);

	const [photoUrl, setPhotoUrl] = useState(noPhoto); 
	const [tour, setTour] = useState({
		id: 0,
		name: null,
		direction: {
			hotel: null,
			county: null,
			city: null,
			starsNumber: null
		},
		mainDescription: null,
		nutritionType: null,
		routes: [],
		descriptions: [],
	});

	const [selectedRoute, setSelectedRoute] = useState({
		landingDateOfDeparture: "",
        landingTimeOfDeparture: "",
        arrivalDateOfDeparture: "",
        arrivalTimeOfDeparture: "",
        landingDateOfReturn: "",
        landingTimeOfReturn: "",
        arrivalDateOfReturn: "",
        arrivalTimeOfReturn: "",
        departmentDeparture: {
            id: 1,
            name: null,
            city: null,
            countrty: null
        },
        transportType: {
            id: 1,
            name: null,
        },
        price: 0,
        seatsNumber: 0,
	});
		
	useEffect(() => {
		const getData = async () => {
			const segments = location.pathname.split('/');
			const id = segments[segments.length - 1];
			const routeId = searchParams.get('routeId'); // Чтение параметра "filter"
			console.log(routeId);

            try {
				let response;
				response = await axios.get(`https://localhost:7276/tour/get?id=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const tourData = response.data;
				console.log(tourData);
				setTour((prevTour) => ({
					...prevTour, 
					id: tourData.id,
					name: tourData.name,
					direction: tourData.direction,
					mainDescription: tourData.mainDescription,
					nutritionType: tourData.nutritionType,
					routes: tourData.routes,
					descriptions: tourData.descriptions,
				}));
				setPhotoUrl(tourData.photoUrl === "" ? noPhoto : tourData.photoUrl);
				console.log(tourData.routes.find(route => route.id === +routeId));
				setSelectedRoute(tourData.routes.find(route => route.id === +routeId));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const sendApplicationForBooking = async (seatsNumber) => {
		if(seatsNumber <= 0) {
			alert("Вы ввели некоретное количество мест")
			return;
		}

		if(authUser) {
			try {
				const routeId = searchParams.get('routeId');
				await axios.post('https://localhost:7276/booking/add', {userId: authUser.id, routeId: routeId, orderSeatsNumber: seatsNumber }, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				});
	
				alert("Тур успешно забронирован!"); 
			 } catch (error) {
				if(error.response != undefined) {
					if(error.response.status === 409) {
						alert("Вы уже забронировали этот тур!"); 
						return;
					}
				}
	
				console.log('Ошибка бронировании тура: ', error);
			} 
		}
		else{
			alert("Что бы забронировать тур, вам необходимо войти в аккаунт")
		}
		
	}

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="tour-name-and-mark">
				<p>
					<b>{tour.name}</b>
				</p>
			</div>

			<BookingMenu selectedRoute={selectedRoute} routes={tour.routes} direction={{country: tour.direction.country, city: tour.direction.city}} sendApplicationForBooking={sendApplicationForBooking}/>
			<div className="tour-images">
				<img className="main-tour-img" src={photoUrl} />
			</div>

			<div className="tour-info-and-reservation">
				<div className="tour-info">
					<div className="main-tour-info">
						<div>
							<b>{tour.direction.hotel}</b>
						</div>
						<div>{tour.direction.country}, {tour.direction.city}</div>
					</div>

					<div className="tour-hotel-stars">
						{Array(tour.direction.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
					</div>

					<div className="tour-nutrition-type"><b>Тип питания:</b> {tour.nutritionType}</div>
					<div className="tour-desription">{tour.mainDescription}</div>

					<div className="tour-characteristics">
						{tour.descriptions.map((characteristicType) => 
						<div className="tour-characteristic">
							<div>
								<b>{characteristicType.name}</b>
							</div>
							<div>
								<ul>
									{characteristicType.descriptions.map((description) =>
										<li>{description.characteristic.name} {description.description.value}</li>
									)}
								</ul>
							</div>
						</div>
						)}
					</div>
				</div>

			</div>
		</div>
	);
}

export default Tour;
