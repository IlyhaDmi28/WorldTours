import '../styles/hotel-editor.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../components/general/header';
import ModalImageGallery from '../components/general/modalImageGallery';
import { Rating  } from "@mui/material";
import { TextField   } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Hotels from '../components/general/hotels';
import RoomTypesMenu from '../components/hotelEditor/roomTypesMenu';
import ClickableMap from '../components/general/clickableMap'
import selectNewPhoto from '../img/selectNewPhoto.png';
import map from '../img/map.png'
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
	
	const [photosUrls, setPhotosUrls] = useState([]); 
	const [photosFiles, setPhotosFiles] = useState([]); 
	const [nutritionTypes, setNutritionTypes] = useState([]);
	const [characteristics, setCharacteristics] = useState([]);

	const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
	});

	const [hotel, setHotel] = useState({
		id: 0,
		name: null,
		cityId: null,
		address: null,
		lat: 53.89196,
		lng: 27.55760,
		starsNumber: 1,
		mainDescription: null,
		nutritionTypeId: 1,
		characteristics: [],
		roomTypes: []
	});

	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(-1); 
	const [isOpenMap, setIsOpenMap] = useState(false);

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
	
	const closeDirectionsModal = () => {
		setDirectionsPageInndex(0);
		setDirection({
			regionId: null,
			countryId: null,
			cityId: null,
		});
	}
	
	const directionsComponents = [
        null,
        <Regions position={{left: '19%', top: '6%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal}/>,
        <Cities countyId={direction.countryId} position={{left: '22%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal}/>,
    ]
	
	useEffect(() => {
		const getData = async () => {
            try {
				const segments = location.pathname.split('/');
    			const id = segments[segments.length - 1];

				let response;

				response = await axios.get(`https://localhost:7276/hotel/hotel_for_editor?hotelId=${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const hotelData = response.data;
				console.log(hotelData);
				setHotel((prevHotel) => ({
					...prevHotel, 

					id: hotelData.id,
					name: hotelData.name,
					cityId: hotelData.cityId,
					address: hotelData.address,
					starsNumber: hotelData.starsNumber,
					mainDescription: hotelData.mainDescription,
					nutritionTypeId:  hotelData.nutritionTypeId,
					characteristics: hotelData.characteristics,
					roomTypes: hotelData.roomTypes,
					lat: hotelData.lat,
					lng: hotelData.lng,
				}));
				setPhotosUrls(hotelData.photosUrls === null ? [] : hotelData.photosUrls);

				if(hotelData.cityId !== null) {
					response = await axios.get(
						`https://localhost:7276/direction/get?cityId=${hotelData.cityId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
	
					const directionInfoData = response.data;
					setDirectionInfo(directionInfoData);
				}

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
		const files = Array.from(e.target.files); 

		const newImages = files.map(file => URL.createObjectURL(file)); // Создаём ссылки на изображения
		console.log(newImages);
		setPhotosUrls(newImages); // Добавляем новые фото в массив  
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
        photosFiles.current.click();
    };

	const changeCharacteristics = (changedCharacteristic, value) => {
		if(value) {
			const newCharacteristics = [...hotel.characteristics];
			newCharacteristics.push(changedCharacteristic);
			setHotel((prevHotel) => {
				return {
					...prevHotel,
					characteristics: newCharacteristics
				}
			})
		}
		else {
			setHotel((prevHotel) => ({
				...prevHotel,
				characteristics: prevHotel.characteristics.filter((characteristic) => characteristic.id !== changedCharacteristic.id)
			}));
		}
	};

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

	const saveHotel = async () => {
		console.log(hotel);
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить тур, так как ваш профиль был заблокирован!");
			return;
		}

		if(
			(hotel.name === "" || hotel.name === null) ||
			(hotel.cityId === "" || hotel.hotelId === null) ||
			(hotel.address === "" || hotel.address === null) ||
			(hotel.starsNumber === "" || hotel.starsNumber === null) ||
			(hotel.nutritionTypeId === "" || hotel.nutritionTypeId === null)
		) {
			alert("Вы не заполнили все поля!")
			return;
		}

		if(hotel.roomTypes ===  null || hotel.roomTypes.length === 0) {
			alert("Вы не добавили ни одного типа номера!")
			return;
		}

		const segments = location.pathname.split('/');
    	const id = segments[segments.length - 1];

		const copiedphotosFiles = await convertObjectUrlsToFiles(photosUrls);
		console.log(hotel);
		const formData = new FormData();
			
		formData.append("Id", hotel.id);
		formData.append("Name", hotel.name);
		formData.append("CityId", hotel.cityId);
		formData.append("Address", hotel.address);
		formData.append("Lat",  hotel.lat.toString().replace(".", ","));
		formData.append("Lng", hotel.lng.toString().replace(".", ","));
		formData.append("StarsNumber", hotel.starsNumber);
		formData.append("MainDescription", hotel.mainDescription);
		formData.append("NutritionTypeId", hotel.nutritionTypeId);

		// Отправка фотографий (каждый файл добавляется отдельно)
		copiedphotosFiles.forEach((file) => {
			formData.append("PhotosFiles", file); // Название должно совпадать с C#
		});

		// Отправка массивов в виде JSON
		formData.append("Characteristics", JSON.stringify(hotel.characteristics));
		formData.append("RoomTypes", JSON.stringify(hotel.roomTypes));

		if(id === '0') {
			await axios.post('https://localhost:7276/hotel/add', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/hotels_for_editor';
		}
		else {
			await axios.put('https://localhost:7276/hotel/edit', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/hotels_for_editor';
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

	const closeImagesGallery = (e) => {
        if (e === 'isEmpty' || e.target === e.currentTarget || e.key === "Escape") {
            showImages(-1);
        }
    };

	const setRoomTypes = (roomTypes) => {
		console.log(hotel);
		if(authUser.blockedStatus) {
			alert("Вы не можете сохранить отель, так как ваш профиль был заблокирован!");
			return;
		}

		setHotel((prevHotel) => ({
			...prevHotel,
			["roomTypes"]: roomTypes,
		}));
	}

	const HasCharacteristic = (characteristic) => {	
		return hotel.characteristics.some((ch) => ch.id === characteristic.id);
	}

	return (
		<div className="hotel-editor narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<RoomTypesMenu roomTypes={hotel.roomTypes} setRoomTypes={setRoomTypes} saveHotel={saveHotel}/>
			<div 
				className="hotel-editor-images-and-name"
				style={photosUrls.length === 0 ? {height: 'auto'} : {}}
			>
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
							value={hotel.name}
							onChange={changeHotel}
						/>
					</div>
					{
						photosUrls.length !== 0 &&
						<div className="main-hotel-editor-photo">
							<img src={photosUrls[0]} alt="click to change" onClick={() => showImages(0)}/>
						</div>
					}
				</div>
				
				<div className='other-hotel-photos-and-controller'>
					<div className='hotel-photos-controller'>
						<button onClick={setPhotoUropenFileDialogToSelectPhoto}><b>Загрузить изображения</b></button>
						<input type="file" multiple  ref={ photosFiles} onChange={loadPhotos} style={{ display: 'none' }} accept="image/*"/>
					</div>
					{
						photosUrls.length !== 0 &&
						<div className='other-hotel-photos'>
							<div>
								{photosUrls.slice(1, 7).map((photoUrl, i) => (<img src={photoUrl} onClick={() => showImages(i + 1)}/>))}
							</div>
							{photosUrls.length > 7 && <button className='more-hotel-photos-button' onClick={() => showImages(0)}>Показать больше ...</button>}
						</div>
					}
					
				</div>
			</div>

			<div className="hotel-editor-info-and-reservation">
				<div className="hotel-editor-info">

					{directionsComponents[directionsPageInndex]} 
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
								<TextField 
									name="address" 
									className='hotel-editor-input-address'
									value={hotel.address} 
									sx={{"& input": {fontSize: "19px"}, }}
									placeholder='улица, дом'
									type="search" 
									variant="standard" 
									onChange={changeHotel}
								/>
							</div>
						</div>

						<img className='hotel-editor-map' src={map} onClick={() => setIsOpenMap(true)}/>
					</div>

					<div className="hotel-editor-stars">
						<div><b>Количество звёзд: </b></div>
						<Rating 
							className="input-hotel-stars" 
							name="starsNumber" 
							defaultValue={1} 
							value={hotel.starsNumber} 
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
							value={hotel.mainDescription}
							rows={10}
							maxRows={20}
							placeholder='Описание'
							onChange={changeHotel}
						/>
					</div>

					<div className='hotel-editor-nutrition-type'>
						<div><b>Тип питание</b></div>
						<Select className='hotel-editor-nutrition-type-select' name="nutritionTypeId" value={hotel.nutritionTypeId} onChange={changeHotel}>
							{nutritionTypes.map((nutritionType) => (
								<MenuItem value={nutritionType.id}>
									{nutritionType.name}
								</MenuItem>
							))}
						</Select>
					</div>
					
					<div className="hotel-editor-characteristics"> {/*комп*/}
						{characteristics.map((characteristic) => (
							<div className="hotel-editor-characteristic">
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

			{indexOfSelectedImage !== -1 && <ModalImageGallery index={indexOfSelectedImage} setImages={setPhotosUrls} images={photosUrls} closeModal={closeImagesGallery} showImages={showImages}/>}
			
			<Modal open={isOpenMap} onClose={() => setIsOpenMap(false)} className='hotel-map-on-modal'>
				{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.0220734032202!2d27.616216344539804!3d53.876858255031635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce18581d62a7%3A0xfbca977ea03db2c7!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDMyLzEsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMIDIyMDEwNw!5e0!3m2!1sru!2sby!4v1739876954826!5m2!1sru!2sby" width="600" height="450" style={{border: '0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
				<ClickableMap lat={hotel.lat} lng={hotel.lng} setLocation={setHotel}/>
			</Modal>

		</div>
	);
}

export default HotelEditor;
