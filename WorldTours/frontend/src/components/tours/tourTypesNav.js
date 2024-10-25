import TourType from './tourType'
import FilterButton from './filterButton'
import search from '../../img/search.svg'

function TypesTourNav({openFilters, setTourType}) {
	return (
	    <div className="tour-types-nav">
            <TourType name={"Горнолыжный курорт"} img={search} setTourType={setTourType}/>
			<TourType name={"Путешествия по природе"} img={search} setTourType={setTourType}/>
			<TourType name={"Отдых на море"} img={search} setTourType={setTourType}/>
			<TourType name={"Культурный туризм"} img={search} setTourType={setTourType}/>
			<TourType name={"Обчная поездка"} img={search} setTourType={setTourType}/>
            <FilterButton openFilters={openFilters}/>
        </div>
  	);
}

export default TypesTourNav;