import '../styles/tourEditor.scss';
import Header from '../components/general/header';
import BookingMenuEditor from '../components/tourEditor/bookingMenuEditor';
import tourp from '../img/test.jpg';
import star from '../img/star.svg';
import food from '../img/food.svg';

function TourEditor() {
	const getBackgroundColorMark = (mark) => {
		if (mark >= 4) {
			return '#0FE500';
		} else if (mark >= 3) {
			return '#efd700';
		} else if (mark >= 2) {
			return '#e5a800';
		} else if (mark >= 1) {
			return '#ff0000';
		} else if (mark >= 0) {
			return '#df0000';
		}
	};

	return (
		<div className="tour narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="tour-name-and-mark">
					<div>
						<b>Название тура</b>
					</div>
					<input type='text'/>
			</div>

			<div className="tour-images">
				<img className="main-tour-img" src={tourp} />

				<div className="other-tour-images-and-map">
					<div className="select-tour-images-or-map">
						<button>Фото</button>
						<button>Карта</button>
					</div>

					<div className="other-tour-images">
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
						<img src={tourp} />
					</div>

					<button className="more-tour-img-button">Больше фото</button>
				</div>
			</div>

			<div className="tour-info-and-reservation">
				<div className="tour-info">
					{/* <div className="main-tour-info">
						<div>
							<b>Отель</b>
						</div>
						<div>Страна, город</div>
					</div> */}

					<button className='select-tour-direction'>
						Нажмите, что бы добавьте пункт направления
					</button>

					{/* <div className="tour-hotel-stars">
						<img src={star} />
						<img src={star} />
						<img src={star} />
						<img src={star} />
						<img src={star} />
					</div> */}

					{/* <div className="main-services">
                        <div className="main-service">
                            <img src={food}/>
                            <div>Хуй на палочке</div>
                        </div>
                        <div className="main-service">
                            <img src={star}/>
                            <div>Можно выебать Андрея</div>
                        </div>
                        <div className="main-service">
                            <img src={star}/>
                            <div>Рядом море спермы</div>
                        </div>
                    </div> */}

					<div className="tour-desription">
						<div><b>Описание</b></div>
						<textarea/>
					</div>

					<div className="tour-characteristics">
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 1</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 2</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 3</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 4</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 5</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 6</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 7</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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
						<div className="tour-characteristic">
							<div>
								<b>Характеристика 8</b>
							</div>
							<div>
								{/* <input type="checkbox" name="d1" checked={filters.billiards} onChange={changeFilters}/> */}
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

				<BookingMenuEditor/>
			</div>
		</div>
	);
}

export default TourEditor;
