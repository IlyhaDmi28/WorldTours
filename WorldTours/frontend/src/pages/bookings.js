import '../styles/bookings.scss';
import Header from '../components/general/header';
import BookingCard from '../components/bookings/bookingCard';

function Bookings() {
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
			<div className='change-show-bookings-list'>
				<button style={{backgroundColor: 'rgb(209, 216, 0)'}}>Все</button>
				<button style={{backgroundColor: 'rgb(69, 189, 69)'}}>Отправленные</button>
				<button style={{backgroundColor: 'rgb(60, 80, 254)'}}>Подтверждённые</button>
				<button style={{backgroundColor: 'rgb(224, 190, 39)'}}>Оплаченные</button>
			</div>
			<div className="bookings-list">
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
				<BookingCard booking={booking}/>
			</div>
		</div>
	);
}

export default Bookings;
