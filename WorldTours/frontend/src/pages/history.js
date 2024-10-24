import '../styles/history.scss';
import Header from '../components/general/header';
import HistoryCard from '../components/history/historyCard';

function History() {
	const booking = {
		name: 'Логово Андрея ЧЧЧЧЧЧЧЧЧЧЧЧЧЧ',
		country: 'Страна',
		city: 'город',
		hotelStars: 5,
		price: 800,
	};


	return (
		<div className="bookings narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className='user-statistic-of-tours '>
				<div>Количество туров: <b>12</b></div>
				<div>Общая стоимость: <b>10000</b> <span>BYN</span></div>
			</div>
			<div className="bookings-list">
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
				<HistoryCard booking={booking}/>
			</div>
		</div>
	);
}

export default History;
