import React, { useState } from 'react';
import account from '../../img/account.svg';

function UserController({ right }) {
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

    const openOrCloseUserMenu = () => {
        setIsOpenUserMenu(!isOpenUserMenu);
    };

	return (
	    <div className='user-controller'>
            {/* <button className="user" style={{marginTop: '3px'}}>
                <a href="/auth">
                    <img src={account}/>
                    <b>Войти</b>
                </a>
            </button> */}
            <button className="user-button" onClick={openOrCloseUserMenu}>

                <img src={account}/>
            </button>

            {/* Выпадающее меню */}
            {isOpenUserMenu && (
                <div className='user-menu' style={{ right }}>
                    <ul>
                        <li><a href='/user'>Редактировать профиль</a></li>
                        <li><a href='/bookings'>Мои брони</a></li>
                        <li><a href='/history'>История броней</a></li>
                        <li><a href='/auth' style={{color: 'red'}}>Выйти</a></li>
                    </ul>
                </div>
            )}
        </div>
  	);
}

export default UserController;