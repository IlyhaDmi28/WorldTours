import TourType from '../tours/tourType';
import search from '../../img/search.svg'
import sea from '../../img/TourTypes/sea.svg'
import nature from '../../img/TourTypes/nature.svg'
import ski from '../../img/TourTypes/ski.svg'
import culture from '../../img/TourTypes/culture.svg'
import bus from '../../img/TourTypes/bus.svg'

function TourTypes({setTourType, goBack}) {
	return (
		<div className="tour-types">
			<div>
				<TourType name={"Горнолыжный курорт"} img={ski} setTourType={() => setTourType(0)}/>
				<TourType name={"Путешествия по природе"} img={nature} setTourType={() => setTourType(1)}/>
				<TourType name={"Отдых на море"} img={sea} setTourType={() => setTourType(2)}/>
				<TourType name={"Культурный туризм"} img={culture} setTourType={() => setTourType(3)}/>
				<TourType name={"Обчная поездка"} img={bus} setTourType={() => setTourType(4)}/>
			</div>
			<div className="question-buttons">
				<button>Не имеет значения</button>
				<br/>
				<br/>
				<button onClick={goBack}>Назад</button>
			</div>
		</div>
	);
}

export default TourTypes;
