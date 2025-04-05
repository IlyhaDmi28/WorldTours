import '../styles/tour.scss';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Обязательно подключи стили
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rating  } from "@mui/material";
import Header from '../components/general/header';
import BookingMenu from '../components/tour/bookingMenu';
import ReviewCard from '../components/tour/reviewCard';
import ImagesAndMap from '../components/tour/imagesAndMap';
import ModalImageGallery from '../components/general/modalImageGallery';
import noPhoto from '../img/noPhoto.png';
const token = localStorage.getItem("token");

function Tour() {
    const [searchParams] = useSearchParams(); // Получение query-параметров
	const location = useLocation();
	const [mode, setMode] = useState('images');

    const switchToImages = () => {
        setMode('images');
    };
    
    const switchToMap = () => {
        setMode('map');
    };
	
	const authUser = useSelector((state) => state.authUser.value);
	const [center, setCenter] = useState(null);
	const [photosUrls, setPhotosUrls] = useState([noPhoto]); 
	const [roomTypesCharacteristics, setRoomTypesCharacteristics] = useState([]); 

	const [review, setReview] = useState(""); 
	const [tour, setTour] = useState({
		id: 0,
		name: null,
		hotel: {
			name: null,
			country: null,
			city: null,
			starsNumber: null,
			nutritionType: null,
			lat: 53.89196,
			lng: 27.55760,
			nutritionType: null,
			characteristics: [],
		},
		mainDescription: null,
		routes: [],
		characteristics: [],
		reviews: []
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
			address: null,
            countrty: null
        },
        transportType: {
            id: 1,
            name: null,
        },
        price: 0,
        seatsNumber: 0,
	});
	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(-1); 
		
	useEffect(() => {
		const getData = async () => {
			const segments = location.pathname.split('/');
			const id = segments[segments.length - 1];
			const routeId = searchParams.get('routeId'); // Чтение параметра "filter"
			console.log(routeId);

            try {
				let response;
				response = await axios.get(`https://localhost:7276/tour/get?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const tourData = response.data;
				
				let allRoomTypesCharacteristics = []

				tourData.hotel.roomTypes.forEach(roomType => {
					console.log(roomType.characteristics);
					allRoomTypesCharacteristics = [...allRoomTypesCharacteristics, ...roomType.characteristics]
				});
				console.log(allRoomTypesCharacteristics);
				console.log('new Map(allRoomTypesCharacteristics.map(сharacteristic=> [сharacteristic.id, сharacteristic])).values()');
				console.log(allRoomTypesCharacteristics.filter((characteristic, index, self) => 
					index === self.findIndex(obj => obj.id === characteristic.id)
				));

				setRoomTypesCharacteristics(allRoomTypesCharacteristics.filter((characteristic, index, self) => 
					index === self.findIndex(obj => obj.id === characteristic.id)
				));

				// setPhotosUrl((prevPhotos) => 
				// 	prevPhotos.map((photo, i) => (i === 0 ? (tourData.photoUrl === "" ? noPhoto : tourData.photoUrl) : photo))
				// );
				setPhotosUrls(tourData.photosUrls.length !== 0 ? tourData.photosUrls : [noPhoto]);
				setMode(tourData.photosUrls.length > 1 ? 'images' : 'map')
				const route  = tourData.routes.find(route => route.id === +routeId)
				if(route === undefined || route === null)  window.location.href = '/error/0';
				setSelectedRoute(tourData.routes.find(route => route.id === +routeId));

				response = await axios.get(`https://localhost:7276/review/reviews?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const reviewsData = response.data;
				console.log(tourData);
				setTour((prevTour) => ({
					...prevTour, 
					id: tourData.id,
					name: tourData.name,
					hotel: tourData.hotel,
					mainDescription: tourData.mainDescription,
					routes: tourData.routes,
					routes: [],
					characteristics: tourData.characteristics,
					reviews:  reviewsData
				}));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
	useEffect(() => {
		if (tour?.hotel?.lat && tour?.hotel?.lng) {
		  setCenter([tour.hotel.lat, tour.hotel.lng]);
		}
	  }, [tour]);

	const closeImagesGallery = (e) => {
		if (e === 'isEmpty' || e.target === e.currentTarget || e.key === "Escape") {
            showImages(-1);
        }
    };

	const sendApplicationForBooking = async (seatsNumber) => {
		if(!authUser) {
			alert("Что бы забронировать тур, вам необходимо войти в аккаунт");
			return;
		}

		if(authUser.role !== 1) {
			alert("Только обычные пользователи могут бронировать туры!")
			return;
		}

		if(authUser.blockedStatus) {
			alert("Вы не можете забронировать тур, так как ваш профиль был заблокирован!");
			return;
		}

		if(seatsNumber <= 0) {
			alert("Вы ввели некоретное количество мест!")
			return;
		}

		if(selectedRoute.seatsNumber - seatsNumber < 0) {
			alert("К сожалению, в туре не хватает мест!")
			return;
		}


		try {
			const routeId = searchParams.get('routeId');
			await axios.post('https://localhost:7276/booking/add', {userId: authUser.id, routeId: routeId, orderSeatsNumber: seatsNumber }, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});

			setSelectedRoute((prevSelectedRoute) => {
				return {
					...prevSelectedRoute,
					seatsNumber: selectedRoute.seatsNumber - seatsNumber
				}
			})
	
			alert("Тур успешно забронирован!"); 
		} catch (error) {
			if(error.response != undefined) {
				if(error.response.status === 409) {
					alert("Вы уже забронировали этот тур!"); 
					return;
				}
				if(error.response.status === 401) {
					alert("Что бы забронировать тур, вам необходимо войти в аккаунт"); 
					return;
				}
			}
	
			console.log('Ошибка бронировании тура: ', error);
		} 
	}

	const sendReview = async (e) => {
		if(!authUser) { 
			alert("Что бы оставить отзыв, вам необходимо авторизироваться!");
			return;
		}
		
		if(authUser.role !== 1) {
			alert("Только обычные пользователи могут оставлять отзывы!");
			return;
		}

		if(authUser.blockedStatus) {
			alert("Вы не можете оставить отзыв, так как ваш профиль был заблокирован!");
			return;
		}

		const segments = location.pathname.split('/');
		const id = segments[segments.length - 1];

		await axios.post('https://localhost:7276/review/add', {userId: authUser.id, tourId: id, reviewText: review}, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		const response = await axios.get(`https://localhost:7276/review/reviews?tourId=${id}`, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const reviewsData = response.data;
		console.log(reviewsData);
		setTour((prevTour) => ({
			...prevTour, 
			reviews: reviewsData
		}));
	}

	const showImages = (index) => {
		setIndexOfSelectedImage(index);

		if (index !== -1) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}

	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            showImages(-1);
        }
    };

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			{/* <div className="tour-name-and-mark">
				<p>
					<b>{tour.name}</b>
				</p>
			</div> */}

			{/* <div className="tour-images">
				<img className="main-tour-img" src={photosUrl[0]} onClick={() => showImages(0)}/>
				<ImagesAndMap images={photosUrl.slice(1)} showImages={showImages}/>
			</div> */}

			<div className="tour-images-and-name">
				<div className="tour-name-and-main-photo">
					<div className="tour-name-and-mark">
						<p>
							<b>{tour.name}</b>
						</p>
					</div>
					{
						photosUrls.length !== 0 &&
						<div className="main-tour-photo">
							<img src={photosUrls[0]} alt="click to change" onClick={() => showImages(0)}/>
						</div>
					}
				</div>
										
				<div className='other-tour-photos-and-controller'>
					<div className='tour-photos-controller'>
						{photosUrls.length > 1 && <button style={{backgroundColor: mode === 'images' ? 'rgb(236, 236, 236)' : 'transparent'}} onClick={switchToImages}>Фото</button>}
						<button style={{backgroundColor: mode === 'map' ? 'rgb(236, 236, 236)' : 'transparent'}} onClick={switchToMap}>Карта</button>
					</div>
					{
						mode === 'images' &&
						<div className='other-tour-photos'>
							<div>
								{photosUrls.slice(1, 7).map((photoUrl, i) => (<img src={photoUrl} onClick={() => showImages(i + 1)}/>))}
							</div>
							{photosUrls.length > 7 && <button className='more-tour-photos-button' onClick={() => showImages(0)}>Показать больше ...</button>}
						</div>
					}

					{mode === 'map' && 
						<>
							 {center ? (
								<MapContainer className='tour-map' center={center} zoom={10} key={center.join(",")}>
									<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
									<Marker 
									position={center} 
									icon={ new L.Icon({
										iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
										iconSize: [25, 41],
										iconAnchor: [12, 41],
										popupAnchor: [1, -34], 
										shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
										shadowSize: [41, 41], 
									})}
									/>
								</MapContainer>
							) : <p>Загрузка карты...</p>}
							</>
					}

					
				</div>
			</div>

			<BookingMenu selectedRoute={selectedRoute} routes={tour.routes} hotel={tour.hotel} sendApplicationForBooking={sendApplicationForBooking}/>

			<div className="tour-info-and-reservation">
				<div className="tour-info">
					<div className="main-tour-info">
						<div>
							<b>Отель: </b><Link to='/tours'>{tour.hotel.name}</Link>
						</div>
						<div><b>Направление: </b>{tour.hotel.country}, {tour.hotel.city}</div>
						<div><b>Адресс: </b>{tour.hotel.address}</div>
					</div>

					<Rating 
						className="tour-hotel-stars" 
						defaultValue={tour.hotel.starsNumber}
						value={tour.hotel.starsNumber}
						readOnly 
					/>

					<div className="tour-nutrition-type"><b>Тип питания:</b> {tour.hotel.nutritionType}</div>
					<div className="tour-desription">{tour.mainDescription}</div>

					<div className="tour-characteristics">
						<div className="tour-characteristic-group">
							<div><b>Тур: </b></div>
							<div>
								<ul>
									{tour.characteristics.map((characteristic) =>
										<li>{characteristic.name}</li>
									)}
								</ul>
							</div>
						</div>
						<div className="tour-characteristic-group">
							<div><b>В отеле: </b></div>
							<div>
								<ul>
									{tour.hotel.characteristics.map((characteristic) =>
										<li>{characteristic.name}</li>
									)}
								</ul>
							</div>
						</div>
							
						<div className="tour-characteristic-group">
							 <div>
								<b>В номерах: </b>
							</div>
							<div>
								<ul>
									{roomTypesCharacteristics.map((characteristic) =>
										<li>{characteristic.name}</li>
									)}
								</ul>
							</div> 
						</div>
					</div>
				</div>
			</div>

			<div className='tour-review'>
				<h2>Отзывы</h2>
				<div className='tour-review-input-and-send-button'>
					<input type='text' placeholder='Оставте отзыв' value={review} onChange={(e) => setReview(e.target.value)}/>
					<button onClick={sendReview}>Отправить</button>
				</div>

				<div className='tour-review-list'>
					{tour.reviews.map((review) => 
						(<ReviewCard review={review}/>)
					)}
				</div>
			</div>

			{indexOfSelectedImage !== -1 && <ModalImageGallery index={indexOfSelectedImage} images={photosUrls} closeModal={closeImagesGallery} showImages={showImages}/>}
			{/* <ModalImageGallery indexOfSelectedImage={indexOfSelectedImage} images={photosUrl}/> */}
		</div>
	);
}

export default Tour;
