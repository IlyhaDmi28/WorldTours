import React, { useState } from 'react';
import UserConroller from './userController';
import logo from '../../img/logo.png';

function Header() {
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

    const openOrCloseUserMenu = () => {
        setIsOpenUserMenu(!isOpenUserMenu);
    };

	return (
	    <header style={{height: '100px'}}>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <a>О компнаии</a>
                    <a>Оплата</a>
                    <a href="/survey">Куда поехать?</a>
                </div>
            </div>  
            <UserConroller right={'7.5%'}/>
        </header>
  	);
}

export default Header;