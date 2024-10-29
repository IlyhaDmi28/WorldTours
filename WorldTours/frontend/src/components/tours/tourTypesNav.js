import TourType from './tourType'
import FilterButton from './filterButton'
import search from '../../img/search.svg'
import sea from '../../img/TourTypes/sea.svg'
import nature from '../../img/TourTypes/nature.svg'
import ski from '../../img/TourTypes/ski.svg'
import culture from '../../img/TourTypes/culture.svg'
import bus from '../../img/TourTypes/bus.svg'


function TypesTourNav({openFilters, setTourType}) {
	return (
	    <div className="tour-types-nav">
            <TourType name={"Горнолыжный курорт"} img={ski} setTourType={setTourType}/>
			<TourType name={"Путешествия по природе"} img={nature} setTourType={setTourType}/>
			<TourType name={"Отдых на море"} img={sea} setTourType={setTourType}/>
			<TourType name={"Культурный туризм"} img={culture} setTourType={setTourType}/>
			<TourType name={"Обчная поездка"} img={bus} setTourType={setTourType}/>
            <FilterButton openFilters={openFilters}/>
        </div>
  	);
}

export default TypesTourNav;