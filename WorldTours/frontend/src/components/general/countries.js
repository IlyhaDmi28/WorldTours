// import flag from '../../img/flags/bulgaria.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem("token");

function Countries({regionId, selectDirection, goNextDirectionsPage, closeDirections, position}) {
	const [countries, setCountries] = useState([])
		

	useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get(`https://localhost:7276/direction/countries?regionId=${regionId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				setCountries(response.data);
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
			<div className="countries" style={position ? {left: position.left, top: position.top} :{}}>
				<div>
					<div className="geographic-area"><b>Выберите страну</b></div>
					<div className="countries-list">
						{countries.map((country) => (
							<div className="counrty" onClick={() => {selectDirection(country.id); goNextDirectionsPage()}}>
								<img src={country.flagUrl}/>
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