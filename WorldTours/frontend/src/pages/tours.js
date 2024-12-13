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
		regionId: null,
		countryId: null,
		cityId: null,
		departureCityId: null,
		dateOfDeparture: null,
		dateOfReturn: null,
		transportTypeId: null,
		tourTypeId: null,
		minPrice: 0,
        maxPrice: 99999,
        minHotelStars: 1,
        maxHotelStars: 5,
        nutritionType: 'Не важно',
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
				console.log(toursData);
				setTours(toursData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);


	return (
		<div className="tours">
			<BigHeader filter={filter} setFilter={setFilter}/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav filter={filter} setFilter={setFilter}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCard tour={tour} />))}
			</div>
		</div>
	);
}

export default Tours;
