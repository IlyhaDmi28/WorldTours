import React, { useState } from 'react';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'

function Filters({ isFiltersOpen, closeFilters }) {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 99999,
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
    });


    const [minNumberLightHotelStars, setMinNumberLightHotelStars] = useState(filters.minHotelStars);
    const [maxNumberLightHotelStars, setMaxNumberLightHotelStars] = useState(filters.maxHotelStars);
   

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
        setFilters((prevfilters) => ({
            ...prevfilters,
            ["minHotelStars"]: hotelStarButtonId,
        }));
    }

    const ClickMaxHotelStars = (hotelStarButtonId) => {
        setMaxNumberLightHotelStars(hotelStarButtonId);
        setFilters((prevfilters) => ({
            ...prevfilters,
            ["maxHotelStars"]: hotelStarButtonId,
        }));
    }

    const changeFilters = (e) => {
        const { name, value } = e.target;
        setFilters((prevfilters) => ({
            ...prevfilters,
            [name]: value,
        }));
    };

    const clearAllFilters = () => {
        setFilters({
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
                            <input type="number" name="minPrice" value={filters.minPrice}  placeholder="От" onChange={changeFilters}/>
                        </div>
                        <div>
                            <div>Макс. цена</div>
                            <input type="number" name="maxPrice" value={filters.maxPrice} placeholder="До" onChange={changeFilters}/>
                        </div>
                    </div>

                    <div className="hotel-stars-filter">
                        <div>
                            <span>Мин. звёзды отеля:</span>
                            <div className='hotel-stars-buttons'>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(1)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filters.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(1)}
                                >
                                    <img src={minNumberLightHotelStars >= 1 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(2)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filters.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(2)}
                                >
                                    <img src={minNumberLightHotelStars >= 2 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(3)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filters.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(3)}
                                >
                                    <img src={minNumberLightHotelStars >= 3 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(4)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filters.minHotelStars)}
                                    onClick={() => ClickMinHotelStars(4)}
                                >
                                    <img src={minNumberLightHotelStars >= 4 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMinNumberLightHotelStars(5)}
                                    onMouseLeave={() => setMinNumberLightHotelStars(filters.minHotelStars)}
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
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filters.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(1)}
                                >
                                    <img src={maxNumberLightHotelStars >= 1 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(2)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filters.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(2)}
                                >
                                    <img src={maxNumberLightHotelStars >= 2 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(3)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filters.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(3)}
                                >
                                    <img src={maxNumberLightHotelStars >= 3 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(4)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filters.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(4)}
                                >
                                    <img src={maxNumberLightHotelStars >= 4 ? star : darkStar}/>
                                </button>
                                <button
                                    onMouseEnter={() => setMaxNumberLightHotelStars(5)}
                                    onMouseLeave={() => setMaxNumberLightHotelStars(filters.maxHotelStars)}
                                    onClick={() => ClickMaxHotelStars(5)}
                                >
                                    <img src={maxNumberLightHotelStars >= 5 ? star : darkStar}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="nutrition-filter">
                        <div>Питание: </div>
                        <select name="nutritionType" value={filters.nutritionType} onChange={changeFilters}>
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

                    <div class="characteristic-filter">Наличие Wi-fi:</div>
                    <div><input type="radio" name="wifi" value="no_preference" checked={filters['wifi'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="wifi" value="yes" checked={filters['wifi'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="wifi" value="no" checked={filters['wifi'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Пляж рядом:</div>
                    <div><input type="radio" name="beach" value="no_preference" checked={filters['beach'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="beach" value="yes" checked={filters['beach'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="beach" value="no" checked={filters['beach'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Раздельные кровати:</div>
                    <div><input type="radio" name="separateBeds" value="no_preference" checked={filters['separateBeds'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="separateBeds" value="yes" checked={filters['separateBeds'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="separateBeds" value="no" checked={filters['separateBeds'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Раздельный санузел:</div>
                    <div><input type="radio" name="separateBathroom" value="no_preference" checked={filters['separateBathroom'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="separateBathroom" value="yes" checked={filters['separateBathroom'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="separateBathroom" value="no" checked={filters['separateBathroom'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Бассейн:</div>
                    <div><input type="radio" name="pool" value="no_preference" checked={filters['pool'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="pool" value="yes" checked={filters['pool'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="pool" value="no" checked={filters['pool'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Джакузи:</div>
                    <div><input type="radio" name="jacuzzi" value="no_preference" checked={filters['jacuzzi'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="jacuzzi" value="yes" checked={filters['jacuzzi'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="jacuzzi" value="no" checked={filters['jacuzzi'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Дискотеки:</div>
                    <div><input type="radio" name="disco" value="no_preference" checked={filters['disco'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="disco" value="yes" checked={filters['disco'] === 'yes'}  onChange={changeFilters} /></div>
                    <div><input type="radio" name="disco" value="no" checked={filters['disco'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Бильярд:</div>
                    <div><input type="radio" name="billiards" value="no_preference" checked={filters['billiards'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="billiards" value="yes" checked={filters['billiards'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="billiards" value="no" checked={filters['billiards'] === 'no'}  onChange={changeFilters}/></div>

                    <div class="characteristic-filter">Тенис (настольный):</div>
                    <div><input type="radio" name="tableTennis" value="no_preference" checked={filters['tableTennis'] === 'no_preference'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="tableTennis" value="yes" checked={filters['tableTennis'] === 'yes'}  onChange={changeFilters}/></div>
                    <div><input type="radio" name="tableTennis" value="no" checked={filters['tableTennis'] === 'no'}  onChange={changeFilters}/></div>
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
