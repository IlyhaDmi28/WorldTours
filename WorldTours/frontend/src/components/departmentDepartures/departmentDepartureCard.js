import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'
import airplane from '../../img/airplane.svg'
import bus from '../../img/bus.svg'
import ship from '../../img/ship.svg'

function DepartmentDepartureCard({ departmentDeparture, openDepartmentDepartureEditor, deleteDepartmentDeparture }) {
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
	    <div className="department-departure-card" onClick={openDepartmentDepartureEditor} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img 
                className="department-departure-card-transport"
                src={getTransportImage(departmentDeparture.transportTypeId) }
            />
            <div className='department-departure-card-name'>
                <b>{departmentDeparture.name}</b>
            </div>
           
            <div className="department-departure-card-loacation">
                <b>{departmentDeparture.country}, {departmentDeparture.city}</b> 
            </div>

            <div className="department-departure-card-address">
                <b>{departmentDeparture.address}</b> 
            </div>
        
            {isHovered && 
                <button className='department-departure-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteDepartmentDeparture(departmentDeparture.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
  	);
}

export default DepartmentDepartureCard;