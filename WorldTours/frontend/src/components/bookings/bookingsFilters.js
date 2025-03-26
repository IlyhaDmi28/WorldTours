import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import { Rating  } from "@mui/material";
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function BookingsFilters({filter, setFilter, setTours, setBookings}) {
    const authUser = useSelector((state) => state.authUser.value);
    const [departmentDepartures, setDepartmentDepartures] = useState([]);

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
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

    const changeFilters = (e) => {
        const { name, value } = e.target;
        setFilter((prevfilter) => ({
            ...prevfilter,
            [name]: value,
        }));
    };


    const getFiltredBookings = async () => {
		const response = await axios.post(`https://localhost:7276/booking/filtred_bookings?userId=${authUser.role === 2 || authUser.role === 3 ? 0 : authUser.id}`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;
		setBookings(toursData);
    }

    const clearAllFilters = () => {
        setFilter((prevFilter) => {
            return {
                ...prevFilter,
                minPrice: 0,
                maxPrice: 0,
                minHotelStars: 1,
                maxHotelStars: 5,
                nutritionTypeId: 0,
                descriptions: filter.descriptions.map(description => ({...description, value: 0})),
            }
            
        });
    };

    return (
        <div className="booking-filters">
                <button className="close-filters-button">
                    <img src={close}/>
                </button>
                <h2>Фильтрация броней</h2>

                <div className='route-editor-directions'>
                    <h3>Отправление</h3>
                    <hr></hr>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата посадки c</div>
                                <input type='date' name="minLandingDateOfDeparture" value={filter.minLandingDateOfDeparture} onChange={changeFilters}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Дата посадки до</div>
                                <input type='date' name="maxLandingDateOfDeparture" value={filter.maxLandingDateOfDeparture} onChange={changeFilters}/>
                            </div>                       
                        </div>
                    </div>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>   
                            <div>
                                <div className='parameter-name'>Дата прибытия c</div>
                                <input type='date' name="minArrivalDateOfDeparture" value={filter.minArrivalDateOfDeparture} onChange={changeFilters}/>
                            </div>                    
                            <div>
                                <div className='parameter-name'>Дата прибытия до</div>
                                <input type='date' name="maxArrivalDateOfDeparture" value={filter.maxArrivalDateOfDeparture} onChange={changeFilters}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='route-editor-directions'>
                    <h3>Возвращение</h3>
                    <hr></hr>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата посадки с</div>
                                <input type='date' name="minLandingDateOfReturn" value={filter.minLandingDateOfReturn} onChange={changeFilters}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Дата посадки до</div>
                                <input type='date' name="maxlandingDateOfReturn" value={filter.maxlandingDateOfReturn} onChange={changeFilters}/>
                            </div>
                        </div> 
                        <div className='route-direction-date-and-time'>
                            <div>
                                <div className='parameter-name'>Дата прибытия с</div>
                                <input type='date' name="minArrivalDateOfReturn" value={filter.minArrivalDateOfReturn} onChange={changeFilters}/>
                            </div>

                            <div>
                                <div className='parameter-name'>Дата прибытия до</div>
                                <input type='date' name="maxArrivalDateOfReturn" value={filter.maxArrivalDateOfReturn} onChange={changeFilters}/>
                            </div>
                        </div> 
                    </div>
                </div>

                <div className="tour-filters">
                    <div className="nutrition-filter">
                        <div className='nutrition-filter-header'>Пункт отправления: </div>
                        <Select
                            className='nutrition-filter-select'
                            value={filter.departmentDepartureId}
                            name='departmentDepartureId'
                            onChange={changeFilters}
                            size='small'
                        >
                            <MenuItem value={0}>Не важно</MenuItem>
                            {departmentDepartures.map((departmentDeparture) => (
                                <MenuItem value={departmentDeparture.id}>
                                    {departmentDeparture.name}, {departmentDeparture.country}, {departmentDeparture.city}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                
                <hr></hr>
                <div className="filter-controllers">
                    <button onClick={clearAllFilters}>Очистить всё</button>
                    <button onClick={getFiltredBookings}>Показать</button>
                </div>
        </div>
    );
}

export default BookingsFilters;
