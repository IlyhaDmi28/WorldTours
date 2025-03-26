import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainNavMenu from './mainNavMenu';
import MainFilters from './mainFilters';
import UserConroller from './userController';   
import logo from '../../img/logo.png';

function BigHeader({filter, setFilter, setTours}) {
	const authUser = useSelector((state) => state.authUser.value);

	return (
	    <header>
			<MainNavMenu/>

            <Link className='logo-href' to="/tours">
                <img src={logo} alt="logo" />
            </Link>
            <div className="info-and-main-filters">
                
               
                <MainFilters filter={filter} setFilter={setFilter} setTours={setTours}/>

            </div>
            <UserConroller right={'0px'}/>
        </header>
  	);
}

export default BigHeader;