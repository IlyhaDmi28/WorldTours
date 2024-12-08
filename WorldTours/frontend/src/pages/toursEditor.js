import '../styles/tours-editor.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BigHeader from '../components/general/bigHeader';
import TourTypesNav from '../components/tours/tourTypesNav';
import TourCardForEditor from '../components/toursEditor/tourCardForEditor';
const token = localStorage.getItem("token");

function ToursEditor() {
	const [tours, setTours] = useState([])
	
	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get('https://localhost:7276/tour/GetToursToEdit', {
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
        await axios.delete(`https://localhost:7276/tour/DeleteTour?id=${deletedTour.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		setTours(tours.filter(tour => tour !== deletedTour))
	}

	return (
		<div className="tours">
			<BigHeader/>
			<div className="line-under-header"></div>
			{/* <TourTypesNav setTourType={setTourType} /> */}
			<TourTypesNav />
			<div className="tours-list">
				{tours.map((tour) => (<TourCardForEditor tour={tour} deleteTour={deleteTour} />))}
			</div>
		</div>
	);
}

export default ToursEditor;
