import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search from '../../img/search.svg'
import Regions from './regions';
import Countries from './countries';
import Cities from './cities';
const token = localStorage.getItem("token");

function MainFilters() {
    const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
    const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
	});

    // useEffect(() => {
	// 	console.log ('хуй');
	// 	const getDirectionInfo = async () => {
	// 		if (direction.regionId != null && direction.countryId != null && direction.cityId != null && direction.hotelId != null) {
	// 			try {
	// 				const response = await axios.get(
	// 					`https://localhost:7276/direction/direction?countryId=${direction.countryId}&cityId=${direction.cityId}&hotelId=${direction.hotelId}`,
	// 					{
	// 						headers: {
	// 							Authorization: `Bearer ${token}`,
	// 						},
	// 					}
	// 				);
	
	// 				console.log(response.data);
	// 				setDirectionInfo(response.data);
	// 			} catch (error) {
	// 				console.error("Ошибка загрузки данных:", error);
	// 			}
	// 		}
	// 	};
	
	// 	getDirectionInfo(); // Вызов асинхронной функции
	// }, [direction]);

    const selectDirection = (directionId) => {
		setDirection((prevDirection) => {
			switch (directionsPageInndex) {
				case 1:
					return {
						...prevDirection,
						regionId: directionId
					}
				case 2:
					return {
						...prevDirection,
						countryId: directionId
					}
				case 3:
					return {
						...prevDirection,
						cityId: directionId
					}
				default:
					break;
			}
		});
	};

    const directions = [
        null,
        <Regions selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries regionId={direction.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities countyId={direction.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
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