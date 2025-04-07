import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/slices/authUserSlice';
import account from '../../img/account.svg';

function UserController({ right }) {
    const authUser = useSelector((state) => state.authUser.value);
 	const dispatch = useDispatch();

    const [userHasAva, setUserHasAva] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenUserMenu = Boolean(anchorEl);

    useEffect(() => {
		const isAuthenticated = async () => {
            try {
                const response = await axios.head(authUser.photoUrl); // HEAD-запрос получает только заголовки, без загрузки файла
   			    if(response.status === 200) setUserHasAva(true); // Проверяем, вернул ли сервер код 200
				
            } catch (error) {
				setUserHasAva(false);
            } 
        };

        isAuthenticated();
	}, []);

    const logout = () => {
        dispatch(setAuthUser(false));
        localStorage.removeItem('token');
    };

	return (
	    <div className='user-controller'> 
            {authUser ? (<button className="user-button" onClick={(e) => {setAnchorEl(e.currentTarget)}}>
                <img src={userHasAva ? authUser.photoUrl : account}/>
            </button>) : 
            (<button className="user-button" style={{marginTop: '3px'}}>
                <Link to="/auth">
                    <img src={account}/>
                    <b>Войти</b>
                </Link>
            </button>)
            }

            {/* Выпадающее меню */}
             
            <Menu
                className='user-menu'
                anchorEl={anchorEl}
                open={isOpenUserMenu}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                slotProps={{
                    paper: {
                      style: {
                        marginLeft: '12px',
                        borderRadius: '10px'
                      },
                    },
                }}
            >
                <MenuItem component={Link} to='/user' onClick={() => setAnchorEl(null)}>Редактировать профиль</MenuItem>

                { authUser.role === 1 && 
                    <MenuItem component={Link} to='/bookings' onClick={() => setAnchorEl(null)}>Мои брони</MenuItem>
                }

                { (authUser.role === 2 || authUser.role === 3) && 
                    <MenuItem component={Link} to='/bookings' onClick={() => setAnchorEl(null)}>Заявки на брони</MenuItem>
                }

                { (authUser.role === 2 || authUser.role === 3) && 
                    <MenuItem component={Link} to='/tours_for_editor' onClick={() => setAnchorEl(null)}>Редактор туров</MenuItem>
                }

                { (authUser.role === 2 || authUser.role === 3) && 
                    <MenuItem component={Link} to='/hotels_for_editor' onClick={() => setAnchorEl(null)}>Редактор отелей</MenuItem>
                }

                { (authUser.role === 2 || authUser.role === 3) && 
                    <MenuItem component={Link} to='/department_departures' onClick={() => setAnchorEl(null)}>Редактор транспорта</MenuItem>
                }

                { authUser.role === 3 && 
                    <MenuItem component={Link} to='/users' onClick={() => setAnchorEl(null)}>Пользователи</MenuItem>
                }

                {/* { (authUser.role === 2 || authUser.role === 3) && 
                    <MenuItem onClick={() => setAnchorEl(null)}><Link to='/geographic_objects'>Редактор гео-объектов</Link></MenuItem>
                } */}

                <MenuItem component={Link} style={{color: 'red'}}  to='/tours' onClick={() => {logout(); setAnchorEl(null)}}>Выйти</MenuItem>
            </Menu>
            {/* <div className='user-menu' style={{ right }}>
                <ul>
                    <li><Link to='/user'>Редактировать профиль</Link></li>
                    { authUser.role === 1 && <li><Link to='/bookings'>Мои брони</Link></li> }
                    { (authUser.role === 2 || authUser.role === 3) && <li><Link to='/bookings'>Заявки на брони</Link></li> }
                    { (authUser.role === 2 || authUser.role === 3) && <li><Link to='/hotels_for_edit'>Редактор отелей</Link></li> }
                    { authUser.role === 3 && <li><Link to='/users'>Пользователи</Link></li> }
                        
                    <li><Link to='/tours' style={{color: 'red'}} onClick={logout}>Выйти</Link></li>
                </ul>
            </div> */}
        </div>
  	);
}

export default UserController;