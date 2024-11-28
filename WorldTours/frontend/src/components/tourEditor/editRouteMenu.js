import React, { useState } from 'react';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'

function EditRouteMenu({ routes, setRoutes, isEditRouteMenuOpen, closeEditRouteMenu}) {
    const [route, setRoute] = useState({
        landingDateOfDeparture: "",
        landingTimeOfDeparture: "",
        arrivalDateOfDeparture: "",
        arrivalTimeOfDeparture: "",
        landingDateOfReturn: "",
        landingTimeOfReturn: "",
        arrivalDateOfReturn: "",
        arrivalTimeOfReturn: "",
        departmentDeparture: "Минск",
        transportType: "Самолёт",
        price: 0,
        seatsNumber: 0,
    });
   

    if (!isEditRouteMenuOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeEditRouteMenu();
        }
    };

    const changeRoute= (e) => {
        const { name, value } = e.target;
        setRoute((prevRoute) => ({
            ...prevRoute,
            [name]: value,
        }));
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
            departmentDeparture: "Минск",
            transportType: "Самолёт",
            price: 0,
            places: 0,
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
                        <select name="departmentDeparture" value={route.departmentDeparture} onChange={changeRoute}>
                            <option selected="selected">Минск</option>
                            <option>Брест</option>
                            <option>Гродно</option>
                            <option>Витебск</option>
                            <option>Могилёв</option>
                            <option>Гомель</option>
                            <option>Москва</option>
                            <option>Киев</option>
                            <option>Варшава</option>
                        </select>
                    </div>

                    <div className='edit-route-other-parameter'>
                        <div className='parameter-name'>Тип транспорта</div>
                        <select name="transportType" value={route.transportType} onChange={changeRoute}>
                            <option selected="selected">Самолёт</option>
                            <option>Автобус</option>
                            <option>Поезд</option>
                            <option>Корабль</option>
                        </select>
                    </div>

                    <div className='edit-route-price-and-place'>
                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Цена:</b></div>
                            <input type='number' name="price" value={route.price} onChange={changeRoute}/>
                        </div>

                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Кол. мест: </b></div>
                            <input type='number' name="places" value={route.places} onChange={changeRoute}/>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div className="edit-route-controller">
                    <button onClick={clearRoute}>Очистить всё</button>
                    <button onClick={(e) => setRoutes([...routes, route])}>Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default EditRouteMenu;
