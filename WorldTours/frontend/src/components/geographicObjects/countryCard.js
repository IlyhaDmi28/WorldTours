import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'

function CountryCard({ country, deleteCountry, openCountryEditor}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="country-card" onClick={openCountryEditor} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="country-card-img" src={country.imageUrl}/>
            <div className='country-card-name'>
                <b>{country.name}</b>
            </div>
           
            {isHovered && 
                <button className='country-card-delete-button' onClick={(e)=>{e.stopPropagation(); deleteCountry(country.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
    );
}

export default CountryCard;