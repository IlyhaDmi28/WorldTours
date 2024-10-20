import '../styles/tour.scss';
import SmallHeader from '../components/general/smallHeader';
import BookingMenu from '../components/tour/bookingMenu';
import tourp from '../img/test.jpg';
import star from '../img/star.svg';
import food from '../img/food.svg';

function Tour() {
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
		<div className="tour">
			<SmallHeader />
			<div className="line-under-header"></div>

			<div className="tour-name-and-mark">
				<p>
					<b>Место для ебли Андрея</b>
				</p>
				<div style={{ backgroundColor: getBackgroundColorMark(4.2) }}>
					<b>4.2</b>
				</div>
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
					<div className="main-tour-info">
						<div>
							<b>Отель</b>
						</div>
						<div>Страна, город</div>
					</div>

					<div className="tour-hotel-stars">
						<img src={star} />
						<img src={star} />
						<img src={star} />
						<img src={star} />
						<img src={star} />
					</div>

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
						Лучший отель, бля, отвечаю нахуй. Рядом пляж, море. Там можно купаться, девачек кадрит. Вообщем,
						тур охуенейший. Пиздуй сюда нахуй, нераздумывая!!!!!!!!!!!! ЧМПТАВОМИАВРМ ВАПОАВОПАВО
						ОВАОПАВОПАВОЛ СОПЛВОПЛАВОЛВО ВАЛПОАВЛПОАВЛ ВАПВАП ПИАВПМВАМАВ ВАПАВПАВЬПВАОМОВАМО
						ВАОПАВПЛАВОЛМОВЛАЮ. ВШПОАВАОЫВОААВМИР ЫВРАВРЫАИРЫВ ЫВАИЫВОАЛЫИР ЫВАИЫВОАВЫ ЫВАВЫИВЫОЛАВЫЛОТМВСМ
						МТ!
					</div>

					<div className="tour-characteristics">
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
						<div className="tour-characteristic">
							<div>
								<b>Мужской орган</b>
							</div>
							<div>
								<ul>
									<li>Хуй</li>
									<li>Залупа</li>
									<li>Пенис</li>
									<li>Член</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<BookingMenu />
			</div>
		</div>
	);
}

export default Tour;
