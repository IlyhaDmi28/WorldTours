import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TourType from './tourType'
import all from '../../img/all.svg'
import add from '../../img/add.svg'
const token = localStorage.getItem("token");

function TypesTourNavForManager({setTours, setSelectedTourType, selectedTourType}) {
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
			<div className="tour-types-nav-list">
				{/* <button className='tour-types-nav-page-button'>B</button> */}

				<div className="tour-types-list">
					<TourType tourType={{id: 0, name: "Все виды туров", imageUrl: all}} selectedTourType={selectedTourType} setTourType={() => changeTourType(0)}/>
					{tourTypes.map((tourType) => (<TourType tourType={tourType} selectedTourType={selectedTourType} setTourType={() => changeTourType(tourType.id)}/>))}
				</div>

				{/* <button className='tour-types-nav-page-button'>N</button> */}
			</div>

			<div className='add-tour-button'>
				<Link className='add-tour-button' to='/tour_editor/0'>
					<img src={add}/>
				</Link>
			</div>
        </div>
  	);
}

export default TypesTourNavForManager;