import tourp from '../../img/test.jpg'
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'

function HistoryCard({ booking }) {
	return (
	    <a className="booking-card" href='/tour'>
            <img className="booking-card-img" src={tourp}/>
            <div className='booking-card-name'>
                <b>{booking.name}</b>
            </div>
            <div className="booking-card-route">
                <div className="booking-card-country-and-city">
                    Страна, город, 00:35 &#8594; Страна, город, 08:40
                </div>
                <div className="booking-card-country-and-city">
                    Страна, город, 00:35 &#8592; Страна, город, 08:40
                </div>
            </div>
            <div className="booking-card-date">
                12.01.2025 - 21.01.2025
            </div>

            <div className="booking-card-hotel-stars">
                {Array(booking.hotelStars).fill().map((_, i) => <img src={star} key={i}/>)}
            </div>
            
            <div className="tour-card-price">
                <b>
                    {booking.price}
                </b>
                <span>
                    &#8194;BYN
                </span>
            </div>
        </a>
  	);
}

export default HistoryCard;