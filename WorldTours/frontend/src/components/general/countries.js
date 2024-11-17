// import flag from '../../img/flags/bulgaria.svg';
import flag from '../../img/flags/turkey.svg';

function Countries({goNextDirectionsPage, closeDirections, position}) {
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