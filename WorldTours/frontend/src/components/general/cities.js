import React, { useState } from 'react';
import flag from '../../img/flags/bulgaria.svg';

function Cities({selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [cities, setCities] = useState([
		{
			id: 0,
			name: "Стамбул",
		},
		{
			id: 1,
			name: "Анкара",
		},
		{
			id: 1,
			name: "Анталья",
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
					<div className="geographic-area"><b>Выберите город</b></div>
					<div className="cities-or-hotels-list">
						{cities.map((city) => (
							<div onClick={() => {selectDirection(city.id); goNextDirectionsPage()}} className="city-or-hotel">
								<span>{city.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Cities;