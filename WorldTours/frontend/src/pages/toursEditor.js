import '../styles/tours-editor.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BigHeader from '../components/general/bigHeader';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCardForEditor from '../components/toursEditor/tourCardForEditor';
const token = localStorage.getItem("token");

function ToursEditor() {
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
				response = await axios.get('https://localhost:7276/tour/tours_to_edit', {
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

	const deleteTour = async (deletedTour) => {
        await axios.delete(`https://localhost:7276/tour/delete?id=${deletedTour.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		setTours(tours.filter(tour => tour !== deletedTour))
	}

	return (
		<div className="tours">
			<BigHeader filter={filter} setFilter={setFilter}/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav filter={filter} setFilter={setFilter}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCardForEditor tour={tour} deleteTour={deleteTour} />))}
			</div>
		</div>
	);
}

export default ToursEditor;
