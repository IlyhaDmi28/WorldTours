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
