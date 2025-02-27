import '../../styles/tour.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/general/header';
import BookingMenu from '../../components/tour/bookingMenu';
import ReviewCard from '../../components/tour/reviewCard';
import ImagesAndMap from '../../components/tour/imagesAndMap';
import ModalImageGallery from '../../components/general/modalImageGallery';
import noPhoto from '../../img/noPhoto.png';
import star from '../../img/star.svg';
import t1 from '../../img/test_photos/t1.jpg';
import t2 from '../../img/test_photos/t2.jpg';
import t3 from '../../img/test_photos/t3.jpg';
import t4 from '../../img/test_photos/t4.jpg';
import t5 from '../../img/test_photos/t5.jpg';
import t6 from '../../img/test_photos/t6.png';
import t7 from '../../img/test_photos/t7.png';
import t8 from '../../img/test_photos/t8.png';
const token = localStorage.getItem("token");

function Tour() {
    const [searchParams] = useSearchParams(); // Получение query-параметров
	const location = useLocation();

	const authUser = useSelector((state) => state.authUser.value);

	const [photosUrl, setPhotosUrl] = useState([noPhoto]); 
	const [review, setReview] = useState(""); 
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
				
				// setPhotosUrl((prevPhotos) => 
				// 	prevPhotos.map((photo, i) => (i === 0 ? (tourData.photoUrl === "" ? noPhoto : tourData.photoUrl) : photo))
				// );
				setPhotosUrl([tourData.photoUrl, t1, t2, t3, t4, t5, t6, t7, t8]);

				const route  = tourData.routes.find(route => route.id === +routeId)
				if(route === undefined || route === null)  window.location.href = '/error/0';
				setSelectedRoute(tourData.routes.find(route => route.id === +routeId));

				response = await axios.get(`https://localhost:7276/review/reviews?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const reviewsData = response.data;
				console.log(reviewsData);
				setTour((prevTour) => ({
					...prevTour, 
					id: tourData.id,
					name: tourData.name,
					direction: tourData.direction,
					mainDescription: tourData.mainDescription,
					nutritionType: tourData.nutritionType,
					routes: tourData.routes,
					descriptions: tourData.descriptions,
					reviews:  reviewsData
				}));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

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

			<div className="tour-name-and-mark">
				<p>
					<b>{tour.name}</b>
				</p>
			</div>

			<BookingMenu selectedRoute={selectedRoute} routes={tour.routes} direction={{country: tour.direction.country, city: tour.direction.city}} sendApplicationForBooking={sendApplicationForBooking}/>
			<div className="tour-images">
				<img className="main-tour-img" src={photosUrl[0]} onClick={() => showImages(0)}/>
				<ImagesAndMap images={photosUrl.slice(1)} showImages={showImages}/>
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

			{indexOfSelectedImage !== -1 && <ModalImageGallery indexOfSelectedImage={indexOfSelectedImage} images={photosUrl} handleOverlayClick={handleOverlayClick} showImages={showImages}/>}
			{/* <ModalImageGallery indexOfSelectedImage={indexOfSelectedImage} images={photosUrl}/> */}
		</div>
	);
}

export default Tour;
