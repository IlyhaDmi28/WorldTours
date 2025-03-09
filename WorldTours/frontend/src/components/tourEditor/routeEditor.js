import React, { useState, useEffect } from 'react';
import axios from 'axios';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function RouteEditor({ routes, setRoutes, isEditRouteMenuOpen, closeEditRouteMenu}) {
    const [transportTypes, setTransportTypes] = useState([]);
    
    const [departmentDepartures, setDepartmentDepartures] = useState([]);
    const [route, setRoute] = useState({
        landingDateOfDeparture: "",
        landingTimeOfDeparture: "",
        arrivalDateOfDeparture: "",
        arrivalTimeOfDeparture: "",
        landingDateOfReturn: "",
        landingTimeOfReturn: "",
        arrivalDateOfReturn: "",
        arrivalTimeOfReturn: "",
        departmentDeparture: {
            id: 1,
            name: null,
            city: null,
            countrty: null
        },
        transportType: {
            id: 1,
            name: null,
        },
        price: 0,
        seatsNumber: 0,
    });
   
    useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get('https://localhost:7276/route/department_departures', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departmentDeparture = response.data;
                setDepartmentDepartures(departmentDeparture);

                setRoute((prevRoute) => ({
                    ...prevRoute,
                    departmentDeparture: {
                        id: departmentDeparture[0].id,
                        name: departmentDeparture[0].name,
                        city: departmentDeparture[0].city,
                        country: departmentDeparture[0].country,
                    },
                }));

                const response2 = await axios.get('https://localhost:7276/route/transport_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const transportTypes = response2.data;
                setTransportTypes(transportTypes);

                setRoute((prevRoute) => ({
                    ...prevRoute,
                    transportType: {
                        id: transportTypes[0].id,
                        name: transportTypes[0].name,
                    },
                }));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);


    if (!isEditRouteMenuOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeEditRouteMenu();
        }
    };

    const changeRoute = (e) => {
        const { name, value } = e.target;
        setRoute((prevRoute) => ({
            ...prevRoute,
            [name]: value,
        }));
    };

    const changeDepartmentDeparture = (e) => {
        const selectedId = parseInt(e.target.value, 10); // Получаем id выбранного элемента
        const selectedDepartmentDeparture = departmentDepartures.find((departmentDeparture) => departmentDeparture.id === selectedId); // Ищем объект по id

        setRoute((prevRoute) => ({
            ...prevRoute,
            departmentDeparture: {
                id: selectedDepartmentDeparture.id,
                name: selectedDepartmentDeparture.name,
                city: selectedDepartmentDeparture.city,
                country: selectedDepartmentDeparture.country,
            },
        }));
    };

    const changeTransportType = (e) => {
        const selectedId = parseInt(e.target.value, 10); // Получаем id выбранного элемента
        const selectedTransportType = transportTypes.find((transportType) => transportType.id === selectedId); // Ищем объект по id
        if (selectedTransportType) {
            setRoute((prevRoute) => ({
                ...prevRoute,
                transportType: {
                    id: selectedTransportType.id,
                    name: selectedTransportType.name,
                },
            }));
        }
    };

    const clearRoute = () => {
        setRoute({
            landingDateOfDeparture: "",
            landingTimeOfDeparture: "",
            arrivalDateOfDeparture: "",
            arrivalTimeOfDeparture: "",
            landingDateOfReturn: "",
            landingTimeOfReturn: "",
            arrivalDateOfReturn: "",
            arrivalTimeOfReturn: "",
            departmentDeparture: {
                id: 1,
                name: null,
                city: null,
                countrty: null
            },
            transportType: {
                id: 1,
                name: null,
            },
            price: 0,
            seatsNumber: 0,
        });
    };

    return (
        <div className="edit-route-menu-overlay" onClick={handleOverlayClick}>
            <div className="edit-route-menu">
                <button className="close-edit-route-menu-button" onClick={closeEditRouteMenu}>
                    <img src={close}/>
                </button>

                <h2>Маршрут</h2>
                <div className='edit-route-directions'>
                    <h3>Отправление</h3>
                    <hr></hr>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата посадки</div>
                                <input type='date' name="landingDateOfDeparture" value={route.landingDateOfDeparture} onChange={changeRoute}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время посадки</div>
                                <input type='time' name="landingTimeOfDeparture" value={route.landingTimeOfDeparture} onChange={changeRoute}/>
                            </div>
                        </div>

                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата прибытия</div>
                                <input type='date' name="arrivalDateOfDeparture" value={route.arrivalDateOfDeparture} onChange={changeRoute}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время прибытия</div>
                                <input type='time' name="arrivalTimeOfDeparture" value={route.arrivalTimeOfDeparture} onChange={changeRoute}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='edit-route-directions' style={{marginTop: '10px'}} >
                    <h3>Возвращение</h3>
                    <hr></hr>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'> Дата посадки</div>
                                <input type='date' name="landingDateOfReturn" value={route.landingDateOfReturn} onChange={changeRoute}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время посадки</div>
                                <input type='time' name="landingTimeOfReturn" value={route.landingTimeOfReturn} onChange={changeRoute}/>
                            </div>
                        </div>

                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата прибытия</div>
                                <input type='date' name="arrivalDateOfReturn" value={route.arrivalDateOfReturn} onChange={changeRoute}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время прибытия</div>
                                <input type='time' name="arrivalTimeOfReturn" value={route.arrivalTimeOfReturn} onChange={changeRoute}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='edit-route-other-parameters'>
                    <h3>Дополнительные настройки маршрута</h3>
                    <hr></hr>

                    <div className='edit-route-other-parameter'>
                        <div className='parameter-name'>Пункт отправления</div>
                        <select name="departmentDeparture" value={route.departmentDeparture.id} onChange={changeDepartmentDeparture}>
                            {departmentDepartures.map((departmentDeparture) => (
                                <option 
                                    key={departmentDeparture.id}
                                    value={departmentDeparture.id}
                                >
                                    {departmentDeparture.name}, {departmentDeparture.country}, {departmentDeparture.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='edit-route-other-parameter'>
                        <div className='parameter-name'>Тип транспорта</div>
                            <select name="transportType" value={route.transportType.id} onChange={changeTransportType}>
                                {transportTypes.map((transportType) => (
                                    <option 
                                        key={transportType.id}
                                        value={transportType.id}
                                    >
                                        {transportType.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    <div className='edit-route-price-and-place'>
                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Цена:</b></div>
                            <input type='number' name="price" value={route.price} onChange={changeRoute}/>
                        </div>

                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Кол. мест: </b></div>
                            <input type='number' name="seatsNumber" value={route.seatsNumber} onChange={changeRoute}/>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div className="edit-route-controller">{/*комп*/}
                    <button onClick={clearRoute}>Очистить всё</button>
                    <button onClick={(e) =>{ 
                        if(
                            (route.landingDateOfDeparture === "" || route.landingDateOfDeparture === null) ||
                            (route.landingTimeOfDeparture === "" || route.landingTimeOfDeparture === null) ||
                            (route.arrivalDateOfDeparture === "" || route.arrivalDateOfDeparture === null) ||
                            (route.arrivalTimeOfDeparture === "" || route.arrivalTimeOfDeparture === null) ||
                            (route.landingDateOfReturn === "" || route.landingDateOfReturn === null) ||
                            (route.landingTimeOfReturn === "" || route.landingTimeOfReturn === null) ||
                            (route.arrivalDateOfReturn === "" || route.arrivalDateOfReturn === null) ||
                            (route.arrivalTimeOfReturn === "" || route.arrivalTimeOfReturn === null) ||
                            (route.departmentDeparture === "" || route.departmentDeparture === null) ||
                            (route.transportType === "" || route.transportType === null) ||
                            (route.departmentDeparture === "" || route.departmentDeparture === null) ||
                            (route.price === "" ||route.price === null) ||
                            (route.seatsNumber === "" || route.seatsNumber === null)
                        ) {
                            alert("Вы не заполнили все поля!");
                            return;
                        }

                        setRoutes([...routes, route])}
                    }>Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default RouteEditor;
