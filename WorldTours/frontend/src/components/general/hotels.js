import React, { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem("token");

function Hotels({cityId, selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [hotels, setHotels] = useState([]);
	
	useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get(`https://localhost:7276/direction/hotels?cityId=${cityId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				console.log(response.data);

				setHotels(response.data);
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
					<div className="geographic-area"><b>Выберите отель</b></div>
					<div className="cities-or-hotels-list">
						{hotels.map((hotel) => (
							<div onClick={() => {selectDirection(hotel.id); goNextDirectionsPage()}} className="city-or-hotel">
								<span>{hotel.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Hotels;