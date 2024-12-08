import '../styles/tours.scss';
import BigHeader from '../components/general/bigHeader';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCard from '../components/tours/tourCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {UserContext} from '../context/userContext';

const token = localStorage.getItem("token");

function Tours() {
	const [tours, setTours] = useState([])

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get('https://localhost:7276/tour/GetTours', {
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
			<BigHeader/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav />
			<div className="tours-list">
				{tours.map((tour) => (<TourCard tour={tour} />))}
			</div>
		</div>
	);
}

export default Tours;
