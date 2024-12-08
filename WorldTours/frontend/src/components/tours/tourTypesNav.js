import React, { useContext, useState } from 'react';
import TourType from './tourType'
import FilterButton from './filterButton'
import Filters from './filters'
import all from '../../img/TourTypes/all.svg'
import sea from '../../img/TourTypes/sea.svg'
import nature from '../../img/TourTypes/nature.svg'
import ski from '../../img/TourTypes/ski.svg'
import culture from '../../img/TourTypes/culture.svg'
import bus from '../../img/TourTypes/bus.svg'
import add from '../../img/add.svg'
import {UserContext} from '../../context/userContext';

function TypesTourNav({setTourType}) {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const {authUser, setAuthUser} = useContext(UserContext);

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
            <TourType name={"Все виды туров"} img={all} setTourType={setTourType}/>
            <TourType name={"Горнолыжный курорт"} img={ski} setTourType={setTourType}/>
			<TourType name={"Путешествия по природе"} img={nature} setTourType={setTourType}/>
			<TourType name={"Отдых на море"} img={sea} setTourType={setTourType}/>
			<TourType name={"Культурный туризм"} img={culture} setTourType={setTourType}/>
			<TourType name={"Обчная поездка"} img={bus} setTourType={setTourType}/>
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
			
			<Filters isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} />
			
			{/* <Filters isFiltersOpen={isFiltersOpen} closeFilters={closeFilters} /> */}
        </div>
  	);
}

export default TypesTourNav;