import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField   } from "@mui/material";
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import ClickableMap from '../general/clickableMap'
import close from '../../img/close.svg'
import map from '../../img/map.png'
const token = localStorage.getItem("token");

function DepartmentDepartureEditor({indexOfSelectedDepartmentDeparture, departmentDepartures, setDepartmentDepartures, closeModal}) {    
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [location, setLocation] = useState(indexOfSelectedDepartmentDeparture === -1 ? {
        lat: 53.89196,
        lng: 27.55760,
        address: null,
    } : {
        lat: departmentDepartures[indexOfSelectedDepartmentDeparture].lat,
        lng: departmentDepartures[indexOfSelectedDepartmentDeparture].lng,
        address: departmentDepartures[indexOfSelectedDepartmentDeparture].address,
    });

    const [transportTypes, setTransportTypes] = useState([]);
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

	const [departmentDeparture, setDepartmentDeparture] = useState(indexOfSelectedDepartmentDeparture !== -1 ? departmentDepartures[indexOfSelectedDepartmentDeparture] : {
		id: 0,
		name: null,
		cityId: null,
		address: null,
		transportTypeId: 1
	});

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
					setDepartmentDeparture((prevDeparturePoint) => {
						return {
							...prevDeparturePoint,
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
			country: null,
			city: null,
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

    useEffect(() => {
		const getData = async () => {
            try {
				let response;

				response = await axios.get('https://localhost:7276/route/transport_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const transportTypes = response.data;
                setTransportTypes(transportTypes);

                if(departmentDeparture.cityId !== null) {
                    response = await axios.get(`https://localhost:7276/direction/get?cityId=${departmentDeparture.cityId}`,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                         },
                    });
                    
                    const directionInfoData = response.data;
                    setDirectionInfo(directionInfoData);
                }
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
    
    const changeDepartmentDeparture = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setDepartmentDeparture((prevDepartmentDeparture) => ({
            ...prevDepartmentDeparture,
            [name]: value,
        }));
    };

    const saveDepartmentDeparture = async () => {
        console.log(departmentDeparture);
        // setDepartmentDepartures((prevDepartmentDepartures) => {
        //     if (indexOfSelectedDepartmentDeparture === -1) {
        //         return [...prevDepartmentDepartures, departmentDeparture]; // Добавляем новый элемент
        //     } else {
        //         return prevDepartmentDepartures.map((dp, index) =>
        //             index === indexOfSelectedDepartmentDeparture ? departmentDeparture : dp
        //         ); // Создаём новый массив с обновлённым элементом
        //     }
        // });

        if(
			(departmentDeparture.name === "" || departmentDeparture.name === null) ||
			(departmentDeparture.cityId === "" || departmentDeparture.cityId === null) ||
			(departmentDeparture.transportTypeId === "" || departmentDeparture.transportTypeId === null) ||
			(location.address === "" || location.address === null)
		) {
			alert("Вы не заполнили все поля!")
			return;
		}

        const formData = new FormData();
                    
        formData.append("Id", departmentDeparture.id);
        formData.append("Name", departmentDeparture.name);
        formData.append("CityId", departmentDeparture.cityId);
        formData.append("Address", location.address);
		formData.append("Lat",  location.lat.toString().replace(".", ","));
		formData.append("Lng", location.lng.toString().replace(".", ","));
        formData.append("TransportTypeId", departmentDeparture.transportTypeId);
        
        if(departmentDeparture.id === 0) {
            await axios.post('https://localhost:7276/department_departure/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });
        
            window.location.href = '/department_departures';
        }
        else {
			await axios.put('https://localhost:7276/department_departure/edit', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				}
		  	});

			window.location.href = '/department_departures';
		}
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
        <div className="department-departure-editor">
            <button className="close-modal-editor-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Пункт отправления</h2>

            <div className='department-departure-editor-info'>
                <h3>Общая информация</h3>
                <hr></hr>
                <div>
                    <div>
                        <div className='parameter-name'>Название</div>
                        <input name='name' type='text' value={departmentDeparture.name} onChange={changeDepartmentDeparture}/>
                    </div>

                    <div className='department-departure-editor-transport-type'>
                        <div className='parameter-name'>Тип транспорта</div>
                        <select name="transportTypeId" value={departmentDeparture.transportTypeId} onChange={changeDepartmentDeparture} >
                            {transportTypes.map((transportType) => (
                                <option key={transportType.id} value={transportType.id}>
                                    {transportType.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='department-departure-editor-location-info'>
                <h3>Месторасположение</h3>
                <hr></hr>
                    {directionsComponents[directionsPageInndex]} 
					<div className='department-departure-editor-location'>
						<div className='select-city-and-address-of-department-departure'>
							<div>
								<div><b>Страная, город: </b></div>

								{directionInfo.city !== null ? 
									(<>
										<div className='department-departure-editor-loaction-info'>{directionInfo.country}, {directionInfo.city} </div> 
										<DeleteIcon onClick={deleteSelectedDirection}/>
									</>) :
									<button onClick={() => setDirectionsPageInndex(directionsPageInndex === 0 ? 1 : 0)}>
										<b>Выбрать страну, город</b>
									</button>
								}
							</div>

							<div>
								<div><b>Адресс: </b></div>
								<input 
									name="address" 
									className='department-departure-editor-input-address'
									value={location.address} 
									placeholder='улица, дом'
									type="text" 
									onChange={(e) => setLocation((prevLocation) => {return {...prevLocation, address: e.target.value}})}
								/>
							</div>
						</div>

						<img className='department-departure-editor-map' src={map} onClick={() => setIsOpenMap(true)}/>
                        <Modal open={isOpenMap} onClose={() => setIsOpenMap(false)} className='hotel-map-on-modal'>
                                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.0220734032202!2d27.616216344539804!3d53.876858255031635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce18581d62a7%3A0xfbca977ea03db2c7!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDMyLzEsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMIDIyMDEwNw!5e0!3m2!1sru!2sby!4v1739876954826!5m2!1sru!2sby" width="600" height="450" style={{border: '0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                            <ClickableMap lat={location.lat} lng={location.lng} setLocation={setLocation}/>
                        </Modal>
					</div>
            </div>

            <hr></hr>

            <div className='modal-editor-controller'>
                <button onClick={clearRoute}>Очистить всё</button>
                <button onClick={saveDepartmentDeparture}>Сохранить</button>
            </div>
        </div>
    );
}

export default DepartmentDepartureEditor;
