import flag from '../../img/flags/bulgaria.svg';

function Hotels({goNextDirectionsPage, closeDirections, position}) {
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
                        <div onClick={goNextDirectionsPage} className="city-or-hotel">
							<span>БДСМ отель, где Андрея ебут</span>
						</div>
						<div className="city-or-hotel">
							<span>Шарага БГТУ</span>
						</div>
						<div className="city-or-hotel">
							<span>Общага 1</span>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Hotels;