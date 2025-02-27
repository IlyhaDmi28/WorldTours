import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/slices/authUserSlice';
import account from '../../img/account.svg';

function UserController({ right }) {
    const authUser = useSelector((state) => state.authUser.value);
 	const dispatch = useDispatch();
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

    const openOrCloseUserMenu = () => {
        setIsOpenUserMenu(!isOpenUserMenu);
    };

    const logout = () => {
        dispatch(setAuthUser(false));
        localStorage.removeItem('token');
    };

	return (
	    <div className='user-controller'> 
            {authUser ? (<button className="user-button" onClick={openOrCloseUserMenu}>
                <img src={authUser.photoUrl === null ? account : authUser.photoUrl}/>
            </button>) : 
            (<button className="user-button" style={{marginTop: '3px'}}>
                <Link to="/auth">
                    <img src={account}/>
                    <b>Войти</b>
                </Link>
            </button>)
            }

            {/* Выпадающее меню */}
            {isOpenUserMenu && (
                <div className='user-menu' style={{ right }}>
                    <ul>
                        <li><Link to='/user'>Редактировать профиль</Link></li>
                        { authUser.role === 1 && <li><Link to='/bookings'>Мои брони</Link></li> }
                        { (authUser.role === 2 || authUser.role === 3) && <li><Link to='/bookings'>Заявки на брони</Link></li> }
                        { (authUser.role === 2 || authUser.role === 3) && <li><Link to='/hotels_for_edit'>Редактор отелей</Link></li> }
                        { authUser.role === 3 && <li><Link to='/users'>Пользователи</Link></li> }
                        
                        <li><Link to='/tours' style={{color: 'red'}} onClick={logout}>Выйти</Link></li>
                    </ul>
                </div>
            )}
        </div>
  	);
}

export default UserController;