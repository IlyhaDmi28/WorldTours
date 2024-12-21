import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import TourType from '../tours/tourType'
import all from '../../img/all.svg'
import add from '../../img/add.svg'
import {UserContext} from '../../context/userContext';
const token = localStorage.getItem("token");

function TypesTourNav({setTours, setSelectedTourType, selectedTourType}) {
	const {authUser, setAuthUser} = useContext(UserContext);
	const [tourTypes, setTourTypes] = useState([]); 

	useEffect(() => {
		const getData = async () => {
            try {
				const response = await axios.get('https://localhost:7276/tour/tour_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const typesData = response.data;
				setTourTypes(typesData);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const changeTourType = async (id) => {
		try {
			setSelectedTourType(id);
			
			let response;
			response = await axios.get(`https://localhost:7276/tour/tours_to_edit?tourTypeId=${id}`, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});
			const toursData = response.data;
			console.log('xxx');
			console.log(toursData);
			setTours(toursData);
		} catch (error) {
			console.error('Ошибка загрузки данных:', error);
		} 
	}

	return (
	    <div className="tour-types-nav">
			<TourType tourType={{id: 0, name: "Все виды туров", imageUrl: all}} selectedTourType={selectedTourType} setTourType={() => changeTourType(0)}/>
			{tourTypes.map((tourType) => (<TourType tourType={tourType} selectedTourType={selectedTourType} setTourType={() => changeTourType(tourType.id)}/>))}

			<div className='filter-and-add-tour-button'>
				<a className='add-tour-button' href='/tour_editor/0'>
					<img src={add}/>
				</a>
			</div>
        </div>
  	);
}

export default TypesTourNav;