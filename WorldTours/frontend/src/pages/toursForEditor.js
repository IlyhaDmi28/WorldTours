import '../styles/tours.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BigHeader from '../components/general/bigHeader';
import TourTypesNavForManager from '../components/tours/tourTypesNavForManager';
import TourCardForManager from '../components/tours/tourCardForManager';
const token = localStorage.getItem("token");

function ToursForEditor() {
	const authUser = useSelector((state) => state.authUser.value)
	const [tours, setTours] = useState([])
	const [selectedTourType, setSelectedTourType] = useState(0);

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
				setTours(toursData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const deleteTour = async (deletedTour) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете удалить тур, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.delete(`https://localhost:7276/tour/delete?tourId=${deletedTour.id}`, {
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
			<TourTypesNavForManager setTours={setTours} setSelectedTourType={setSelectedTourType} selectedTourType={selectedTourType}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCardForManager tour={tour} deleteTour={deleteTour} />))}
			</div>
		</div>
	);
}

export default ToursForEditor;
