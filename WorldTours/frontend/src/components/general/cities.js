import React, { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem("token");

function Cities({countyId, selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get(`https://localhost:7276/direction/cities?countryId=${countyId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				setCities(response.data);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="cities-or-hotels" style={position ? {left: position.left, top: position.top} :{}}>
				<div>
					<div className="geographic-area"><b>Выберите город</b></div>
					<div className="cities-or-hotels-list">
						{
							!position ?  
							<>
								<div onClick={() => {selectDirection(0); goNextDirectionsPage()}} className="city-or-hotel">
									<span>Все города</span>
								</div>
								{cities.map((city) => (
									<div onClick={() => {selectDirection(city.id); goNextDirectionsPage()}} className="city-or-hotel">
										<span>{city.name}</span>
									</div>
								))}
							</> :
							<>
								{cities.map((city) => (
									<div onClick={() => {selectDirection(city.id); goNextDirectionsPage()}} className="city-or-hotel">
										<span>{city.name}</span>
									</div>
								))}
							</>
						}
						
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Cities;