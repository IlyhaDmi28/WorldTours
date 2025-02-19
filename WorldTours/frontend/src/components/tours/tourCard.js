import { Link } from 'react-router-dom';
import noPhoto from '../../img/noPhoto.png';
import star from '../../img/star.svg'
import all from '../../img/all.svg'

function TourCard({ tour }) {
    const getBackgroundColorMark = (mark) => {
        if (mark >= 4) {
            return '#0FE500'; 
        } else if (mark >= 3) {
            return '#efd700'; 
        } else if (mark >= 2) {
            return '#e5a800';
        } else if (mark >= 1) {
            return '#ff0000';
        } else if (mark >= 0) {
            return '#df0000';
        }
    };

	return (
	    <Link className="tour-card" to={`/tour/${tour.id}?routeId=${tour.routeId}`}>
            <img className="tour-card-img" src={tour.photoUrl === "" ? noPhoto : tour.photoUrl}/>
            <div className="tour-card-info">
                    <div className='tour-card-name'><b>{tour.name}</b></div>
                    <div className='tour-card-mark' style={{ backgroundColor: getBackgroundColorMark(tour.mark) }}><b>{3.2}</b></div>

                <div className="tour-card-country-and-city">
                    {tour.country}, {tour.city}
                </div>
                
                <img className="tour-card-type-img" src={all}/>

                <div className="tour-card-dates">
                    {tour.dateOfDeparture} - {tour.dateOfReturn}
                </div>

                <div className="tour-card-hotel-stars">
                    {Array(tour.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
                </div>

                <div className="tour-card-price">
                    <b>{tour.price}</b>
                    <span>BYN</span>
                </div>
            </div>
        </Link>
  	);
}

export default TourCard;