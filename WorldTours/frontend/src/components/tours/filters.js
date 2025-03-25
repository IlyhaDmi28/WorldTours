import React, { useState, useEffect } from 'react';
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

function Filters({filter, setFilter, setTours}) {
    const [nutritionTypes, setNutritionTypes] = useState([]);

    useEffect(() => {
		const getData = async () => {
            try {
                let response;

                response = await axios.get('https://localhost:7276/tour/nutrition_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const nutritionTypesData = response.data;
				setNutritionTypes(nutritionTypesData);
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

    const changeСharacteristic = (e) => {
        const { name, value } = e.target;
        setFilter((prevfilter) => ({
            ...prevfilter,
            characteristics: filter.characteristics.map(characteristic => characteristic.id === +name ? {...characteristic, value: +value} : characteristic),
        }));
    };

    const getFiltredTours = async () => {
		const response = await axios.post(`https://localhost:7276/tour/filtred_tours`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;
        setTours(toursData);
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
        <div className="filters">
                <button className="close-filters-button">
                    <img src={close}/>
                </button>
                <h2>Фильтрация туров</h2>
                <div className="tour-filters">
                    <div className="max-min-price-filter">
                            <TextField
                                className="max-min-price-filter-input" 
                                size='small' 
                                label="Мин. цена" 
                                variant="outlined" 
                                name="minPrice" 
                                value={filter.minPrice} 
                                onChange={changeFilters}
                            />
                            <TextField
                                className="max-min-price-filter-input" 
                                size='small' 
                                label="Мин. цена" 
                                variant="outlined" 
                                name="maxPrice" 
                                value={filter.maxPrice} 
                                onChange={changeFilters}
                            />
                    </div>

                    <div className="hotel-stars-filter">
                        <div>
                            <label>Мин. звёзд:</label>
							<Rating name="min-hotel-stars" defaultValue={1} precision={1} sx={{fontSize: '28px', marginTop: '2px'}} />
                        </div>

                        <div>
                            <label>Макс. звёзд:</label>
							<Rating name="max-hotel-stars" defaultValue={5} precision={1} sx={{fontSize: '28px', marginTop: '2px'}}/>
                        </div>
                    </div>

                    <div className="nutrition-filter">
                        <div className='nutrition-filter-header'>Питание: </div>
                        <Select
                            className='nutrition-filter-select'
                            value={filter.nutritionTypeId}
                            name='nutritionTypeId'
                            onChange={changeFilters}
                            size='small'
                        >
                            <MenuItem value={0}>Не важно</MenuItem>
                            {nutritionTypes.map((nutritionType) => (
                                <MenuItem value={nutritionType.id}>{nutritionType.name}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <Divider sx={{fontSize: '17px'}} textAlign="left">Характеристики</Divider>

                <div className="characteristics-filters">
               
                            <div></div>
                            <div className="heading-filters">Не важно</div>
                            <div className="heading-filters">Да</div>
                            <div className="heading-filters">Нет</div>

                            {filter.characteristics.map((characteristic) => (
                                <>
                                    <div className="characteristic-filter">{characteristic.name}</div>
                                    <div><input type="radio" name={characteristic.id} value="0" checked={filter.characteristics.find(char => char.id === characteristic.id).value === 0}  onChange={changeСharacteristic}/></div>
                                    <div><input type="radio" name={characteristic.id} value="1" checked={filter.characteristics.find(char => char.id === characteristic.id).value === 1}  onChange={changeСharacteristic}/></div>
                                    <div><input type="radio" name={characteristic.id} value="2" checked={filter.characteristics.find(char => char.id === characteristic.id).value === 2}  onChange={changeСharacteristic}/></div>
                                </>
                            ))}
                    
                </div>

                <hr></hr>
                <div className="filter-controllers">
                    <button onClick={clearAllFilters}>Очистить всё</button>
                    <button onClick={getFiltredTours}>Показать</button>
                </div>
        </div>
    );
}

export default Filters;
