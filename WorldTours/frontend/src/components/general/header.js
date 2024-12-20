import React, { useState } from 'react';
import UserConroller from './userController';
import logo from '../../img/logo.png';

function Header() {
	return (
	    <header style={{height: '100px'}}>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href" style={{width: "40%"}}>
                    <a href="/campany">О компнаии</a>
                    <a href="/payment">Оплата</a>
                    <a href="/survey">Куда поехать?</a>
                </div>
            </div>  
            <UserConroller right={'7.5%'}/>
        </header>
  	);
}

export default Header;