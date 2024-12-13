import React, { useState, useEffect } from 'react';
import axios from 'axios';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function Filters({filter, setFilter, isFiltersOpen, closeFilters }) {
 

    useEffect(() => {
		const getData = async () => {
            try {
				const response = await axios.get(`https://localhost:7276/tour/characteristics_to_filter?id=${1}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                const characteristicsData = response.data
                console.log(characteristicsData);
                setFilter((prevFilter) => {
                    return {
                        ...prevFilter,
                        descriptions: characteristicsData
                    };
                });
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);


    const [minNumberLightHotelStars, setMinNumberLightHotelStars] = useState(filter.minHotelStars);
    const [maxNumberLightHotelStars, setMaxNumberLightHotelStars] = useState(filter.maxHotelStars);
   

    if (!isFiltersOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeFilters();
        }
    };


    const ClickMinHotelStars = (hotelStarButtonId) => {
        setMinNumberLightHotelStars(hotelStarButtonId);
        setFilter((prevfilter) => ({
            ...prevfilter,
            ["minHotelStars"]: hotelStarButtonId,
        }));
    }

    const ClickMaxHotelStars = (hotelStarButtonId) => {
        setMaxNumberLightHotelStars(hotelStarButtonId);
        setFilter((prevfilter) => ({
            ...prevfilter,
            ["maxHotelStars"]: hotelStarButtonId,
        }));
    }

    const changeFilters = (e) => {
        const { name, value } = e.target;
        setFilter((prevfilter) => ({
            ...prevfilter,
            [name]: value,
        }));
    };

    const changeDescription = (e) => {
        const { name, value } = e.target;
        setFilter((prevfilter) => ({
            ...prevfilter,
            descriptions: filter.descriptions.map(description => description.characteristicId === Number(name) ? {...description, value: Number(value)} : description),
        }));
    };


    const clearAllFilters = () => {
        setFilter((prevFilter) => {
            return {
                ...prevFilter,
                minPrice: '',
                maxPrice: '',
                minHotelStars: 1,
                maxHotelStars: 5,
                nutritionType: 'Не важно',
                wifi: 'no_preference',
                beach: 'no_preference',
                separateBeds: 'no_preference',
                separateBathroom: 'no_preference',
                pool: 'no_preference',
                jacuzzi: 'no_preference',
                disco: 'no_preference',
                billiards: 'no_preference',
                tableTennis: 'no_preference',
            }
            
        });
        setMinNumberLightHotelStars(1);
        setMaxNumberLightHotelStars(5);
    };

    return (
        <div className="filters-overlay" onClick={handleOverlayClick}>
            <div className="filters">
                <button className="close-filters-button" onClick={closeFilters}>
                    <img src={close}/>
                </button>
                <h2>Фильтрация туров</h2>
                <div className="tour-filters">
                    <div className="max-min-price-filter">
                        <div>
                            <div>Мин. цена</div>
                            <input type="number" name="minPrice" value={filter.minPrice}  placeholder="От" onChange={changeFilters}/>
                        </div>
                        <div>
                            <div>Макс. цена</div>
                            <input type="number" name="maxPrice" value={filter.maxPrice} placeholder="До" onChange={changeFilters}/>
                        </div>
                    </div>

                    <div className="hotel-stars-filter">
                        <div>
                            <span>Мин. звёзды отеля:</span>
                            <div className='hotel-stars-buttons'>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(1)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filter.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(1)}
                                >
                                    <img src={minNumberLightHotelStars >= 1 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(2)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filter.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(2)}
                                >
                                    <img src={minNumberLightHotelStars >= 2 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(3)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filter.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(3)}
                                >
                                    <img src={minNumberLightHotelStars >= 3 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(4)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filter.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(4)}
                                >
                                    <img src={minNumberLightHotelStars >= 4 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(5)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filter.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(5)}
                                >
                                    <img src={minNumberLightHotelStars >= 5 ? star : darkStar}/>
                                </button>
                            </div>
                        </div>

                        <div>
                            <span>Макс. звёзды отеля:</span>
                            <div className='hotel-stars-buttons'>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(1)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filter.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(1)}
                                >
                                    <img src={maxNumberLightHotelStars >= 1 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(2)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filter.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(2)}
                                >
                                    <img src={maxNumberLightHotelStars >= 2 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(3)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filter.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(3)}
                                >
                                    <img src={maxNumberLightHotelStars >= 3 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(4)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filter.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(4)}
                                >
                                    <img src={maxNumberLightHotelStars >= 4 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(5)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filter.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(5)}
                                >
                                    <img src={maxNumberLightHotelStars >= 5 ? star : darkStar}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="nutrition-filter">
                        <div>Питание: </div>
                        <select name="nutritionType" value={filter.nutritionType} onChange={changeFilters}>
                            <option selected="selected">Не важно</option>
                            <option>RO (Room only) — без питания</option>
                            <option>BB (Bed & breakfast) — завтрак</option>
                            <option>HB (Half board) — полупансион</option>
                            <option>FB (Full board) — полный пансион (завтрак, обед и ужин)</option>
                            <option>AI (All inclusive) — всё включено — завтрак, обед и ужин (шведский стол)</option>
                        </select>
                    </div>
                </div>
                

                <hr></hr>

                <div className="hotel-filters">
                    <div></div>
                    <div class="heading-filters">Не важно</div>
                    <div class="heading-filters">Да</div>
                    <div class="heading-filters">Нет</div>

                    {filter.descriptions.map((description) => (
                        <>
                            <div class="characteristic-filter">{description.characteristicName}</div>
                            <div><input type="radio" name={description.characteristicId} value="0" checked={filter.descriptions.find(des => des.characteristicId === description.characteristicId).value === 0}  onChange={changeDescription}/></div>
                            <div><input type="radio" name={description.characteristicId} value="1" checked={filter.descriptions.find(des => des.characteristicId === description.characteristicId).value === 1}  onChange={changeDescription}/></div>
                            <div><input type="radio" name={description.characteristicId} value="2" checked={filter.descriptions.find(des => des.characteristicId === description.characteristicId).value === 2}  onChange={changeDescription}/></div>
                        </>
					))}
                </div>

                <hr></hr>
                <div className="filter-controllers">
                    <button onClick={clearAllFilters}>Очистить всё</button>
                    <button>Показать</button>
                </div>
            </div>
        </div>
    );
}

export default Filters;
