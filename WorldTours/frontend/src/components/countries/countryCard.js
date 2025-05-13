import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import deleteButon from '../../img/delete.svg'

function CountryCard({ country }) {
    return (
        <Link className="country-card" to={`/country/${country.id}`}>
            <img className="country-card-img" src={country.imageUrl}/>
            <div className='country-card-name'>
                <b>{country.name}</b>
            </div>
        </Link>
    );
}

export default CountryCard;