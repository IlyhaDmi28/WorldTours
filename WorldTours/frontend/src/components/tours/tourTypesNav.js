import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import TourType from './tourType'
import FilterButton from './filterButton'
import Filters from './filters'
import all from '../../img/all.svg'
import add from '../../img/add.svg'
import {UserContext} from '../../context/userContext';
const token = localStorage.getItem("token");

function TypesTourNav({filter, setFilter}) {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
				console.log(typesData);
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

	return (
	    <div className="tour-types-nav">
			{tourTypes.map((tourType) => (<TourType name={tourType.name} img={tourType.imageUrl} setTourType={() => setFilter((prevFilter) => { return { ...prevFilter, tourTypeId: tourType.id }})}/>))}
			{authUser.role === 2 ? (
				<div className='filter-and-add-tour-button'>
					<FilterButton openFilters={openFilters}/>
					<a className='add-tour-button' href='/tour_editor/0'>
						<img src={add}/>
					</a>
				</div>
			) :
			(
				<FilterButton openFilters={openFilters}/>
			)}
			
			<Filters filter={filter} setFilter={setFilter} isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} />
			
			{/* <Filters isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} /> */}
        </div>
  	);
}

export default TypesTourNav;