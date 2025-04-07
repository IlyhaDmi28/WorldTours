import React, { useState } from 'react';
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'

function BookingCard({ booking, openBooking, deleteBooking }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <div className="booking-card" onClick={openBooking} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="booking-card-img" src={booking.tourPhotoUrl}/>
            <div className='booking-card-name'>
                <b>{booking.tourName}</b>
            </div>
            <div className="booking-card-route">
                <div className="booking-card-country-and-city">
                    {booking.departmentDeparture.country}, {booking.departmentDeparture.city}, {booking.landingDateAndTimeOfDeparture} &#8594; {booking.direction.country},
                    {booking.direction.city}, {booking.arrivalDateAndTimeOfDeparture}
                </div>
                <div className="booking-card-country-and-city">
                    {booking.departmentDeparture.country}, {booking.departmentDeparture.city}, {booking.arrivalDateAndTimeOfReturn} &#8592; {booking.direction.country}, 
                    {booking.direction.city}, {booking.landingDateAndTimeOfReturn}
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

            {
                (booking.status === 0 || booking.status === null) &&
                <div className="booking-card-status">
                    Заявка отправлена
                </div>
            }

            {
                booking.status === 1 &&
                <div className="booking-card-status" style={{backgroundColor: 'rgb(60, 80, 254)'}}>
                    Подтвержденно
                </div>
            }

            {
                booking.status === 2 &&
                <div className="booking-card-status" style={{backgroundColor: 'rgb(224, 190, 39)'}}>
                    Оплачено
                </div>
            }

            <div className="tour-card-price">
                <b>
                    {booking.price}
                </b>
                <span>
                    &#8194;BYN
                </span>
            </div>


            {isHovered && 
                <button className='booking-card-delete-button' onClick={(e)=>{e.stopPropagation(); deleteBooking(booking.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
  	);
}

export default BookingCard;