import '../styles/сurrentBookings.scss';

function CurrentBookings() {
	return (
		<div className="tours">
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

export default CurrentBookings;
