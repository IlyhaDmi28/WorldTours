import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavMenu from './mainNavMenu';
import UserConroller from './userController';

import logo from '../../img/logo.png';

function Header() {
	return (
	    <header style={{height: '100px'}}>
			<MainNavMenu/>
            <Link className='logo-href' to="/tours">
                <img src={logo} alt="logo" />
            </Link>
            <div className="info-and-main-filters">
                <div className="info-href" style={{width: "40%"}}>
                    <Link to="/campany">Туры</Link>
                    <Link to="/payment">Экскурсии</Link>
                    <Link to="/travel_info">Круизы</Link>
                </div>
            </div>  
            <UserConroller right={'7.5%'}/>
        </header>
  	);
}

export default Header;