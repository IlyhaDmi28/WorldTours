
import filter from '../../img/filter.svg'
import TuneIcon from '@mui/icons-material/Tune';

function FilterButton({ text, openFilters }) {
	return (
	    <button className="filter-button" onClick={openFilters}> 
            <img src={filter}/>
            <div>{text}</div>
        </button>
        
  	);
}

export default FilterButton;