import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../../context/userContext';
import MainFilters from './mainFilters';
import UserConroller from './userController';   
import logo from '../../img/logo.png';

function BigHeader({filter, setFilter, setTours}) {
    const {authUser, setAuthUser} = useContext(UserContext);

	return (
	    <header style={(authUser && authUser.role !== 1) ? {height: '100px'} : {}}>
            <Link className='logo-href' to="/tours">
                <img src={logo} alt="logo" />
            </Link>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <Link to="/campany">О компнаии</Link>
                    <Link to="/payment">Оплата</Link>
                    <Link to="/travel_info">Куда поехать?</Link>
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