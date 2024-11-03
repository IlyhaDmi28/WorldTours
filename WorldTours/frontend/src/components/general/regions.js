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

function Regions({goNextDirectionsPage, closeDirections}) {
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="regions">
				<div>
					<div className="geographic-area"><b>Выберите регион</b></div>
					<div className="regions-list">
						<div onClick={goNextDirectionsPage} className="region">
							<img src={world}/>
							<div>Весь мир</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Европа и Россия</div>
						</div>
						<div className="region">
							<img src={middleEast}/>
							<div>Ближний Восток</div>
						</div>
						<div className="region">
							<img src={northAfrica}/>
							<div>Северная Африка</div>
						</div>
						<div className="region">
							<img src={africa}/>
							<div>Африка</div>
						</div>
						<div className="region">
							<img src={latinAmerica}/>
							<div>Латинская Америка</div>
						</div>
						<div className="region">
							<img src={northAmerica}/>
							<div>Северная Америка</div>
						</div>
						<div className="region">
							<img src={southEastAsia}/>
							<div>Юго-Восточная Азия</div>
						</div>
						<div className="region">
							<img src={centralAsia}/>
							<div>Центральная Азия</div>
						</div>
						<div className="region">
							<img src={southAsia}/>
							<div>Южная Азия</div>
						</div>
						<div className="region">
							<img src={eastAsia}/>
							<div>Восточная Азия</div>
						</div>
						<div className="region">
							<img src={oceania}/>
							<div>Океания</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Regions;