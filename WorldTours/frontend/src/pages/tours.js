import '../styles/tours.scss';
import BigHeader from '../components/general/bigHeader';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCard from '../components/tours/tourCard';

function Tours() {
	const tour = {
		name: 'Логово Андрея ЧЧЧЧЧЧЧЧЧЧЧЧЧЧ',
		mark: 4.5,
		country: 'Страна',
		city: 'город',
		hotelStars: 5,
		price: 800,
	};

	return (
		<div className="tours">
			<BigHeader/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav />
			<div className="tours-list">
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
				<TourCard tour={tour} />
			</div>
		</div>
	);
}

export default Tours;
