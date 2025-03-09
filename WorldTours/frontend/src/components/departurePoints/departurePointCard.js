import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'
import airplane from '../../img/airplane.svg'
import bus from '../../img/bus.svg'
import ship from '../../img/ship.svg'


function DeparturePointCard({ departurePoint, deleteDeparturePoint }) {
    const [isHovered, setIsHovered] = useState(false);

    const getTransportImage = (id) => {
        switch (id) {
            case 1:
                return airplane;
            case 2:
                return bus;
            case 3:
                return ship;
            default:
                return airplane;
        }
    };
    
	return (
	    <Link className="departure-point-card" to={`/`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img 
                className="departure-point-card-transport"
                src={getTransportImage(departurePoint.transportTypeId) }
            />
            <div className='departure-point-card-name'>
                <b>{departurePoint.name}</b>
            </div>
           
            <div className="departure-point-card-loacation">
                <b>{departurePoint.country}, {departurePoint.city}</b> 
            </div>

            <div className="departure-point-card-address">
                <b>{departurePoint.address}</b> 
            </div>
        
            {isHovered && 
                <button className='departure-point-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteDeparturePoint(departurePoint.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </Link>
  	);
}

export default DeparturePointCard;