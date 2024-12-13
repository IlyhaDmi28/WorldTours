import React, { useContext, useState } from 'react';
import {UserContext} from '../../context/userContext';
import account from '../../img/account.svg';

function UserController({ right }) {
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);
    const {authUser, setAuthUser} = useContext(UserContext);

    const openOrCloseUserMenu = () => {
        setIsOpenUserMenu(!isOpenUserMenu);
    };

    const logout = () => {
        setAuthUser(false);
        localStorage.removeItem('token');
    };

	return (
	    <div className='user-controller'> 
            {authUser ? (<button className="user-button" onClick={openOrCloseUserMenu}>
                <img src={authUser.photoUrl === null ? account : authUser.photoUrl}/>
            </button>) : 
            (<button className="user-button" style={{marginTop: '3px'}}>
                <a href="/auth">
                    <img src={account}/>
                    <b>Войти</b>
                </a>
            </button>)
            }

            {/* Выпадающее меню */}
            {isOpenUserMenu && (
                <div className='user-menu' style={{ right }}>
                    <ul>
                        <li><a href='/user'>Редактировать профиль</a></li>
                        <li><a href='/bookings'>Мои брони</a></li>
                        <li><a href='/history'>История броней</a></li>
                        <li><a href='/tours' style={{color: 'red'}} onClick={logout}>Выйти</a></li>
                    </ul>
                </div>
            )}
        </div>
  	);
}

export default UserController;