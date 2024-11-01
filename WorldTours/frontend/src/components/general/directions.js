import world from '../../img/regions/world.jpg';
import europe from '../../img/regions/europe.jpg';
import middleEast from '../../img/regions/middle-east.jpg';

function Directions({closeDirections}) {
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="directions">
				<div>
					<div className="geographic-area"><b>Выберите регион</b></div>
					<div className="regions">
						<div className="region">
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
							<img src={europe}/>
							<div>Северная Африка</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Африка</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Латинская Америка</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Северная Америка</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Юго-Восточная Азия</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Центральная Азия</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Южная Азия</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Дальний Восток</div>
						</div>
						<div className="region">
							<img src={europe}/>
							<div>Океания</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Directions;