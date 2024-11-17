import React, { useState } from 'react';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'

function EditRouteMenu({ isEditRouteMenuOpen, closeEditRouteMenu}) {
    const [routeParameters, setRouteParameters] = useState({
        landingDateOfDeparture: null,
        landingTimeOfDeparture: null,
        arrivalDateOfDeparture: null,
        arrivalTimeOfDeparture: null,
        landingDateOfReturn: null,
        landingTimeOfReturn: null,
        arrivalDateOfReturn: null,
        arrivalTimeOfReturn: null,
        departmentDeparture: null,
        transportType: null,
        price: null,
        places: null,
    });
   

    if (!isEditRouteMenuOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeEditRouteMenu();
        }
    };

    // const changeFilters = (e) => {
    //     const { name, value } = e.target;
    //     setFilters((prevfilters) => ({
    //         ...prevfilters,
    //         [name]: value,
    //     }));
    // };

    // const clearAllFilters = () => {
    //     setFilters({
    //         minPrice: '',
    //         maxPrice: '',
    //         minHotelStars: 1,
    //         maxHotelStars: 5,
    //         nutritionType: 'Не важно',
    //         wifi: 'no_preference',
    //         beach: 'no_preference',
    //         separateBeds: 'no_preference',
    //         separateBathroom: 'no_preference',
    //         pool: 'no_preference',
    //         jacuzzi: 'no_preference',
    //         disco: 'no_preference',
    //         billiards: 'no_preference',
    //         tableTennis: 'no_preference',
    //     });
    // };

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
                                <input type='date'/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время посадки</div>
                                <input type='time'/>
                            </div>
                        </div>

                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата прибытия</div>
                                <input type='date'/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время прибытия</div>
                                <input type='time'/>
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
                                <input type='date'/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время посадки</div>
                                <input type='time'/>
                            </div>
                        </div>

                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата прибытия</div>
                                <input type='date'/>
                            </div>

                            <div>
                                <div className='parameter-name'>Время прибытия</div>
                                <input type='time'/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='edit-route-other-parameters'>
                    <h3>Дополнительные настройки маршрута</h3>
                    <hr></hr>

                    <div className='edit-route-other-parameter'>
                        <div className='parameter-name'>Пункт отправления</div>
                        <select>
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
                        <select>
                            <option selected="selected">Самолёт</option>
                            <option>Автобус</option>
                            <option>Поезд</option>
                            <option>Корабль</option>
                        </select>
                    </div>

                    <div className='edit-route-price-and-place'>
                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Цена:</b></div>
                            <input type='number'/>
                        </div>

                        <div className='edit-route-price-or-place'>
                            <div className='parameter-name'><b>Кол. мест: </b></div>
                            <input type='number'/>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div className="edit-route-controller">
                    {/* <button onClick={clearAllFilters}>Очистить всё</button> */}
                    <button>Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default EditRouteMenu;
