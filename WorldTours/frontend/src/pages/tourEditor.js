import '../styles/tourEditor.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/general/header';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Hotels from '../components/general/hotels';
import RoutesMenu from '../components/tourEditor/routesMenu';
import TourType from '../components/tours/tourType'
import selectNewPhoto from '../img/selectNewPhoto.png';
import star from '../img/star.svg';
import delete3 from '../img/delete3.svg'
const token = localStorage.getItem("token");

function TourEditor() {
	const location = useLocation();
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		hotel: null,
		country: null,
		city: null,
		starsNumber: null
	});

	const [tourTypes, setTourTypes] = useState([]); 
	const [photoUrl, setphotoUrl] = useState(selectNewPhoto); 
	const [nutritionTypes, setNutritionTypes] = useState([]);
	const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		hotelId: null,
	});

	const [tour, setTour] = useState({
		PhotoFile: useRef(null), // Используем useRef для открытия input
		id: 0,
		name: null,
		hotelId: null,
		mainDescription: null,
		nutritionTypeId: null,
		tourTypeId: null,
		routes: [],
		descriptions: [],
	});

	const changeCharacteristics = async (id) => {
		try {
			setTour((prevTour) => ({
				...prevTour,
				["tourTypeId"]: id,
			}));

			const response = await axios.get(`https://localhost:7276/tour/characteristics?id=${id}`, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});
			const characteristicsData = response.data
			console.log(characteristicsData);
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
				response = await axios.get(`https://localhost:7276/tour/GetTourToEdit?id=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const tourData = response.data;
				console.log(tourData);
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
				// setTourphotoUrl(tourData.Photo);
				setphotoUrl(tour.photoUrl === null ? selectNewPhoto : tourData.photoUrl);
				changeCharacteristics(tourData.tourTypeId);

				if(tourData.hotelId !== null) {
					response = await axios.get(
						`https://localhost:7276/direction/direction?hotelId=${tourData.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					const directionInfoData = response.data;
					console.log(directionInfoData);
					setDirectionInfo(directionInfoData);
				}

                response = await axios.get('https://localhost:7276/tour/types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const typesData = response.data;
				console.log(typesData);
				setTourTypes(typesData);

				response = await axios.get('https://localhost:7276/tour/NutritionTypes', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const nutritionTypesData = response.data;
				console.log(nutritionTypesData);
				setNutritionTypes(nutritionTypesData);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	useEffect(() => {
		console.log ('хуй');
		const getDirectionInfo = async () => {
			if (direction.regionId != null && direction.countryId != null && direction.cityId != null && direction.hotelId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/direction?countryId=${direction.countryId}&cityId=${direction.cityId}&hotelId=${direction.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
	
					console.log(response.data);
					setDirectionInfo(response.data);
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}
		};
	
		getDirectionInfo(); // Вызов асинхронной функции
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
			hotel: null,
			country: null,
			city: null,
			starsNumber: null
		});
	}

	const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={direction.countryId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Hotels cityId={direction.cityId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
    ]

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

	const changePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
			setphotoUrl(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        }

		const file = e.target.files[0]; // Получаем выбранный файл
		if (file) {
			setTour((prevState) => ({
			...prevState,
			PhotoFile: file, // Сохраняем файл в состоянии
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
    const openFileDialogToSelectAva = () => {
        tour.PhotoFile.current.click();
    };

	const changeDescription = (id) => {
		setTour((prevTour) => ({
			...prevTour,
			descriptions: prevTour.descriptions.map((item) => 
				item.characteristic.id === id 
					? {
						...item,
						description: {
							...item.description,
							value: !item.description.value, // Инвертируем значение
						},
					}
					: item
			),
		}));
	};

	const saveTour = async () => {
		await axios.post('https://localhost:7276/tour/AddTour', tour, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			}
	  });
	}

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="tour-editor-name">
					<div>
						<b>Название тура</b>
					</div>
					<input name="name"type='text' value={tour.name} onChange={changeTour}/>
			</div>

			<div className="tour-editor-images">
				<div className="main-tour-editor-img">
					<img src={photoUrl} alt="click to change" onClick={openFileDialogToSelectAva}/>
                    <input type="file" ref={ tour.PhotoFile} onChange={changePhoto} style={{ display: 'none' }} accept="image/*"/>
				</div>
				

				{/* <div className="other-tour-editor-images-and-map">
					<div className="select-tour-editor-images-or-map">
						<button>Фото</button>
						<button>Карта</button>
					</div>

					<div className="other-tour-editor-images">
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
					</div>

					<button className="more-tour-editor-img-button">Больше фото</button>
				</div> */}
			</div>

			<div className="tour-editor-info-and-reservation">
				<div className="tour-editor-info">
					{directions[directionsPageInndex]} 
					{directionInfo.hotel !== null ? (
						<>
							<div className="main-tour-editor-info">
								<div>
									<b>{directionInfo.hotel}</b>
										<button onClick={deleteSelectedDirection}>
										<img src={delete3}/>
									</button>
								</div>
								<div>{directionInfo.country}, {directionInfo.city}</div>
							</div>

							<div className="tour-editor-hotel-stars">
								{Array(directionInfo.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
							</div>
						</>
					) : (
						<>
							<button className='select-tour-direction' onClick={() => setDirectionsPageInndex(directionsPageInndex === 0 ? 1 : 0)}>
								Нажмите, что бы добавить пункт направления
							</button>
						</>
					)}

					<div className="tour-editor-desription">
						<div><b>Описание</b></div>
						<textarea name='mainDescription' value={tour.mainDescription} onChange={changeTour}/>
					</div>

					<div className='nutrition-type'>
						<div><b>Тип питание</b></div>
						<select name='nutritionTypeId' onChange={changeTour}>
                            {nutritionTypes.map((nutritionType) => (
                                <option 
                                    key={nutritionType.id}
                                    value={nutritionType.id}
                                >
                                    {nutritionType.name}
                                </option>
                            ))}
                        </select>
					</div>

					<div className="tour-types-nav">
						{tourTypes.map((tourType) => (<TourType name={tourType.name} img={tourType.imageUrl} setTourType={() => changeCharacteristics(tourType.id)}/>))}
        			</div>
					<div className="tour-editor-characteristics">
							{tour.descriptions.map((description) => (
								<div className="tour-editor-characteristic">
									<div>
										<b>{description.characteristic.name}</b>
									</div>
									<div>
										<div>
										<input
											type="checkbox"
											checked={description.description.value} // Отображаем текущее значение
											onChange={() => changeDescription(description.characteristic.id)} // Вызываем обработчик
										/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

				<RoutesMenu saveTour={saveTour} directionInfo={directionInfo} routes={tour.routes} setRoutes={
					(routes) => setTour((prevTour) => ({
					...prevTour,
					["routes"]: routes,
				}))}/>
			</div>
		</div>
	);
}

export default TourEditor;
