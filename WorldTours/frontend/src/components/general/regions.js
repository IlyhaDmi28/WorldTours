import React, { useState, useEffect } from 'react';
import axios from 'axios';
import world from '../../img/regions/world.jpg';
import europe from '../../img/regions/europe.jpg';
import middleEast from '../../img/regions/middle-east.jpg';
import northAfrica from '../../img/regions/north-africa.jpg';
import africa from '../../img/regions/africa.jpg';
import latinAmerica from '../../img/regions/latin-america.jpg';
import northAmerica from '../../img/regions/north-america.jpg';
import southEastAsia from '../../img/regions/south-east-asia.jpg';
import centralAsia from '../../img/regions/central-asia.jpg';
import southAsia from '../../img/regions/south-asia.jpg';
import eastAsia from '../../img/regions/east-asia.jpg';
import oceania from '../../img/regions/oceania.jpg';
const token = localStorage.getItem("token");

function Regions({selectDirection, goNextDirectionsPage, closeDirections, addDirection, position}) {
	const [regions, setRegions] = useState([]);

	useEffect(() => {
		const getData = async () => {
            try {
                const response = await axios.get('https://localhost:7276/direction/regions', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				console.log(response.data);

				setRegions(response.data);
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
			<div className="regions" style={position ? {left: position.left, top: position.top} :{}}>
				<div>
					<div className="geographic-area"><b>Выберите регион</b></div>
					<div className="regions-list">
						<div onClick={() => {selectDirection(0); goNextDirectionsPage()}} className="region">
							<img src={world}/>
							<div>Весь мир</div>
						</div>
						{regions.map((region) => (
							<div onClick={() => {selectDirection(region.id); goNextDirectionsPage()}} className="region">
								<img src={region.imageUrl}/>
								<div>{region.name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Regions;