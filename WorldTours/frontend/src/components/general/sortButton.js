
import sort from '../../img/sort.svg'

function SortButton({ openSorts }) {
	return (
	    <button className="sort-button" onClick={openSorts}> 
            <img src={sort}/>
        </button>
  	);
}

export default SortButton;