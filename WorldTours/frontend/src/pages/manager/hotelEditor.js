import '../../styles/hotel-editor.scss';
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup  } from "react-leaflet";
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
import ClickableMap from '../../components/general/clickableMap'
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
	const [characteristics, setCharacteristics] = useState([]);

	const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
	});

	const [hotel, setHotel] = useState({
		id: 0,
		photosFiles: [], // Используем useRef для открытия input
		name: null,
		cityId: null,
		address: null,
		starsNumber: 1,
		mainDescription: null,
		nutritionTypeId: 1,
		characteristics: [],
		roomTypes: []
	});
	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(-1); 
	const [isOpenMap, setIsOpenMap] = useState(false);

	useEffect(() => {
		const getData = async () => {
            try {
				const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

				let response;

				// response = await axios.get(`https://localhost:7276/tour/tour_to_edit?tourId=${id}`, {
                //     headers: {
                //         'Authorization': 'Bearer ' + token,
                //     }
                // });
				// const tourData = response.data;
				// setHotel((prevHotel) => ({
				// 	...prevHotel, // Сохраняем предыдущие значения
				// 	id: tourData.id,
				// 	name: tourData.name,
				// 	mainDescription: tourData.mainDescription,
				// 	nutritionTypeId: tourData.nutritionTypeId,
				// 	descriptions: tourData.descriptions,
				// }));
				// setPhotosUrl([tourData.photoUrl === null ? selectNewPhoto : tourData.photoUrl, t1, t2, t3, t4, t5, t6, t7, t8]);

				// if(tourData.hotelId !== null) {
				// 	response = await axios.get(
				// 		`https://localhost:7276/direction/get?hotelId=${tourData.hotelId}`,
				// 		{
				// 			headers: {
				// 				Authorization: `Bearer ${token}`,
				// 			},
				// 		}
				// 	);
				// 	const directionInfoData = response.data;
				// 	setDirectionInfo(directionInfoData);
				// }

                // response = await axios.get('https://localhost:7276/tour/tour_types', {
                //     headers: {
                //         'Authorization': 'Bearer ' + token,
                //     }
                // });
				// const typesData = response.data;
				// setTourTypes(typesData);

				response = await axios.get('https://localhost:7276/tour/nutrition_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const nutritionTypesData = response.data;
				setNutritionTypes(nutritionTypesData);

				response = await axios.get('https://localhost:7276/hotel/characteristics', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const characteristicsData = response.data;
				console.log(characteristicsData);
				console.log('characteristicsData');
				setCharacteristics(characteristicsData);

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
					setHotel((prevHotel) => {
						return {
							...prevHotel,
							cityId: directionId
						}
					})

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
        <Regions position={{left: '19%', top: '6%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={direction.countryId} position={{left: '22%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
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

	const loadPhotos = (e) => {
		const files = Array.from(e.target.files); // Получаем массив файлов

		if (files) {
			setHotel((prevHotel) => ({
			...prevHotel,
			photosFiles: files, // Сохраняем файл в состоянии
			}));
		}

		const newImages = files.map(file => URL.createObjectURL(file)); // Создаём ссылки на изображения
		setPhotosUrl(newImages); // Добавляем новые фото в массив

        // if (e.target.files && e.target.files[0]) {
		// 	const reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		setPhotosUrl((prevPhotos) => 
		// 			prevPhotos.map((photo, i) => (i === 0 ? e.target.result : photo))
		// 		);
		// 	};
		// 	reader.readAsDataURL(e.target.files[0]);
        // }

		// const file = e.target.files[0]; // Получаем выбранный файл
		// if (file) {
		// 	setHotel((prevHotel) => ({
		// 	...prevHotel,
		// 	photosFiles: file, // Сохраняем файл в состоянии
		// 	}));
		// }
    };

	const changeHotel = (e) => {
		const { name, value } = e.target;
        setHotel((prevHotel) => ({
			...prevHotel,
            [name]: value,
        }));
	}
    // Функция для открытия input по нажатию на изображение
    const setPhotoUropenFileDialogToSelectPhoto = () => {
        hotel.photosFiles.current.click();
    };

	const changeCharacteristics = (changedCharacteristic, value) => {
		console.log('changedCharacteristic');
		console.log(changedCharacteristic);
		console.log(value);
		if(value) {

			const newCharacteristics = [...hotel.characteristics];
			newCharacteristics.push(changedCharacteristic);
			setHotel((prevHotel) => {
				return {
					...prevHotel,
					characteristics: newCharacteristics
				}
			})

			// setHotel((prevHotel) => ({
			// 	...prevHotel,
			// 	characteristics: [...prevHotel.characteristics, changedCharacteristic]
			// }));
		}
		else {
			setHotel((prevHotel) => ({
				...prevHotel,
				characteristics: prevHotel.characteristics.filter((characteristic) => characteristic.id !== changedCharacteristic.id)
			}));
		}


	};

	// const addRoute = (routes) => {
	// 	if(authUser.blockedStatus) {
	// 		alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
	// 		return;
	// 	}

	// 	 setTour((prevTour) => ({
	// 		...prevTour,
	// 		["routes"]: routes,
	// 	}));
	// }

	const saveHotel = async () => {
		console.log(hotel);
		// if(authUser.blockedStatus) {
		// 	alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
		// 	return;
		// }

		// if(
		// 	(hotel.name === "" || hotel.name === null) ||
		// 	(hotel.mainDescription === "" || hotel.mainDescription === null) ||
		// 	(hotel.hotelId === "" || hotel.hotelId === null) ||
		// 	(hotel.nutritionTypeId === "" || hotel.nutritionTypeId === null) ||
		// 	(hotel.tourTypeId === "" || hotel.tourTypeId === null)
		// ) {
		// 	alert("Вы не заполнили все поля!")
		// 	return;
		// }

		// if(tour.routes ===  null || tour.routes.length === 0) {
		// 	alert("Вы не добавили ни одного маршрута!")
		// 	return;
		// }

		const segments = location.pathname.split('/');
    	const id = segments[segments.length - 1];

		if(id === '0') {
			await axios.post('https://localhost:7276/hotel/add', hotel, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			// window.location.href = '/tours';
		}
		else {
			await axios.put('https://localhost:7276/tour/edit', hotel, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/tours';
		}
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

	const addRoomType = (roomTypes) => {
		console.log(hotel);
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
			return;
		}

		setHotel((prevHotel) => ({
			...prevHotel,
			["roomTypes"]: roomTypes,
		}));
	}

	return (
		<div className="hotel-editor narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<RoomTypesMenu roomTypes={hotel.roomTypes} setRoomTypes={addRoomType} saveHotel={saveHotel}/>
			<div className="hotel-editor-images-and-name">
				<div className="hotel-editor-name-and-main-photo">
					<div className="hotel-editor-name">
						<div>
							<b>Название отеля</b>
						</div>
						<TextField
							className='hotel-editor-name-input' 
							name='name'
							sx={{"& input": {fontSize: "19px"}, }} 
							placeholder='Название' type="search" 
							variant="standard"
							onChange={changeHotel}
						/>
					</div>
					<div className="main-hotel-editor-photo">
						<img src={photosUrl[0]} alt="click to change" onClick={() => showImages(0)}/>
						<input type="file" multiple  ref={ hotel.photosFiles} onChange={loadPhotos} style={{ display: 'none' }} accept="image/*"/>
					</div>
				</div>
				
				<div className='other-hotel-photos-and-controller'>
					<div className='hotel-photos-controller'>
						<button onClick={setPhotoUropenFileDialogToSelectPhoto}><b>Загрузить изображения</b></button>
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
								<TextField name="address" sx={{"& input": {fontSize: "19px"}, }} className='hotel-editor-input-address' placeholder='улица, дом' type="search" variant="standard" onChange={changeHotel}/>
							</div>
						</div>

						<img className='hotel-editor-map' src={map} onClick={() => setIsOpenMap(true)}/>
					</div>

					<div className="hotel-editor-stars">
						<div><b>Количество звёзд: </b></div>
						<Rating 
							className="input-hotel-stars" 
							name="starsNumber" 
							defaultValue={hotel.starsNumber} 
							precision={1}
							onChange={(e) => {setHotel((prevHotel) => ({
								...prevHotel,
								starsNumber: +e.target.value,
							}));}}
						/>
					</div>

					<div className="hotel-editor-desription">
						<div><b>Общее описание</b></div>
						<TextField className='hotel-editor-desription-input'
							name="mainDescription"
							multiline
							rows={10}
							maxRows={20}
							placeholder='Описание'
							onChange={changeHotel}
						/>
					</div>

					<div className='nutrition-type'>
						<div><b>Тип питание</b></div>
						<Select className='nutrition-type-select' name="nutritionTypeId" value={hotel.nutritionTypeId} onChange={changeHotel}>
							{nutritionTypes.map((nutritionType) => (
								<MenuItem value={nutritionType.id}>
									{nutritionType.name}
								</MenuItem>
							))}
						</Select>
					</div>
								
					<div className="tour-editor-characteristics"> {/*комп*/}
							{characteristics.map((characteristic) => (
								<div className="tour-editor-characteristic">
									<div>
										<b>{characteristic.name}</b>
									</div>
									<div>
										<div>
										<input
											type="checkbox"
											onChange={(e) =>{changeCharacteristics(characteristic, e.target.value)}}
										/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

			</div>

			{indexOfSelectedImage !== -1 && <ModalImageGallery indexOfSelectedImage={indexOfSelectedImage} images={photosUrl} handleOverlayClick={handleOverlayClick} showImages={showImages}/>}
			
			<Modal open={isOpenMap} onClose={() => setIsOpenMap(false)} className='tour-map-on-modal'>
				{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.0220734032202!2d27.616216344539804!3d53.876858255031635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce18581d62a7%3A0xfbca977ea03db2c7!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDMyLzEsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMIDIyMDEwNw!5e0!3m2!1sru!2sby!4v1739876954826!5m2!1sru!2sby" width="600" height="450" style={{border: '0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
				<ClickableMap/>
			</Modal>
		</div>
	);
}

export default HotelEditor;
