import star from '../../img/star.svg'
import close from '../../img/close.svg'

function Filters({ isFiltersOpen, closeFilters }) {
    if (!isFiltersOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeFilters();
        }
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
                            <input type="number"/>
                        </div>
                        <div>
                            <div>Макс. цена</div>
                            <input type="number"/>
                        </div>
                    </div>

                    <div className="hotel-stars-filter">
                        <div>
                            <span>Мин. звёзды отеля:</span>
                            <div className='hotel-stars-buttons'>
                                <button>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                            </div>
                        </div>

                        <div>
                            <span>Макс. звёзды отеля:</span>
                            <div className='hotel-stars-buttons'>
                                <button>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                                <button>
                                    <img src={star}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="nutrition-filter">
                        <div>Питание: </div>
                        <select>
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
                    <div><input type="radio" name="wifi" checked/></div>
                    <div><input type="radio" name="wifi"/></div>
                    <div><input type="radio" name="wifi"/></div>

                    <div class="characteristic-filter">Пляж рядом:</div>
                    <div><input type="radio" name="beach" checked/></div>
                    <div><input type="radio" name="beach"/></div>
                    <div><input type="radio" name="beach"/></div>

                    <div class="characteristic-filter">Раздельные кровати:</div>
                    <div><input type="radio" name="separate_beds" checked/></div>
                    <div><input type="radio" name="separate_beds"/></div>
                    <div><input type="radio" name="separate_beds"/></div>

                    <div class="characteristic-filter">Раздельный санузел:</div>
                    <div><input type="radio" name="separate_bathroom" checked/></div>
                    <div><input type="radio" name="separate_bathroom"/></div>
                    <div><input type="radio" name="separate_bathroom"/></div>

                    <div class="characteristic-filter">Бассейн:</div>
                    <div><input type="radio" name="pool" checked/></div>
                    <div><input type="radio" name="pool"/></div>
                    <div><input type="radio" name="pool"/></div>

                    <div class="characteristic-filter">Джакузи:</div>
                    <div><input type="radio" name="jacuzzi" checked/></div>
                    <div><input type="radio" name="jacuzzi"/></div>
                    <div><input type="radio" name="jacuzzi"/></div>

                    <div class="characteristic-filter">Дискотеки:</div>
                    <div><input type="radio" name="disco" checked/></div>
                    <div><input type="radio" name="disco"/></div>
                    <div><input type="radio" name="disco"/></div>

                    <div class="characteristic-filter">Бильярд:</div>
                    <div><input type="radio" name="billiards" checked/></div>
                    <div><input type="radio" name="billiards"/></div>
                    <div><input type="radio" name="billiards"/></div>

                    <div class="characteristic-filter">Тенис (настольный):</div>
                    <div><input type="radio" name="table_tennis" checked/></div>
                    <div><input type="radio" name="table_tennis"/></div>
                    <div><input type="radio" name="table_tennis"/></div>
                </div>

                <hr></hr>
                <div className="filter-controllers">
                    <button>Очистить всё</button>
                    <button>Показать</button>

                </div>
            </div>
        </div>
    );
}

export default Filters;
