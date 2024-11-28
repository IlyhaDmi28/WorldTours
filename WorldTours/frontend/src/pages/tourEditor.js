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
import sea from '../img/TourTypes/sea.svg'
import nature from '../img/TourTypes/nature.svg'
import ski from '../img/TourTypes/ski.svg'
import culture from '../img/TourTypes/culture.svg'
import bus from '../img/TourTypes/bus.svg'
import delete3 from '../img/delete3.svg'
const token = localStorage.getItem("token");

function TourEditor() {
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [dirctionInfo, setDirctionInfo] = useState({
		hotel: null,
		country: null,
		city: null,
		starsNumber: null
	});

	const [direction, setDirection] = useState({
		RegionId: null,
		CountryId: null,
		CityId: null,
		HotelId: null,
	});

	const [tour, setTour] = useState({
		tourPhoto: null,
		tourTypes: null,
		direction: {
			hotel: null,
			country: null,
			city: null,
			starsNumber: null
		},
		mainDescription: null,
		tourType: null,
		characteristicTypes: [],
		routes: [],
	});
	
	const [tourPhoto, setTourPhoto] = useState(tourp); 
	const [tourTypes, setTourTypes] = useState([]); 
	 
	const [mainDescription, setMainDescription] = useState(""); 
	const [selectedTourType, setSelectedTourType] = useState("Моча");
	const [characteristicTypes, setCharacteristicTypes] = useState([]);
	const [routes, setRoutes] = useState([]);
	const inputPhotoFile = useRef(null); // Используем useRef для открытия input
	
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
				console.log(response2.data);
				setCharacteristicTypes(response2.data);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (
				direction.RegionId != null &&
				direction.CountryId != null &&
				direction.CityId != null &&
				direction.HotelId != null
			) {
				try {
					console.log("sss" + direction.HotelId);
	
					const response = await axios.get(
						`https://localhost:7276/direction/direction?countryId=${direction.CountryId}&cityId=${direction.CityId}&hotelId=${direction.HotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
	
					console.log(response.data);
					setDirctionInfo(response.data);
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}
		};
	
		getDirectionInfo(); // Вызов асинхронной функции
	}, [direction]);

	const selectDirection = (DirectionId) => {
		switch(directionsPageInndex) {
			case 1: { 
				setDirection((prevDirection) => ({
					...prevDirection,
					["RegionId"]: DirectionId,
				})); 
				break;
			}

			case 2: { 
				setDirection((prevDirection) => ({
					...prevDirection,
					["CountryId"]: DirectionId,
				})); 
				break;
			}
			case 3: { 
				setDirection((prevDirection) => ({
					...prevDirection,
					["CityId"]: DirectionId,
				})); 
				break;
			}

			case 4: { 
				setDirection((prevDirection) => ({
					...prevDirection,
					["HotelId"]: DirectionId,
				})); 
				break;
			}
		}
	}
	
	const closeDirections = () => {
		setDirectionsPageInndex(0);
		setDirection({
			RegionId: null,
			CountryId: null,
			CityId: null,
			HotelId: null,
		});
	}

	const changePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setTourPhoto(e.target.result); // Обновляем изображение на выбранное
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };

	const changeCharacteristics = async (id) => {
		try {
			setSelectedTourType(id)

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

    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectAva = () => {
        inputPhotoFile.current.click();
    };


    const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries regionId={direction.RegionId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities countyId={direction.CountryId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Hotels cityId={direction.CityId} position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
    ]

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
					<img src={tourPhoto} alt="click to change" onClick={openFileDialogToSelectAva}/>
                    <input type="file" ref={inputPhotoFile}  onChange={changePhoto} style={{ display: 'none' }} accept="image/*"/>
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
					{(direction.RegionId != null && direction.CountryId != null && direction.CityId != null && direction.HotelId != null) ? (
						<>
							<div className="main-tour-editor-info">
								<div>
									<b>{dirctionInfo.hotel}</b>
									<button onClick={() => setDirection({
											RegionId: null,
											CountryId: null,
											CityId: null,
											HotelId: null,
										})}>
										<img src={delete3}/>
									</button>
								</div>
								<div>{dirctionInfo.country}, {dirctionInfo.city}</div>
							</div>

							<div className="tour-editor-hotel-stars">
								{Array(dirctionInfo.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
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

					<div className="tour-types-nav">
						{tourTypes.map((tourType) => (<TourType name={tourType.name} img={tourType.imageUrl} setTourType={() => changeCharacteristics(tourType.id)}/>))}
						{/* <TourType name={"Отдых на море"} img={sea} setTourType={() => setSelectedTourType("Отдых на море")}/>
						<TourType name={"Горнолыжный курорт"} img={ski} setTourType={() => setSelectedTourType("Горнолыжный курор")}/>
						<TourType name={"Путешествия по природе"} img={nature} setTourType={() => setSelectedTourType("Путешествия по природе")}/>
						<TourType name={"Культурный туризм"} img={culture} setTourType={() => setSelectedTourType("Культурный туризм")}/>
						<TourType name={"Обчная поездка"} img={bus} setTourType={() => setSelectedTourType("Обчная поездка")}/> */}
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

				<RoutesMenu direction={direction} routes={routes} setRoutes={setRoutes}/>
			</div>
		</div>
	);
}

export default TourEditor;
