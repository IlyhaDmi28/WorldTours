import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search from '../../img/search.svg'
import Regions from './regions';
import Countries from './countries';
import Cities from './cities';
const token = localStorage.getItem("token");

function MainFilters({filter, setFilter}) {
    const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
    const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
	});

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (filter.regionId != null && filter.countryId != null && filter.cityId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/get?countryId=${filter.countryId}&cityId=${filter.cityId}&hotelId=${filter.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
                    
                    console.log('response.data');
                    console.log(response.data);
                    console.log(filter);
					setDirectionInfo(response.data);
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}
		};
	
		getDirectionInfo();
	}, [filter]);

    const [transportTypes, setTransportTypes] = useState([]);
    const [departureCities, setDepartureCities] = useState([]);

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

                response = await axios.get('https://localhost:7276/route/departure_cities', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departureCitiesData = response.data;
				console.log(departureCitiesData);
                setDepartureCities(departureCitiesData);

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
						...prevFilter,
						regionId: directionId
					}
				case 2:
					return {
						...prevFilter,
						countryId: directionId
					}
				case 3:
					return {
						...prevFilter,
						cityId: directionId
					}
				default:
					break;
			}
		});
	};

    const deleteSelectedDirection = () => {
		setDirectionInfo({
			country: null,
			city: null,
		});

		setFilter((prevFilter) => { 
            return {
                ...prevFilter,
                regionId: null,
                countryId: null,
                cityId: null,
            }
        });
	}

    const directions = [
        null,
        <Regions selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries regionId={filter.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities countyId={filter.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	return (
	    <div className="main-filters"> 
            <div className="input-route" onClick={() => {deleteSelectedDirection(); setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}}>
                <div>Выберите направление</div>
                <div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
            </div>

            <hr></hr>

            <div className='input-departure'>
                <div>Выбирете город отправления</div>
                
                <select onChange={(e) => setFilter((prevFilter => {return {...prevFilter, departureCityId: e.target.value}}))}>
                    {departureCities.map((departureCity) => (
                        <option 
                            key={departureCity.id}
                            value={departureCity.id}
                        >
                            {departureCity.name}
                        </option>
                    ))}
                </select>
            </div>

            <hr></hr>

            <div className="input-date">
                <div>Прибытие</div>
                <input type="date" onChange={(e) => setFilter((prevFilter => {return {...prevFilter, dateOfDeparture: e.target.value}}))}/>
            </div>

            <hr></hr>

            <div className="input-date">
                <div>Убытие</div>
                <input type="date" onChange={(e) => setFilter((prevFilter => {return {...prevFilter, dateOfReturn: e.target.value}}))}/>
            </div>

            <hr></hr>

            <div className="input-transport">
                <div>Выбирете транспорт</div>
                <select onChange={(e) => setFilter((prevFilter => {return {...prevFilter, transportTypeId: e.target.value}}))}>
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

            <button className='search-by-main-filters' onClick={() => console.log(filter)}>
                <img src={search}/>
            </button>
            <div className='directions-area'>
                {directions[directionsPageInndex]}
            </div>
        </div>
  	);
}

export default MainFilters;