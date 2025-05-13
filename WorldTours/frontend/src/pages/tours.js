import '../styles/tours.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BigHeader from '../components/general/bigHeader';
import MainNavMenu from '../components/general/mainNavMenu';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCard from '../components/tours/tourCard';
const token = localStorage.getItem("token");

function Tours() {
	const location = useLocation();
	const [tours, setTours] = useState([])
	const [filter, setFilter] = useState({
		regionId: 0,
		countryId: 0,
		cityId: 0,
		hotelId: 0,
		departureCityId: 0,
		minDateOfDeparture: "",
		maxDateOfDeparture: "",
		transportTypeId: 0,
		tourTypeId: 0,
		seatsNumber: 0,
		daysNumber: 0,
		minPrice: 0,
        maxPrice: 0,
        minHotelStars: 1,
        maxHotelStars: 5,
        nutritionTypeId: 0,
        characteristics: [],
	});

	useEffect(() => {
		const getData = async () => {
            try {
				const segments = location.pathname.split('/');
				const hotelId = segments[segments.length - 1];
				
				let response;
				response = hotelId !== 'tours' ? await axios.get(`https://localhost:7276/tour/tours?hotelId=${hotelId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }) : await axios.get('https://localhost:7276/tour/tours', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                })
				;
				const toursData = response.data;
				setTours(toursData);

				response = await axios.get(`https://localhost:7276/tour/characteristics`, {
					headers: {
						'Authorization': 'Bearer ' + token,
					}
				});
				
				const characteristicsData = response.data;
				
				setFilter((prevFilter) => {
					return {
						...prevFilter,
						hotelId: hotelId !== 'tours' ? hotelId : 0,
						characteristics: characteristicsData.map((characteristic) => {return {...characteristic, value: 0}})
					};
				});
				
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, [location.key]);

	return (
		<div className="tours">
			<BigHeader filter={filter} setFilter={setFilter} setTours={setTours}/>
			<div className="line-under-header"></div>
			<TourTypesNav filter={filter} setFilter={setFilter} setTours={setTours} selectedTourType={filter.tourTypeId}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCard tour={tour} />))}
			</div>
		</div>
	);
}

export default Tours;
