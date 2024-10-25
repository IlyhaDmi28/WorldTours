import search from '../../img/search.svg'

function TourType({name, img, setTourType }) {
	return (
	    <button className="tour-type" onClick={() => setTourType(name)}>
            <img src={img}/>
            <div>{name}</div>
        </button>
  	);
}

export default TourType;