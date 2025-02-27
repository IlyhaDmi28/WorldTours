import '../../styles/hotel-editor.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../../components/general/header';
import ImagesAndMap from '../../components/tour/imagesAndMap';
import ModalImageGallery from '../../components/general/modalImageGallery';
import { Rating  } from "@mui/material";
import { TextField   } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Regions from '../../components/general/regions';
import Countries from '../../components/general/countries';
import Cities from '../../components/general/cities';
import Hotels from '../../components/general/hotels';
import RoomTypesMenu from '../../components/hotelEditor/roomTypesMenu';
import TourType from '../../components/tours/tourType'
import ReviewCardForEitor from '../../components/tourEditor/reviewCardForEitor';
import selectNewPhoto from '../../img/selectNewPhoto.png';
import star from '../../img/star.svg';
import delete3 from '../../img/delete3.svg'
import map from '../../img/map.png'
import t1 from '../../img/test_photos/t1.jpg';
import t2 from '../../img/test_photos/t2.jpg';
import t3 from '../../img/test_photos/t3.jpg';
import t4 from '../../img/test_photos/t4.jpg';
import t5 from '../../img/test_photos/t5.jpg';
import t6 from '../../img/test_photos/t6.png';
import t7 from '../../img/test_photos/t7.png';
import t8 from '../../img/test_photos/t8.png';
const token = localStorage.getItem("token");

function HotelEditor() {
	const authUser = useSelector((state) => state.authUser.value);
	const location = useLocation();
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
		address: null
	});
	
	const [tourTypes, setTourTypes] = useState([]); 
	const [photosUrl, setPhotosUrl] = useState([selectNewPhoto]); 
	const [nutritionTypes, setNutritionTypes] = useState([]);
	const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
	});

	const [tour, setTour] = useState({
		photoFile: useRef(null), // Используем useRef для открытия input
		id: 0,
		name: null,
		hotelId: null,
		mainDescription: null,
		nutritionTypeId: null,
		tourTypeId: null,
		routes: [],
		descriptions: [],
		reviews: []
	});
	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(-1); 
	const [isOpenMap, setIsOpenMap] = useState(false);

	const changeCharacteristics = async (id) => {
		try {
			setTour((prevTour) => ({
				...prevTour,
				["tourTypeId"]: id,
			}));

			const response = await axios.get(`https://localhost:7276/tour/characteristics?tourTypeId=${id}`, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});

			const characteristicsData = response.data
			setTour((prevTour) => {
				return {
					...prevTour,
					descriptions: characteristicsData,
				};

			});
		} catch (error) {
			console.error('Ошибка загрузки данных:', error);
		} 
    };

	useEffect(() => {
		const getData = async () => {
            try {
				const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

				let response;
				response = await axios.get(`https://localhost:7276/tour/tour_to_edit?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const tourData = response.data;
				await changeCharacteristics(tourData.tourTypeId);
				setTour((prevTour) => ({
					...prevTour, // Сохраняем предыдущие значения
					id: tourData.id,
					name: tourData.name,
					hotelId: tourData.hotelId,
					mainDescription: tourData.mainDescription,
					nutritionTypeId: tourData.nutritionTypeId,
					tourTypeId: tourData.tourTypeId,
					routes: tourData.routes,
					descriptions: tourData.descriptions,
				}));
				if(id === '0') await changeCharacteristics(tourData.tourTypeId);  
				setPhotosUrl([tourData.photoUrl === null ? selectNewPhoto : tourData.photoUrl, t1, t2, t3, t4, t5, t6, t7, t8]);

				if(tourData.hotelId !== null) {
					response = await axios.get(
						`https://localhost:7276/direction/get?hotelId=${tourData.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					const directionInfoData = response.data;
					setDirectionInfo(directionInfoData);
				}

                response = await axios.get('https://localhost:7276/tour/tour_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const typesData = response.data;
				setTourTypes(typesData);

				response = await axios.get('https://localhost:7276/tour/nutrition_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const nutritionTypesData = response.data;
				setNutritionTypes(nutritionTypesData);

				response = await axios.get(`https://localhost:7276/review/reviews?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const reviewsData = response.data;
				setTour((prevTour) => ({
					...prevTour, 
					reviews: reviewsData
				}));

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (direction.regionId != null && direction.countryId != null && direction.cityId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/get?countryId=${direction.countryId}&cityId=${direction.cityId}`,
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
		};
	
		getDirectionInfo();
	}, [direction]);

	const selectDirection = (directionId) => {
		setDirection((prevDirection) => {
			switch (directionsPageInndex) {
				case 1:
					return {
						...prevDirection,
						regionId: directionId
					}
				case 2:
					return {
						...prevDirection,
						countryId: directionId
					}
				case 3:
					return {
						...prevDirection,
						cityId: directionId
					}
				default:
					break;
			}
		});
	};
	
	const closeDirections = () => {
		setDirectionsPageInndex(0);
		setDirection({
			hotel: null,
			country: null,
			city: null,
			starsNumber: null
		});
	}

	const directions = [
        null,
        <Regions position={{left: '25%', top: '5%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={direction.countryId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
    ]

    const deleteSelectedDirection = () => {
		setDirectionInfo({
			country: null,
			city: null,
		});

		setDirectionInfo((prevDirectionInfo) => {
			return {
				...prevDirectionInfo,
				country: null,
				city: null,
			}
		});

		setDirection({
			regionId: null,
			countryId: null,
			cityId: null,
		});
	}

	const changePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setPhotosUrl((prevPhotos) => 
					prevPhotos.map((photo, i) => (i === 0 ? e.target.result : photo))
				);
			};
			reader.readAsDataURL(e.target.files[0]);
        }

		const file = e.target.files[0]; // Получаем выбранный файл
		if (file) {
			setTour((prevState) => ({
			...prevState,
			photoFile: file, // Сохраняем файл в состоянии
			}));
		}
    };

	const changeTour = (e) => {
		const { name, value } = e.target;
        setTour((prevTour) => ({
			...prevTour,
            [name]: value,
        }));
	}
    // Функция для открытия input по нажатию на изображение
    const setPhotoUropenFileDialogToSelectPhoto = () => {
        tour.photoFile.current.click();
    };

	const changeDescription = (id) => {
		setTour((prevTour) => ({
			...prevTour,
			descriptions: prevTour.descriptions.map((item) => 
				item.characteristic.id === id ? {
					...item,
					description: {
						...item.description,
						value: !item.description.value, // Инвертируем значение
					},
				} : item
			),
		}));
	};

	const addRoute = (routes) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
			return;
		}

		 setTour((prevTour) => ({
			...prevTour,
			["routes"]: routes,
		}));
	}

	const saveTour = async () => {
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
			return;
		}

		if(
			(tour.name === "" || tour.name === null) ||
			(tour.mainDescription === "" || tour.mainDescription === null) ||
			(tour.hotelId === "" || tour.hotelId === null) ||
			(tour.nutritionTypeId === "" || tour.nutritionTypeId === null) ||
			(tour.tourTypeId === "" || tour.tourTypeId === null)
		) {
			alert("Вы не заполнили все поля!")
			return;
		}

		if(tour.routes ===  null || tour.routes.length === 0) {
			alert("Вы не добавили ни одного маршрута!")
			return;
		}

		const segments = location.pathname.split('/');
    	const id = segments[segments.length - 1];

		if(id === '0') {
			await axios.post('https://localhost:7276/tour/add', tour, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/tours';
		}
		else {
			await axios.put('https://localhost:7276/tour/edit', tour, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/tours';
		}
	}

	const deleteReview = async (id) => {
		await axios.delete(`https://localhost:7276/review/delete?tourId=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		const segments = location.pathname.split('/');
    	const tourId = segments[segments.length - 1];

		const response = await axios.get(`https://localhost:7276/review/reviews?tourId=${tourId}`, {
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
		<div className="hotel-editor narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<RoomTypesMenu saveTour={saveTour} directionInfo={directionInfo} routes={tour.routes} setRoutes={addRoute}/>
			<div className="hotel-editor-images-and-name">
				<div className="hotel-editor-name-and-main-photo">
					<div className="hotel-editor-name">
						<div>
							<b>Название отеля</b>
						</div>
						<TextField className='hotel-editor-name-input' sx={{"& input": {fontSize: "19px"}, }} placeholder='Название' type="search" variant="standard"/>

						{/* <input name="name"type='text' value={tour.name} onChange={changeTour}/> */}
					</div>
					<div className="main-hotel-editor-photo">
						<img src={photosUrl[0]} alt="click to change" onClick={setPhotoUropenFileDialogToSelectPhoto}/>
						<input type="file" ref={ tour.photoFile} onChange={changePhoto} style={{ display: 'none' }} accept="image/*"/>
					</div>
				</div>
				
				<div className='other-hotel-photos-and-controller'>
					<div className='hotel-photos-controller'>
						<button><b>Загрузить фото</b></button>
					</div>
					<div className='other-hotel-photos'>
						<div>
							{photosUrl.slice(1, 7).map((photoUrl, i) => (<img src={photoUrl} onClick={() => showImages(i + 1)}/>))}
						</div>
						{photosUrl.length > 7 && <button className='more-hotel-photos-button' onClick={() => showImages(0)}>Показать больше ...</button>}
					</div>
				</div>
				{/* <ImagesAndMap images={photosUrl.slice(1)} showImages={showImages}/> */}
			</div>

			<div className="hotel-editor-info-and-reservation">
				<div className="hotel-editor-info">

					{directions[directionsPageInndex]} 
					<div className='hotel-editor-location'>
						<div className='select-city-and-address-of-hotel'>
							<div>
								<div><b>Страная, город: </b></div>

								{directionInfo.city !== null ? 
									(<>
										<div className='hotel-editor-loaction-info'>{directionInfo.country}, {directionInfo.city} </div> 
										<DeleteIcon onClick={deleteSelectedDirection}/>
									</>) :
									<button onClick={() => setDirectionsPageInndex(directionsPageInndex === 0 ? 1 : 0)}>
										<b>Выбрать страну, город</b>
									</button>
								}
							</div>

							<div>
								<div><b>Адресс: </b></div>
								<TextField  sx={{"& input": {fontSize: "19px"}, }} className='hotel-editor-input-address' placeholder='улица, дом' type="search" variant="standard"/>
							</div>
						</div>

						<img className='hotel-editor-map' src={map} onClick={() => setIsOpenMap(true)}/>
					</div>

					<div className="hotel-editor-stars">
						<div><b>Количество звёзд: </b></div>
						<Rating className="input-hotel-stars" name="hotel-stars" defaultValue={1} precision={1}/>
					</div>

					<div className="hotel-editor-desription">
						<div><b>Общее описание</b></div>
						<TextField className='hotel-editor-desription-input'
							multiline
							rows={10}
							maxRows={20}
							placeholder='Описание'
						/>
						{/* <textarea name='mainDescription' value={tour.mainDescription} onChange={changeTour}/> */}
					</div>

					<div className='nutrition-type'>
						<div><b>Тип питание</b></div>
						<Select className='nutrition-type-select' value={tour.nutritionTypeId} onChange={changeTour}>
							{nutritionTypes.map((nutritionType) => (
								<MenuItem value={nutritionType.id}>
									{nutritionType.name}
								</MenuItem>
							))}
						</Select>
						{/* <select name='nutritionTypeId' value={tour.nutritionTypeId} onChange={changeTour}>
                            {nutritionTypes.map((nutritionType) => (
                                <option 
                                    key={nutritionType.id}
                                    value={nutritionType.id}
                                >
                                    {nutritionType.name}
                                </option>
                            ))}
                        </select> */}
					</div>

					{/* <div className='nutrition-type'>
						<div><b>Тип тура</b></div>
						<select name='nutritionTypeId' value={tour.tourTypeId} onChange={changeTour}>
                            {tourTypes.map((tourType) => (
                                <option 
                                    key={tourType.id}
                                    value={tourType.id}
                                >
									
                                    {tourType.name}
                                </option>
                            ))}
                        </select>
					</div> */}

					<div className="tour-editor-characteristics"> {/*комп*/}
							{tour.descriptions.map((description) => (
								<div className="tour-editor-characteristic">
									<div>
										<b>{description.characteristic.name}</b>
									</div>
									<div>
										<div>
										<input
											type="checkbox"
											checked={description.description.value}
											onChange={() => changeDescription(description.characteristic.id)}
										/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

			</div>

			<div className='tour-review'>
				<h2>Отзывы</h2>

				<div className='tour-review-list'>
					{tour.reviews.map((review) => 
						(<ReviewCardForEitor review={review} deleteReview={deleteReview}/>)
					)}
				</div>
			</div>

			{indexOfSelectedImage !== -1 && <ModalImageGallery indexOfSelectedImage={indexOfSelectedImage} images={photosUrl} handleOverlayClick={handleOverlayClick} showImages={showImages}/>}
			
			<Modal open={isOpenMap}
				onClose={() => setIsOpenMap(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className='tour-map-on-modal'
			>
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.0220734032202!2d27.616216344539804!3d53.876858255031635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce18581d62a7%3A0xfbca977ea03db2c7!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDMyLzEsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMIDIyMDEwNw!5e0!3m2!1sru!2sby!4v1739876954826!5m2!1sru!2sby" width="600" height="450" style={{border: '0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</Modal>
		</div>
	);
}

export default HotelEditor;
