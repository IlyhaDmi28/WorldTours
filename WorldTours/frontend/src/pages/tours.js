import '../styles/tours.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCard from '../components/tours/tourCard';
import Filters from '../components/tours/filters';

function Tours() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const tour = {
		name: 'Логово Андрея ЧЧЧЧЧЧЧЧЧЧЧЧЧЧ',
		mark: 4.5,
		country: 'Страна',
		city: 'город',
		hotelStars: 5,
		price: 800,
	};

	// Функция для открытия модального окна
	const openFilters = () => {
		setIsFiltersOpen(true);
		document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
	};

	// Функция для закрытия модального окна
	const closeFilters = () => {
		setIsFiltersOpen(false);
		document.body.style.overflow = 'auto'; // Включаем прокрутку страницы обратно
	};

	return (
		<div className="tours">
			<Header />
			<div className="line-under-header"></div>
			<TourTypesNav openFilters={openFilters} />
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

			<Filters isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} />
		</div>
	);
}

export default Tours;
