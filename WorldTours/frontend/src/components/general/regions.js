import React, { useState, useEffect } from 'react';
import axios from 'axios';
import world from '../../img/world.jpg';
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