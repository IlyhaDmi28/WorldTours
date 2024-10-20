import filter from '../../img/filter.svg'

function FilterButton({ openFilters }) {
	return (
	    <button className="filter-button" onClick={openFilters}> 
            <img src={filter}/>
            <div>Фильры</div>
        </button>
  	);
}

export default FilterButton;