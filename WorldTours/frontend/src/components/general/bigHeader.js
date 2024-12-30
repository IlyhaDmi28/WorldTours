import React, { useState, useContext } from 'react';
import {UserContext} from '../../context/userContext';
import MainFilters from './mainFilters';
import UserConroller from './userController';   
import logo from '../../img/logo.png';

function BigHeader({filter, setFilter, setTours}) {
    const {authUser, setAuthUser} = useContext(UserContext);

	return (
	    <header style={(authUser && authUser.role !== 1) ? {height: '100px'} : {}}>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <a href="/campany">О компнаии</a>
                    <a href="/payment">Оплата</a>
                    <a href="/travel_info">Куда поехать?</a>
                </div>
                {
                    (!authUser|| authUser.role === 1) && <MainFilters filter={filter} setFilter={setFilter} setTours={setTours}/>
                }

            </div>
            <UserConroller right={'0px'}/>
        </header>
  	);
}

export default BigHeader;