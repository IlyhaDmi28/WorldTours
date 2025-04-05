import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function BookingsFilters({filter, setFilter, setBookings}) {
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
                            <TextField
                                name="minLandingDateOfDeparture"
                                type="date"
                                label="Мин. дата посадки"
                                value={filter.minLandingDateOfDeparture}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />

                            <TextField
                                name="maxLandingDateOfDeparture"
                                type="date"
                                label="Макc. дата посадки"
                                value={filter.maxLandingDateOfDeparture}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />
                        </div>
                    </div>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>   
                            <TextField
                                name="minArrivalDateOfDeparture"
                                type="date"
                                label="Мин. дата прибытия"
                                value={filter.minArrivalDateOfDeparture}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />

                            <TextField
                                name="maxArrivalDateOfDeparture"
                                type="date"
                                label="Макc. дата прибытия"
                                value={filter.maxArrivalDateOfDeparture}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='route-editor-directions'>
                    <h3>Возвращение</h3>
                    <hr></hr>
                    <div className='route-direction-dates-and-times'>
                        <div className='route-direction-date-and-time'>
                            <TextField
                                name="minLandingDateOfReturn"
                                type="date"
                                label="Мин. дата посадки"
                                value={filter.minLandingDateOfReturn}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />

                            <TextField
                                name="maxLandingDateOfReturn"
                                type="date"
                                label="Макc. дата посадки"
                                value={filter.maxLandingDateOfReturn}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />
                        </div> 
                        <div className='route-direction-date-and-time'>
                            <TextField
                                name="minArrivalDateOfReturn"
                                type="date"
                                label="Мин. дата прибытия"
                                value={filter.minArrivalDateOfReturn}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />

                            <TextField
                                name="maxArrivalDateOfReturn"
                                type="date"
                                label="Макc. дата прибытия"
                                value={filter.maxArrivalDateOfReturn}
                                onChange={changeFilters}
                                size="small"
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />
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
