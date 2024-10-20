import TourType from './tourType'
import FilterButton from './filterButton'

function TypesTourNav({openFilters}) {
	return (
	    <div className="tour-types-nav">
            <TourType/>
            <TourType/>
            <TourType/>
            <TourType/>
            <TourType/>
            <TourType/>
            <TourType/>
            <TourType/>
            <FilterButton openFilters={openFilters}/>
        </div>
  	);
}

export default TypesTourNav;