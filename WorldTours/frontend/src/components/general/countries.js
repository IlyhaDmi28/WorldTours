// import flag from '../../img/flags/bulgaria.svg';
import React, { useState } from 'react';
import flag from '../../img/flags/turkey.svg';

function Countries({selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [countries, setCountries] = useState([
		{
			id: 0,
			name: "Пидорасы",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
		{
			id: 1,
			name: "Турция",
			flag: flag
		},
	]);
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="countries" style={position ? {left: position.left, top: position.top} :{}}>
				<div>
					<div className="geographic-area"><b>Выберите страну</b></div>
					<div className="countries-list">
						{countries.map((country) => (
							<div className="counrty" onClick={() => {selectDirection(country.id); goNextDirectionsPage()}}>
								<img src={country.flag}/>
								<div>{country.name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Countries;