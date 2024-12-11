import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search from '../../img/search.svg'
import Regions from './regions';
import Countries from './countries';
import Cities from './cities';
const token = localStorage.getItem("token");

function MainFilters({filter, setFilter}) {
    const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
    const [direction, setDirection] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
	});

    const [transportTypes, setTransportTypes] = useState([]);
    const [departmentDepartures, setDepartmentDepartures] = useState([]);

    useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response =  await axios.get('https://localhost:7276/route/transport_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const transportTypes = response.data;
				console.log(transportTypes);
                setTransportTypes(transportTypes);

                response = await axios.get('https://localhost:7276/route/department_departures', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departmentDeparture = response.data;
				console.log(departmentDeparture);
                setDepartmentDepartures(departmentDeparture);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

    const selectDirection = (directionId) => {
		setFilter((prevFilter) => {
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
                    {departmentDepartures.map((departmentDeparture) => (
                        <option 
                            key={departmentDeparture.id}
                            value={departmentDeparture.id}
                        >
                            {departmentDeparture.city}
                        </option>
                    ))}
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
                    {transportTypes.map((transportType) => (
                        <option 
                            key={transportType.id}
                            value={transportType.id}
                        >
                            {transportType.name}
                        </option>
                    ))}
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