import '../styles/tourEditor.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import Hotels from '../components/general/hotels';
import RoutesMenu from '../components/tourEditor/routesMenu';
import tourp from '../img/test.jpg';
import star from '../img/star.svg';
import food from '../img/food.svg';

function TourEditor() {
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [direction, setDirection] = useState({});

	
    const directions = [
        null,
        <Regions position={{left: '12%', top: '4%'}} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)} />,
        <Countries position={{left: '12%', top: '25%'}} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities position={{left: '12%', top: '25%'}} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Hotels position={{left: '12%', top: '25%'}} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="tour-editor-name">
					<div>
						<b>Название тура</b>
					</div>
					<input type='text'/>
			</div>

			<div className="tour-editor-images">
				<img className="main-tour-editor-img" src={tourp} />

				<div className="other-tour-editor-images-and-map">
					<div className="select-tour-editor-images-or-map">
						<button>Фото</button>
						<button>Карта</button>
					</div>

					<div className="other-tour-editor-images">
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
					</div>

					<button className="more-tour-editor-img-button">Больше фото</button>
				</div>
			</div>

			<div className="tour-editor-info-and-reservation">
				<div className="tour-editor-info">
					{/* <div className="main-tour-info">
						<div>
							<b>Отель</b>
						</div>
						<div>Страна, город</div>
					</div> */}

					{directions[directionsPageInndex]}

					<button className='select-tour-direction' onClick={() => setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}>
						Нажмите, что бы добавьте пункт направления
					</button>

					<div className="tour-editor-desription">
						<div><b>Описание</b></div>
						<textarea/>
					</div>

					<div className="tour-editor-characteristics">
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 1</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 2</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 3</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 4</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 5</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 6</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 7</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
						<div className="tour-editor-characteristic">
							<div>
								<b>Характеристика 8</b>
							</div>
							<div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
								<div>
									<input type="checkbox" name="d1"/>
									<label>d1</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<RoutesMenu/>
			</div>
		</div>
	);
}

export default TourEditor;
