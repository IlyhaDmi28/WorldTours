import TourType from '../tours/tourType';
import search from '../../img/search.svg'
import sea from '../../img/TourTypes/sea.svg'

function TourTypes({setTourType}) {
	return (
		<div className="tour-types">
			<div>
				<TourType name={"Горнолыжный курорт"} img={search} setTourType={setTourType}/>
				<TourType name={"Путешествия по природе"} img={search} setTourType={setTourType}/>
				<TourType name={"Отдых на море"} img={sea} setTourType={setTourType}/>
				<TourType name={"Культурный туризм"} img={search} setTourType={setTourType}/>
				<TourType name={"Обчная поездка"} img={search} setTourType={setTourType}/>
			</div>
			<div className="doesnt-matter-button">
				<button>Не имеет значения</button>
			</div>
		</div>
	);
}

export default TourTypes;
