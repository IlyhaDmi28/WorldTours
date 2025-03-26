import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'
import account from '../../img/account.svg';


function BookingCardForManager({ booking, deleteBooking, openBooking, confirmBooking }) {
    const [isHovered, setIsHovered] = useState(false);
    const [userHasAva, setUserHasAva] = useState(false);

     useEffect(() => {
            const checkPhoto = async () => {
                try {
                    const response = await axios.head(booking.user.photoUrl); // HEAD-запрос получает только заголовки, без загрузки файла
                    if(response.status === 200) setUserHasAva(true); // Проверяем, вернул ли сервер код 200
                        
                } catch (error) {
                     setUserHasAva(false);
                } 
            };
        
            checkPhoto();
        }, []);

	return (
	    <div className="booking-card" onClick={openBooking} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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

            {
                (booking.status === 0 || booking.status === null) &&
                <div className="booking-card-confirmation" onClick={(e)=>{e.stopPropagation(); confirmBooking(booking.id)}}>
                    Нажмите подтвердить
                </div>
            }

            {
                booking.status === 1 &&
                <div className="booking-card-confirmation" style={{backgroundColor: 'rgb(60, 80, 254)'}}>
                    Подтвержденно
                </div>
            }

            {
                booking.status === 2 &&
                <div className="booking-card-confirmation" style={{backgroundColor: 'rgb(224, 190, 39)'}}>
                    Оалачено
                </div>
            }
                {/* { !booking.status ?  (
                    <div className="booking-card-confirmation" onClick={(e)=>{e.stopPropagation(); confirmBooking(booking.id)}}>
                        Нажмите подтвердить
                    </div>
                ) : (
                    <div className="booking-card-confirmation" style={{backgroundColor: 'rgb(60, 80, 254)'}}>
                        Подтвержденно
                    </div>
                )
            } */}
            
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

export default BookingCardForManager;