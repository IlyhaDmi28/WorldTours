import React, { useState } from 'react';
import search from '../../img/search.svg'
import Regions from './regions';
import Countries from './countries';
import Cities from './cities';

function MainFilters() {
    const [directionsPageInndex, setDirectionsPageInndex] = useState(0);

    const directions = [
        null,
        <Regions goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	return (
	    <div className="main-filters"> 
            <div className="input-route" onClick={() => setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}>
                <div>Выберите направление</div>
                <div>Регион, страна, город</div>
            </div>

            <hr></hr>

            <div className='input-departure'>
                <div>Выбирете город отправления</div>
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

            <hr></hr>

            <div className="input-date">
                <div>Прибытие</div>
                <input type="date"/>
            </div>

            <hr></hr>

            <div className="input-date">
                <div>Убытие</div>
                <input type="date"/>
            </div>

            <hr></hr>

            <div className="input-transport">
                <div>Выбирете транспорт</div>
                <select>
                    <option selected="selected">Вид</option>
                    <option>Самолёт</option>
                    <option>Автобус</option>
                    <option>Поезд</option>
                </select>
            </div>

            <button className='search-by-main-filters'>
                <img src={search}/>
            </button>
            <div className='directions-area'>
                {directions[directionsPageInndex]}
            </div>
        </div>
  	);
}

export default MainFilters;