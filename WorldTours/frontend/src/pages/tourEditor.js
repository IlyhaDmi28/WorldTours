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

	const [direction, setDirection] = useState({
		RegionId: null,
		CountryId: null,
		CityId: null,
		HotelId: null,
	});
	const [tourPhoto, setTourPhoto] = useState(tourp); 
	const [tourTypes, setTourTypes] = useState([]); 
	const [mainDescription, setMainDescription] = useState(""); 
	const [selectedTourType, setSelectedTourType] = useState("Моча");
	const [descriptions, setDescriptions] = useState({});
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
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

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

    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectAva = () => {
        inputPhotoFile.current.click();
    };

    const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections} />,
        <Countries position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Cities position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
        <Hotels position={{left: '12%', top: '25%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirections}/>,
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
									<b>Отель</b>
									<button onClick={() => setDirection({
											RegionId: null,
											CountryId: null,
											CityId: null,
											HotelId: null,
										})}>
										<img src={delete3}/>
									</button>
								</div>
								<div>Страна, город</div>
							</div>

							<div className="tour-editor-hotel-stars">
								<img src={star} />
								<img src={star} />
								<img src={star} />
								<img src={star} />
								<img src={star} />
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
						{tourTypes.map((tourType) => (<TourType name={tourType.name} img={sea} setTourType={() => setSelectedTourType(tourType.name)}/>))}
						{/* <TourType name={"Отдых на море"} img={sea} setTourType={() => setSelectedTourType("Отдых на море")}/>
						<TourType name={"Горнолыжный курорт"} img={ski} setTourType={() => setSelectedTourType("Горнолыжный курор")}/>
						<TourType name={"Путешествия по природе"} img={nature} setTourType={() => setSelectedTourType("Путешествия по природе")}/>
						<TourType name={"Культурный туризм"} img={culture} setTourType={() => setSelectedTourType("Культурный туризм")}/>
						<TourType name={"Обчная поездка"} img={bus} setTourType={() => setSelectedTourType("Обчная поездка")}/> */}
        			</div>
					<div>{selectedTourType}</div>

					<div className="tour-editor-characteristics">
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 1</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 2</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 3</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 4</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 5</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 6</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 7</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 8</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<RoutesMenu direction={direction} routes={routes} setRoutes={setRoutes}/>
			</div>
		</div>
	);
}

export default TourEditor;
