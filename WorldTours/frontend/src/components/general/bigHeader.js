import React, { useState } from 'react';
import MainFilters from './mainFilters';
import UserConroller from './userController';   
import Directions from './directions';
import logo from '../../img/logo.png';

function BigHeader() {
	return (
	    <header>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <a href="/campany">О компнаии</a>
                    <a href="/payment">Оплата</a>
                    <a href="/survey">Куда поехать?</a>
                </div>
                <MainFilters/>

            </div>
            <UserConroller right={'0px'}/>
        </header>
  	);
}

export default BigHeader;