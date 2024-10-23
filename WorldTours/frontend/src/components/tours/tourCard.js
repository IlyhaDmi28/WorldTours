import tourp from '../../img/test.jpg'
import star from '../../img/star.svg'

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
	    <a className="tour-card" href='/tour'>
            <img className="tour-card-img" src={tourp}/>
            <div className="tour-card-info">
                <div className='name-and-mark-of-tour'>
                    <div><b>{tour.name}</b></div>
                    <div style={{ backgroundColor: getBackgroundColorMark(tour.mark) }}><b>{tour.mark}</b></div>
                </div>
                   
                <div className="tour-card-country-and-city">
                    {tour.country}, {tour.city}
                </div>

                <div className="tour-card-hotel-stars-and-price">
                    <div className="hotel-stars">
                        {Array(tour.hotelStars).fill().map((_, i) => <img src={star} key={i}/>)}
                    </div>
                    <div className="tour-card-price">
                        <b>
                            {tour.price}
                        </b>
                        <span>
                            BYN
                        </span>
                    </div>
                </div>
            </div>
        </a>
  	);
}

export default TourCard;