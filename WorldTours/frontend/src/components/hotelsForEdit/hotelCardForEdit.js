import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'

function HotelCardForEdit({ hotel, deleteHotel }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <Link className="hotel-card" to={`/hotel_editor/${hotel.id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="hotel-card-img" src={hotel.photoUrl}/>
            <div className='hotel-card-name'>
                <b>{hotel.name}</b>
            </div>
           
            <div className="hotel-card-loacation">
                <b>{hotel.country}, {hotel.city}</b> 
            </div>

            <div className="hotel-card-address">
                <b>{hotel.address}</b> 
            </div>

            <div className="hotel-card-stars">
                <Rating 
					className="input-hotel-stars" 
					name="starsNumber" 
					defaultValue={hotel.starsNumber} 
					precision={1}
				/>
            </div>
        
            {isHovered && 
                <button className='hotel-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteHotel(hotel.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </Link>
  	);
}

export default HotelCardForEdit;