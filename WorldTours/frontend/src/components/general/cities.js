import flag from '../../img/flags/bulgaria.svg';

function Cities({goNextDirectionsPage, closeDirections}) {
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="cities">
				<div>
					<div className="geographic-area"><b>Выберите город</b></div>
					<div className="cities-list">
                        <div onClick={closeDirections} className="city">
							<span>София</span>
						</div>
						<div className="city">
							<span>Варна</span>
						</div>
						<div className="city">
							<span>Андрегеевск</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Cities;