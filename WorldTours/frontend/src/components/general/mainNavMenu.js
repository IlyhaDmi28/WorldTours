import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MainNavMenu() {
	return (
	    <nav className='main-nav-menu'>
            <Link href="#">Отели</Link>
            <Link href="#">Транспорт</Link>
            <Link href="#">О компании</Link>
            <Link href="#">Оплата</Link>
            <Link href="#">Куда поехать</Link>
        </nav>
  	);
}

export default MainNavMenu;