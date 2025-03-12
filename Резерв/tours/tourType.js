function TourType({tourType, setTourType, selectedTourType }) {
	return (
	    <button className="tour-type" style={selectedTourType === tourType.id  ? {borderBottom: '2px solid black'} : {}} onClick={setTourType}>
            <img src={tourType.imageUrl}/>
            <div>{tourType.name}</div>
        </button>
  	);
}

export default TourType;