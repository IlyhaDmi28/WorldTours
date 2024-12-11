import React, { useState } from 'react';
import MainFilters from './mainFilters';
import UserConroller from './userController';   
import logo from '../../img/logo.png';

function BigHeader({filter, setFilter}) {
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
                <MainFilters filter={filter} setFilter={setFilter}/>

            </div>
            <UserConroller right={'0px'}/>
        </header>
  	);
}

export default BigHeader;