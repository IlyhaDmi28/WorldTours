import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import TourType from './tourType'
import FilterButton from './filterButton'
import Filters from './filters'
import all from '../../img/all.svg'
const token = localStorage.getItem("token");

function TypesTourNav({filter, setFilter, setTours, selectedTourType}) {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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

	// Функция для открытия модального окна
	const openFilters = () => {
		setIsFiltersOpen(true);
		document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
	};

	// Функция для закрытия модального окна
	const closeFilters = () => {
		setIsFiltersOpen(false);
		document.body.style.overflow = 'auto'; // Включаем прокрутку страницы обратно
	};

	const changeTourType = async (id) => {
		const updatedFilter = { ...filter, tourTypeId: id }; // Локально обновляем фильтр
    	setFilter(updatedFilter); // Обновляем состояние

		try {
			let response;
			response = await axios.post(`https://localhost:7276/tour/filtred_tours`, updatedFilter, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});
			const toursData = response.data;
			console.log('xxx');
			console.log(toursData);
			setTours(toursData);

			response = await axios.get(`https://localhost:7276/tour/characteristics_to_filter?tourTypeId=${id}`, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});
			const characteristicsData = response.data
			setFilter((prevFilter) => {
				return {
					...prevFilter,
					descriptions: characteristicsData
				};
			});
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

			<FilterButton text={"Фильтры"} openFilters={openFilters} />
			<Filters filter={filter} setFilter={setFilter} isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} setTours={setTours}/>
        </div>
  	);
}

export default TypesTourNav;