import React, { useState } from 'react';
import tourp from '../../img/test.jpg'
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'

function BookingCardForManager({ booking, deleteBooking, confirmBooking }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <a className="booking-card" href={`/tour/${booking.tourId}?routeId=${booking.routeId}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="booking-card-img" src={booking.tourPhotoUrl}/>
            <div className='booking-card-name'>
                <b>{booking.tourName}</b>
            </div>
            <div className="booking-card-route">
                <div className="booking-card-country-and-city">
                    {booking.departmentDeparture.country}, {booking.departmentDeparture.city}, {booking.landingDateOfDeparture} 
                    , {booking.landingTimeOfDeparture} &#8594; {booking.direction.country}, {booking.direction.city}
                    , {booking.arrivalDateOfDeparture}, {booking.arrivalTimeOfDeparture}
                </div>
                <div className="booking-card-country-and-city">
                    {booking.departmentDeparture.country}, {booking.departmentDeparture.city}, {booking.arrivalDateOfReturn} 
                    , {booking.arrivalTimeOfReturn} &#8592; {booking.direction.country}, {booking.direction.city}
                    , {booking.landingDateOfReturn}, {booking.landingTimeOfReturn}
                </div>
            </div>
            <div className="booking-card-department-departure-and-hotle">
                <div>
                    <b>Отправление с: </b> {booking.departmentDeparture.name}
                </div>
                <div>
                    <b>Отель: </b> {booking.direction.hotel}
                </div>
            </div>

            <div className="booking-card-hotel-stars">
                {Array(booking.direction.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
            </div>

            <div className="booking-card-user-info">
                <b>От пользователя:</b> {booking.user.name} {booking.user.surname}, {booking.user.email}, {booking.user.phoneNumber}
            </div>
            { !booking.status ?  (
                    <div className="booking-card-confirmation" onClick={(e)=>{e.preventDefault(); confirmBooking(booking.id)}}>
                        Нажмите подтвердить
                    </div>
                ) : (
                    <div className="booking-card-confirmation" style={{backgroundColor: 'rgb(60, 80, 254)'}}>
                        Подтвержденно
                    </div>
                )
            }
            
            <div className="tour-card-price">
                <b>
                    {booking.price * booking.orderSeatsNumber}
                </b>
                <span>
                    &#8194;BYN
                </span>
            </div>


            {isHovered && 
                <button className='booking-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteBooking(booking.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </a>
  	);
}

export default BookingCardForManager;