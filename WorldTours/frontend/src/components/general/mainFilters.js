import React, { useState, useEffect } from 'react';
import axios from 'axios';
import search from '../../img/search.svg'
import Regions from './regions';
import Countries from './countries';
import Cities from './cities';
const token = localStorage.getItem("token");

function MainFilters({filter, setFilter, setTours}) {
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
                setTransportTypes(transportTypes);

                response = await axios.get('https://localhost:7276/route/departure_cities', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departureCitiesData = response.data;
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

    const getTours = async () => {
        console.log(filter);
		const response = await axios.post(`https://localhost:7276/tour/filtred_tours`, filter, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });
        const toursData = response.data;
        setTours(toursData);
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
                <div>Направление</div>
                <div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
            </div>

            <hr></hr>

            <div className='input-departure'>
                <div>Город отправления</div>
            
                <select onChange={(e) => setFilter((prevFilter => {return {...prevFilter, departureCityId: e.target.value}}))}>
                    <option key={0} value={0}> Не важно </option>
                    {departureCities.map((departureCity) => (
                        <option key={departureCity.id} value={departureCity.id}>
                            {departureCity.name}
                        </option>
                    ))}
                </select>
            </div>

            <hr></hr>

            <div className="input-dates">
                <div className="input-date">
                    <div>Отправления с</div>
                    <input type="date" onChange={(e) => setFilter((prevFilter => {return {...prevFilter, minDateOfDeparture: e.target.value}}))}/>
                </div>
                <div className="input-date">
                    <div>Отправления до</div>
                    <input type="date" onChange={(e) => setFilter((prevFilter => {return {...prevFilter, maxDateOfDeparture: e.target.value}}))}/>
                </div>
            </div>

            <hr></hr>

            <div className="input-transport">
                <div>Вид транспорта</div>
                <select onChange={(e) => setFilter((prevFilter => {return {...prevFilter, transportTypeId: e.target.value}}))}>
                    <option key={0} value={0}>Не важно</option>
                    {transportTypes.map((transportType) => (
                        <option key={transportType.id} value={transportType.id}>
                            {transportType.name}
                        </option>
                    ))}
                </select>
            </div>

            <hr></hr>

            <div className="inputs-number-seats-and-days">
                <div className='input-number-seats-or-days'>
                    <div>Кол. мест:</div>
                    <input type="number"/>
                </div>
                <div className='input-number-seats-or-days'>
                    <div>Кол. дней:</div>
                    <input type="number"/>
                </div>
            </div>

            <button className='search-by-main-filters' onClick={getTours}>
                <img src={search}/>
            </button>
            <div className='directions-area'>
                {directions[directionsPageInndex]}
            </div>
        </div>
  	);
}

export default MainFilters;