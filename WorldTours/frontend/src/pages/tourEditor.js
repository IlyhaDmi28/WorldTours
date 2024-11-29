import '../styles/tourEditor.scss';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/general/header';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Hotels from '../components/general/hotels';
import RoutesMenu from '../components/tourEditor/routesMenu';
import TourType from '../components/tours/tourType'
import tourp from '../img/test.jpg';
import star from '../img/star.svg';
import delete3 from '../img/delete3.svg'
const token = localStorage.getItem("token");

function TourEditor() {
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		hotel: null,
		country: null,
		city: null,
		starsNumber: null
	});
	const [tourTypes, setTourTypes] = useState([]); 
	const [tourPhotoUrl, setTourPhotoUrl] = useState(tourp); 
	const [characteristicTypes, setCharacteristicTypes] = useState([]);
	const [nutritionTypes, setNutritionTypes] = useState([]);
	
	const [tour, setTour] = useState({
		tourPhotoFile: useRef(null), // Используем useRef для открытия input
		tourTypes: null,
		direction: {
			regionId: null,
			countryId: null,
			cityId: null,
			hotelId: null,
		},
		mainDescription: null,
		nutritionType: null,
		tourType: null,
		routes: [],
		characteristics: []
	});

	
	useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get('https://localhost:7276/tour/types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				console.log(response.data);

				setTourTypes(response.data);

				const response2 = await axios.get('https://localhost:7276/tour/characteristics?id=3', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				let characteristicTypesData = response2.data;
				console.log(characteristicTypesData);
				setCharacteristicTypes(characteristicTypesData);
				
				let characteristics = [];
				characteristicTypesData.map((characteristicTypeData) =>{
					characteristics.push(characteristicTypeData.characteristics)
				})
				characteristics = characteristics.flat()
				console.log(characteristics);

				const response3 = await axios.get('https://localhost:7276/tour/NutritionTypes', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				console.log(response3.data);
				setNutritionTypes(response3.data);

				setTour((prevTOur) => ({
                    ...prevTOur,
                    nutritionTypeId: response3.data[0].id
                }));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	useEffect(() => {
		console.log ('хуй');
		const getDirectionInfo = async () => {
			if (tour.direction.regionId != null && tour.direction.countryId != null && tour.direction.cityId != null && tour.direction.hotelId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/direction?countryId=${tour.direction.countryId}&cityId=${tour.direction.cityId}&hotelId=${tour.direction.hotelId}`,
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
	}, [tour]);

	const selectDirection = (directionId) => {
		setTour((prevTour) => {
			let updatedDirection = { ...prevTour.direction };
	
			switch (directionsPageInndex) {
				case 1:
					updatedDirection.regionId = directionId;
					break;
				case 2:
					updatedDirection.countryId = directionId;
					break;
				case 3:
					updatedDirection.cityId = directionId;
					break;
				case 4:
					updatedDirection.hotelId = directionId;
					break;
				default:
					break;
			}
	
			return {
				...prevTour,
				direction: updatedDirection,
			};
		});
	};
	
	const closeDirections = () => {
		setDirectionsPageInndex(0);
		setTour((prevTour) => ({
			...prevTour,
			direction: {
				...prevTour.direction,
				regionId: null,
				countryId: null,
				cityId: null,
				hotelId: null,
			},
		}));
	}

	const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={tour.direction.regionId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={tour.direction.countryId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Hotels cityId={tour.direction.cityId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
    ]

	const changePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
			setTourPhotoUrl(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };

	const changeCharacteristics = async (id) => {
		try {
			setTour((prevTour) => ({
				...prevTour,
				["tourType"]: id,
			}));

			const response = await axios.get(`https://localhost:7276/tour/characteristics?id=${id}`, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});

			console.log(response.data);
			setCharacteristicTypes(response.data);
		} catch (error) {
			console.error('Ошибка загрузки данных:', error);
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
        tour.tourPhotoFile.current.click();
    };

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="tour-editor-name">
					<div>
						<b>Название тура</b>
					</div>
					<input type='text'/>
			</div>

			<div className="tour-editor-images">
				<div className="main-tour-editor-img">
					<img src={tourPhotoUrl} alt="click to change" onClick={openFileDialogToSelectAva}/>
                    <input type="file" ref={ tour.tourPhotoFile}  onChange={changePhoto} style={{ display: 'none' }} accept="image/*"/>
				</div>
				

				<div className="other-tour-editor-images-and-map">
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
				</div>
			</div>

			<div className="tour-editor-info-and-reservation">
				<div className="tour-editor-info">
					{directions[directionsPageInndex]} 
					{(tour.direction.regionId != null && tour.direction.countryId != null && tour.direction.cityId != null && tour.direction.hotelId != null) ? (
						<>
							<div className="main-tour-editor-info">
								<div>
									<b>{directionInfo.hotel}</b>
										<button onClick={() => 
											setTour((prevTour) => ({
												...prevTour,
												direction: {
													...prevTour.direction,
													regionId: null,
													countryId: null,
													cityId: null,
													hotelId: null,
												},
											}))
										}>
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
								Нажмите, что бы добавьте пункт направления
							</button>
						</>
					)}
					


					<div className="tour-editor-desription">
						<div><b>Описание</b></div>
						<textarea/>
					</div>

					<div className='nutrition-type'>
						<div><b>Тип питание</b></div>
						<select name='nutritionType' onChange={changeTour}>
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
							{characteristicTypes.map((characteristicType) => (
								<div className="tour-editor-characteristic">
									<div>
										<b>{characteristicType.name}</b>
									</div>
									<div>
										{characteristicType.characteristics.map((characteristic) =>(
											<div>
												<input type="checkbox" name={characteristic.name}/>
												<label>{characteristic.name}</label>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				</div>

				<RoutesMenu directionInfo={directionInfo} routes={tour.routes} setRoutes={
					(routes) => setTour((prevTour) => ({
					...prevTour,
					["routes"]: routes,
				}))}/>
			</div>
		</div>
	);
}

export default TourEditor;
