import '../styles/tours.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BigHeader from '../components/general/bigHeader';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCard from '../components/tours/tourCard';
const token = localStorage.getItem("token");

function Tours() {
	const [tours, setTours] = useState([])
	const [filter, setFilter] = useState({
		regionId: 0,
		countryId: 0,
		cityId: 0,
		departureCityId: 0,
		dateOfDeparture: "",
		dateOfReturn: "",
		transportTypeId: 0,
		tourTypeId: 0,
		minPrice: 0,
        maxPrice: 0,
        minHotelStars: 1,
        maxHotelStars: 5,
        nutritionTypeId: 0,
        descriptions: [],
	});

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get('https://localhost:7276/tour/tours', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const toursData = response.data;
				setTours(toursData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);


	return (
		<div className="tours">
			<BigHeader filter={filter} setFilter={setFilter} setTours={setTours}/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav filter={filter} setFilter={setFilter} setTours={setTours}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCard tour={tour} />))}
			</div>
		</div>
	);
}

export default Tours;
