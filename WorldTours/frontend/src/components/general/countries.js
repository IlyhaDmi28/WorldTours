import flag from '../../img/flags/bulgaria.svg';

function Countries({goNextDirectionsPage, closeDirections}) {
	const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDirections();
        }
    }

	return (
		<div className='directions-overlay' onClick={handleOverlayClick}>
			<div className="countries">
				<div>
					<div className="geographic-area"><b>Выберите страну</b></div>
					<div className="countries-list">
                        <div onClick={goNextDirectionsPage} className="counrty">
							<img src={flag}/>
							<div>Пидорасы</div>
						</div>
						<div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
                        <div className="counrty">
							<img src={flag}/>
							<div>Болгария</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default Countries;