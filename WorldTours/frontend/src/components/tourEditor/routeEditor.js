import React, { useState, useEffect } from 'react';
import axios from 'axios';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function RouteEditor({indexOfSelectedRoute, routes, setRoutes, closeModal}) {
    const [transportTypes, setTransportTypes] = useState([]);
    
    const [departmentDepartures, setDepartmentDepartures] = useState([]);
    
    console.log(indexOfSelectedRoute);
    const [route, setRoute] = useState(indexOfSelectedRoute !== -1 ? routes[indexOfSelectedRoute] :{
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
                const response = await axios.get('https://localhost:7276/department_departure/department_departures', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departmentDeparturesData = response.data;
                setDepartmentDepartures(departmentDeparturesData);

                if(indexOfSelectedRoute === -1) {
                    setRoute((prevRoute) => ({
                        ...prevRoute,
                        departmentDeparture: {
                            id: departmentDeparturesData[0].id,
                            name: departmentDeparturesData[0].name,
                            city: departmentDeparturesData[0].city,
                            country: departmentDeparturesData[0].country,
                        },
                    }));
                }
                

                const response2 = await axios.get('https://localhost:7276/route/transport_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const transportTypes = response2.data;
                setTransportTypes(transportTypes);
                
                if(indexOfSelectedRoute === -1) {
                    setRoute((prevRoute) => ({
                        ...prevRoute,
                        transportType: {
                            id: departmentDeparturesData[0].transportTypeId,
                            name: transportTypes.find((transportType) => transportType.id === departmentDeparturesData[0].transportTypeId).name
                        }
                    }));
                }                
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

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
            transportType: {
                id: selectedDepartmentDeparture.transportTypeId,
                name: transportTypes.find((transportType) => transportType.id === selectedDepartmentDeparture.transportTypeId).name
            }
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

    const saveRoute = () => {
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
        
        let newRoutes;
        console.log(indexOfSelectedRoute);
        if(indexOfSelectedRoute === -1) {
            newRoutes = routes;
            newRoutes.push(route);
            setRoutes(newRoutes);
        }
        else {
            newRoutes = routes.map((r, index) => index === indexOfSelectedRoute ? route : r);
            setRoutes(newRoutes);
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
            <div className="route-editor">
                <button className="close-route-editor-button" onClick={closeModal}>
                    <img src={close}/>
                </button>

                <h2>Маршрут</h2>
                <div className='route-editor-directions'>
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
                
                <div className='route-editor-directions' style={{marginTop: '10px'}} >
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

                <div className='route-editor-other-parameters'>
                    <h3>Дополнительные настройки маршрута</h3>
                    <hr></hr>

                    <div className='route-editor-other-parameter'>
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
                    <div className='route-editor-other-parameter'>
                        <div className='parameter-name'>Тип транспорта</div>
                            <select name="transportType" value={route.transportType.id} onChange={changeTransportType} disabled>
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

                    <div className='route-editor-price-and-place'>
                        <div className='route-editor-price-or-place'>
                            <div className='parameter-name'><b>Цена:</b></div>
                            <input type='number' name="price" value={route.price} onChange={changeRoute}/>
                        </div>

                        <div className='route-editor-price-or-place'>
                            <div className='parameter-name'><b>Кол. мест: </b></div>
                            <input type='number' name="seatsNumber" value={route.seatsNumber} onChange={changeRoute}/>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div className="route-editor-controller">{/*комп*/}
                    <button onClick={clearRoute}>Очистить всё</button>
                    <button onClick={saveRoute}>Сохранить</button>
                </div>
            </div>
    );
}

export default RouteEditor;
