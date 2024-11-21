import React, { useState } from 'react';
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

function Regions({selectDirection, goNextDirectionsPage, closeDirections, addDirection, position}) {
	const [regions, setRegions] = useState([
		{
			id: 0,
			name: "Весь мир",
			img: world
		},
		{
			id: 1,
			name: "Европа и Россия",
			img: europe
		},
		{
			id: 1,
			name: "Ближний Восток",
			img: middleEast
		},
		{
			id: 1,
			name: "Северная Африка",
			img: northAfrica
		},
		{
			id: 1,
			name: "Африка",
			img: africa
		},
		{
			id: 1,
			name: "Латинская Америка",
			img: latinAmerica
		},
		{
			id: 1,
			name: "Северная Америка",
			img: northAmerica
		},
		{
			id: 1,
			name: "Юго-Восточная Азия",
			img: southEastAsia
		},
		{
			id: 1,
			name: "Центральная Азия",
			img: centralAsia
		},
		{
			id: 1,
			name: "Южная Азия",
			img: southAsia
		},
		{
			id: 1,
			name: "Восточная Азия",
			img: eastAsia
		},
		{
			id: 1,
			name: "Океания",
			img: oceania
		},
	]);

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
						{regions.map((region) => (
							<div onClick={() => {selectDirection(region.id); goNextDirectionsPage()}} className="region">
								<img src={region.img}/>
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