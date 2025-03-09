import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField   } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import close from '../../img/close.svg'
import map from '../../img/map.png'
const token = localStorage.getItem("token");

function DeparturePointEditor({indexOfSelectedRoomType, roomTypes, setRoomTypes, closeModal}) {    

    const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
		address: null
	});

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
			hotel: null,
			country: null,
			city: null,
			starsNumber: null
		});
	}

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
	
	const directionsComponents = [
        null,
        <Regions position={{left: '19%', top: '6%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal} />,
        <Countries regionId={direction.regionId} position={{left: '12%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal}/>,
        <Cities countyId={direction.countryId} position={{left: '22%', top: '28%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={closeDirectionsModal}/>,
    ]

    const [roomType, setRoomType] = useState(indexOfSelectedRoomType !== -1 ? roomTypes[indexOfSelectedRoomType] : {
        name: null,
        seatsNumber: null,
        roomsNumber: null,
        price: null,
        characteristics: [],
    });


    // useEffect(() => {
	// 	const getData = async () => {
    //         try {
	// 			let response;

	// 			response = await axios.get('https://localhost:7276/room_type/characteristics', {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token,
    //                 }
    //             });
	// 			const characteristicsData = response.data;

    //             const characteristicsIdsToRemove = new Set(roomType.characteristics.map(item => item.id));
	// 			setCharacteristics(characteristicsData.filter(item => !characteristicsIdsToRemove.has(item.id)));
    //         } catch (error) {
	// 			console.error('Ошибка загрузки данных:', error);
    //         } 
    //     };

    //     getData();
	// }, []);

    
    // const removeSelectedCharacteristic = (characteristic) => {
    //     setRoomType((prevRoomType) => {
    //         return {
    //             ...prevRoomType,
    //             characteristics: prevRoomType.characteristics.filter((removedCharacteristic) => characteristic.id !== removedCharacteristic.id)
    //         }
    //     })

    //     const newCharacteristics = [...characteristics];
    //     newCharacteristics.push(characteristic);
    //     setCharacteristics(newCharacteristics);
    // }


    // const AddSelectedCharacteristic = (characteristic) => {
    //     const newCharacteristics = [...roomType.characteristics];
    //     newCharacteristics.push(characteristic);
    //     setRoomType((prevRoomType) => {
    //         return {
    //             ...prevRoomType,
    //             characteristics: newCharacteristics
    //         }
    //     })

    //     setCharacteristics(characteristics.filter((removedCharacteristic) => removedCharacteristic.id !== characteristic.id));
    // };

    const changeRoomType = (e) => {
        const { name, value } = e.target;

        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            [name]: value,
        }));
    };

    // const saveRoomType = () => {
    //     console.log(roomTypes); 

    //     if(indexOfSelectedRoomType === -1)  setRoomTypes([...roomTypes, roomType]);
    //     else {
    //         let hyu = roomTypes;
    //         hyu[indexOfSelectedRoomType] = roomType;
    //         setRoomTypes(hyu);
    //     }
    // };

    const saveRoomType = () => {
        console.log(roomTypes);
    
        setRoomTypes((prevRoomTypes) => {
            if (indexOfSelectedRoomType === -1) {
                return [...prevRoomTypes, roomType]; // Добавляем новый элемент
            } else {
                return prevRoomTypes.map((rt, index) =>
                    index === indexOfSelectedRoomType ? roomType : rt
                ); // Создаём новый массив с обновлённым элементом
            }
        });
    };

    const clearRoute = async () => {
        // const response = await axios.get('https://localhost:7276/room_type/characteristics', {
        //     headers: {
        //         'Authorization': 'Bearer ' + token,
        //     }
        // });
        // const characteristicsData = response.data;
        // setCharacteristics(characteristicsData);
        
        // setRoomType({
        //     name: null,
        //     seatsNumber: null,
        //     roomsNumber: null,
        //     price: null,
        //     characteristics: [],
        // });
    };

    return (
        <div className="departure-point-editor">
            <button className="close-modal-editor-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Пункт отправления</h2>

            <div className='departure-point-editor-info'>
                <h3>Общая информация</h3>
                <hr></hr>
                <div>
                    <div>
                        <div className='parameter-name'>Название</div>
                        <input name='name' type='text' value={roomType.name} onChange={changeRoomType}/>
                    </div>

                    <div className='departure-point-editor-transport-type'>
                        <div className='parameter-name'>Тип транспорта</div>
                        {/* value={route.transportType.id} onChange={changeTransportType} */}
                        <select name="transportType" >
                            {/* {transportTypes.map((transportType) => (
                                <option key={transportType.id} value={transportType.id}>
                                    {transportType.name}
                                </option>
                            ))} */}
                        </select>
                    </div>
                </div>
            </div>

            <div className='departure-point-editor-location-info'>
                <h3>Месторасположение</h3>
                <hr></hr>
                    {directionsComponents[directionsPageInndex]} 
					<div className='departure-point-editor-location'>
						<div className='select-city-and-address-of-hotel'>
							<div>
								<div><b>Страная, город: </b></div>

								{directionInfo.city !== null ? 
									(<>
										<div className='departure-point-editor-loaction-info'>{directionInfo.country}, {directionInfo.city} </div> 
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
									className='departure-point-editor-input-address'
									value={hotel.address} 
									sx={{"& input": {fontSize: "19px"}, }}
									placeholder='улица, дом'
									type="search" 
									variant="standard" 
									onChange={changeRoomType}
								/>
							</div>
						</div>

						<img className='departure-point-editor-map' src={map} onClick={() => setIsOpenMap(true)}/>
					</div>
            </div>

            <hr></hr>

            <div className='modal-editor-controller'>
                <button onClick={clearRoute}>Очистить всё</button>
                <button onClick={saveRoomType}>Сохранить</button>
            </div>
        </div>
    );
}

export default DeparturePointEditor;
