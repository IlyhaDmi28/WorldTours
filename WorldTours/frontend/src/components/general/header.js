import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavMenu from './mainNavMenu';
import UserConroller from './userController';

import logo from '../../img/logo.png';

function Header({addButtonText}) {
	return (
	    <header style={{height: '90px'}}>
			<MainNavMenu/>
            <Link className='logo-href' to="/tours">
                <img src={logo} alt="logo" />
            </Link>

            <div className='header-search-input-and-add-button'>
                <input  type='text' placeholder='Поиск'/>
                {addButtonText && <button>{addButtonText}</button>}
                <button><Link to='/hotel_editor/7'><b>Добавить отель</b></Link></button>
            </div>
            
            <UserConroller right={'7.5%'}/>
        </header>
  	);
}

export default Header;