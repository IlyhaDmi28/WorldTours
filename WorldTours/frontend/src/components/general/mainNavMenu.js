import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MainNavMenu() {
	return (
	    <nav className='main-nav-menu'>
            {/* <Link to="/tours">Отели</Link>
            <Link to="/tours">Транспорт</Link> */}
            <Link to="/campany">О компании</Link>
            <Link to="/payment">Оплата</Link>
            <Link to="/travel_info">Куда поехать?</Link>
        </nav>
  	);
}

export default MainNavMenu;