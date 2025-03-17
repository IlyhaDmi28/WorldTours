import '../styles/tour-editor.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField   } from "@mui/material";
import { Rating  } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/general/header';
import ImagesAndMap from '../components/tour/imagesAndMap';
import ModalImageGallery from '../components/general/modalImageGallery';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Hotels from '../components/general/hotels';
import RoutesMenu from '../components/tourEditor/routesMenu';
import TourType from '../components/tours/tourType'
import ReviewCardForEitor from '../components/tourEditor/reviewCardForEitor';
import selectNewPhoto from '../img/selectNewPhoto.png';
const token = localStorage.getItem("token");

function TourEditor() {
	const authUser = useSelector((state) => state.authUser.value);
	const location = useLocation();
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		hotel: null,
		country: null,
		city: null,
		starsNumber: null
	});
	
	const [tourTypes, setTourTypes] = useState([]); 
	const [photosUrls, setPhotosUrls] = useState([selectNewPhoto]); 
	const [photosFiles, setPhotosFiles] = useState([]); 
	const [characteristics, setCharacteristics] = useState([]);

	const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		hotelId: null,
	});

	const [tour, setTour] = useState({
		id: 0,
		name: null,
		hotelId: null,
		mainDescription: null,
		nutritionTypeId: null,
		tourTypeId: null,
		routes: [],
		characteristics: [],
		reviews: []
	});

	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(-1); 
	const [indexOfTourTypePage, setIndexOfTourTypePage] = useState(0); 
	const [isLoadHotelPhotos, setIsLoadHotelPhotos] = useState(false); 

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
				case 4:
					setTour((prevTour) => {
						return {
							...prevTour,
							hotelId: directionId
						}
					})

					return {
						...prevDirection,
						hotelId: directionId
					}
				default:
					break;
			}
		});
	};
	
	const closeDirections = () => {
		setDirectionsPageInndex(0);
		setDirection({
			regionId: null,
			countryId: null,
			cityId: null,
			hotelId: null,
		});
	}

	const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={direction.countryId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Hotels cityId={direction.cityId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
    ]

	useEffect(() => {
		const getData = async () => {
            try {
				const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

				let response;

				response = await axios.get(`https://localhost:7276/tour/tour_for_editor?tourId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const tourData = response.data;
				setTour((prevTour) => ({
					...prevTour, // Сохраняем предыдущие значения
					id: tourData.id,
					name: tourData.name,
					hotelId: tourData.hotelId,
					mainDescription: tourData.mainDescription,
					tourTypeId: tourData.tourTypeId,
					routes: tourData.routes,
					characteristics: tourData.characteristics,
				}));

				// setPhotosUrls(tourData.photoUrl === null ? [] : tourData.photoUrl);
				setPhotosUrls([]);
				// setPhotosUrls([tourData.photoUrl === null ? selectNewPhoto : tourData.photoUrl, t1, t2, t3, t4, t5, t6, t7, t8]);

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
				const tourTypesData = response.data;
				setTourTypes(tourTypesData);

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

				response = await axios.get('https://localhost:7276/tour/characteristics', {
					headers: {
						'Authorization': 'Bearer ' + token,
					}
				});
				const characteristicsData = response.data;
				console.log('asaasdsd');
				console.log(characteristicsData);
				setCharacteristics(characteristicsData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (direction.regionId != null && direction.countryId != null && direction.cityId != null && direction.hotelId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/get?countryId=${direction.countryId}&cityId=${direction.cityId}&hotelId=${direction.hotelId}`,
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

    const deleteSelectedDirection = () => {
		setDirectionInfo({
			hotel: null,
			country: null,
			city: null,
			starsNumber: null
		});

		setDirection({
			regionId: null,
			countryId: null,
			cityId: null,
			hotelId: null,
		});

		setTour((prevTour) => {

			return {
				...prevTour,
				hotelId: null
			}
		});
	}

	const loadPhotos = (e) => {
		const files = Array.from(e.target.files); 
	
		const newImages = files.map(file => URL.createObjectURL(file)); // Создаём ссылки на изображения
		setPhotosUrls(newImages); // Добавляем новые фото в массив  
	};

	const loadHotelPhotos = async () => {
		if(direction.hotelId !== null) {
			const response = await axios.get(
				`https://localhost:7276/hotel/hotel_for_editor?hotelId=${direction.hotelId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const hotelData = response.data;
			setPhotosUrls(prevPhotos => [...prevPhotos, ...hotelData.photosUrls]);
			console.log(hotelData);

			setIsLoadHotelPhotos(true);
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
        photosFiles.current.click();
    };

	const changeCharacteristics = (changedCharacteristic, value) => {
		if(value) {
			const newCharacteristics = [...tour.characteristics];
			newCharacteristics.push(changedCharacteristic);
			setTour((prevTour) => {
				return {
					...prevTour,
					characteristics: newCharacteristics
				}
			})
		}
		else {
			setTour((prevTour) => ({
				...prevTour,
				characteristics: prevTour.characteristics.filter((characteristic) => characteristic.id !== changedCharacteristic.id)
			}));
		}
	};

	const setRoutes = (routes) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
			return;
		}

		 setTour((prevTour) => ({
			...prevTour,
			["routes"]: routes,
		}));
	}

	//Вынести желательно(низ)
	const createFileFromObjectUrl = async (objectUrl, fileName) => {
		const response = await axios.get(objectUrl, { responseType: "blob" }); // Загружаем как Blob
		const blob = response.data;
		return new File([blob], fileName, { type: blob.type }); // Создаём новый File
	};
	
	const convertObjectUrlsToFiles = async (objectUrls) => {
		const filePromises = objectUrls.map((url, index) =>
			createFileFromObjectUrl(url, `copied_image_${index}.jpg`)
		);
		return await Promise.all(filePromises);
	};
	//Вынести желательно(верх)

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

	const closeImagesGallery = (e) => {
        if (e.target === e.currentTarget || e.key === "Escape") {
            showImages(-1);
        }
    };

	const HasCharacteristic = (characteristic) => {	
		return tour.characteristics.some((ch) => ch.id === characteristic.id);
	}

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div 
				className="tour-editor-images-and-name"
				style={photosUrls.length === 0 ? {height: 'auto'} : {}}
			>
				<div className="tour-editor-name-and-main-photo">
					<div className="tour-editor-name">
						<div>
							<b>Название тура</b>
						</div>
						<TextField
							className='tour-editor-name-input' 
							name='name'
							sx={{"& input": {fontSize: "19px"}, }} 
							placeholder='Название' type="search" 
							variant="standard"
							value={tour.name}
							onChange={changeTour}
						/>
					</div>
					{
						photosUrls.length !== 0 &&
						<div className="main-tour-editor-photo">
							<img src={photosUrls[0]} alt="click to change" onClick={() => showImages(0)}/>
						</div>
					}
					{/* <div className="main-tour-editor-photo">
						<img src={photosUrls[0]} alt="click to change" onClick={() => showImages(0)}/>
						<input type="file" multiple  
						ref={ photosFiles} 
						onChange={loadPhotos} 
						style={{ display: 'none' }} accept="image/*"/>
					</div> */}
				</div>
							
				<div className='other-tour-photos-and-controller'>
					<div className='tour-photos-controller'>
						<button onClick={setPhotoUropenFileDialogToSelectPhoto}><b>Загрузить изображения</b></button>
						{direction.hotelId !== null && !isLoadHotelPhotos && <button onClick={loadHotelPhotos}><b>Добавить фотографии отеля</b></button>}
						<input
							type="file" 
							multiple  
							ref={ photosFiles} 
							onChange={loadPhotos} 
							style={{ display: 'none' }} accept="image/*"
						/>
					</div>
					{
						photosUrls.length !== 0 &&
						<div className='other-tour-photos'>
								<div>
									{photosUrls.slice(1, 7).map((photoUrl, i) => (<img src={photoUrl} onClick={() => showImages(i + 1)}/>))}
								</div>
								{photosUrls.length > 7 && <button className='more-tour-photos-button' onClick={() => showImages(0)}>Показать больше ...</button>}
						</div>
					}
					
				</div>
			</div>

			<RoutesMenu saveTour={saveTour} directionInfo={directionInfo} routes={tour.routes} setRoutes={setRoutes}/>

			<div className="tour-editor-info-and-reservation">
				<div className="tour-editor-info">
					{directions[directionsPageInndex]} 
					{directionInfo.hotel !== null ? 
					(<>
						<div className="main-tour-editor-info">
							<div className='tour-editor-loaction-info'>
								<div><b>{directionInfo.hotel}</b></div>
								<div>{directionInfo.country}, {directionInfo.city}</div>
							</div> 
							<DeleteIcon onClick={deleteSelectedDirection}/>
						</div>

						<Rating 
							className="tour-editor-hotel-stars" 
							name="starsNumber" 
							defaultValue={directionInfo.starsNumber}
							readOnly 
						/>
					</>) :
						<button className='select-tour-direction' onClick={() => setDirectionsPageInndex(directionsPageInndex === 0 ? 1 : 0)}>
							<b>Выбрать страну, город</b>
						</button>
					}

					<div className="tour-editor-desription">
						<div><b>Общее описание</b></div>
						<TextField className='tour-editor-desription-input'
							name="mainDescription"
							multiline
							value={tour.mainDescription}
							rows={10}
							maxRows={20}
							placeholder='Описание'
							onChange={changeTour}
						/>
					</div>

					{/* <div className="tour-editor-desription">
						<div><b>Описание</b></div>
						<textarea name='mainDescription' value={tour.mainDescription} onChange={changeTour}/>
					</div> */}

					{/* <div className='nutrition-type'>
						<div><b>Тип питание</b></div>
						<select name='nutritionTypeId' value={tour.nutritionTypeId} onChange={changeTour}>
                            {nutritionTypes.map((nutritionType) => (
                                <option 
                                    key={nutritionType.id}
                                    value={nutritionType.id}
                                >
                                    {nutritionType.name}
                                </option>
                            ))}
                        </select>
					</div> */}

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

					<div className="select-tour-types">
						<ArrowBackIosNewIcon 
							className="arrow-navigation-tour-type" 
							onClick = {()=>{
								setIndexOfTourTypePage(indexOfTourTypePage !== 0 ? indexOfTourTypePage - 1 : indexOfTourTypePage) 
							}}
							style={{
								visibility: indexOfTourTypePage === 0 ? 'hidden' : 'visible'
							}}
						/>
						{/* <button className='tour-types-nav-page-button'>B</button> */}

						<div className="tour-types-list">
							{tourTypes.slice(indexOfTourTypePage, indexOfTourTypePage + 5).map((tourType) => (<TourType tourType={tourType} selectedTourType={tour.tourTypeId} setTourType={() => changeCharacteristics(tourType.id)}/>))}
						</div>
						
						<ArrowForwardIosIcon 
							className="arrow-navigation-tour-type"
							onClick = {()=>{
								setIndexOfTourTypePage(indexOfTourTypePage + 5 <= tourTypes.length - 1 ? indexOfTourTypePage + 1 : indexOfTourTypePage) 
							}}
							style={{
								visibility: indexOfTourTypePage + 5 >= tourTypes.length  ? 'hidden' : 'visible'
							}}
						/>

						{/* <button className='tour-types-nav-page-button'>N</button> */}
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
											checked={HasCharacteristic(characteristic)}
											onChange={(e) =>{changeCharacteristics(characteristic, e.target.checked)}}
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
			{indexOfSelectedImage !== -1 && <ModalImageGallery index={indexOfSelectedImage} setImages={setPhotosUrls} images={photosUrls} closeModal={closeImagesGallery} showImages={showImages}/>}

		</div>
	);
}

export default TourEditor;
