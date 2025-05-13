import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'

function RegionCard({ region, selectRegion, deleteRegion }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="geographic-object-card" onClick={selectRegion} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="geographic-object-card-img" src={region.imageUrl}/>
            <div className='geographic-object-card-name'>
                <b>{region.name}</b>
            </div>
           
            {isHovered && deleteRegion !== undefined &&
                <button className='geographic-object-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteRegion(region.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
    );
}

export default RegionCard;