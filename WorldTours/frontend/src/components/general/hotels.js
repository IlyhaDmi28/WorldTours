import React, { useState } from 'react';

function Hotels({selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [hotels, setHotels] = useState([
		{
			id: 0,
			name: "Ебля Андрея",
		},
		{
			id: 1,
			name: "Ебля Сани",
		},
		{
			id: 1,
			name: "Ебля Кирилла",
		},
	]);
	
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