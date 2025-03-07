import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'

function HotelCardForEditor({ hotel, deleteHotel }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <Link className="hotel-for-editor-card" to={`/hotel_editor/${hotel.id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="hotel-for-editor-card-img" src={hotel.photoUrl}/>
            <div className='hotel-for-editor-card-name'>
                <b>{hotel.name}</b>
            </div>
           
            <div className="hotel-for-editor-card-loacation">
                <b>{hotel.country}, {hotel.city}</b> 
            </div>

            <div className="hotel-for-editor-card-address">
                <b>{hotel.address}</b> 
            </div>

            <Rating 
				className="hotel-for-editor-card-stars" 
				name="starsNumber" 
				defaultValue={hotel.starsNumber} 
				precision={1}
                readOnly 
			/>
        
            {isHovered && 
                <button className='hotel-for-editor-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteHotel(hotel.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </Link>
  	);
}

export default HotelCardForEditor;