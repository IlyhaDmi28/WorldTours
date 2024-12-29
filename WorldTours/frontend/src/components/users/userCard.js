import React, { useState } from 'react';
import deleteButon from '../../img/delete.svg'

function UserCard({ user, deleteUser, blockUser, changeRole }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isChangeRoleMode, setIsChangeRoleMode] = useState(false);

    const getRoleName = (role) => {
        switch(role) {
            case 1: return "Пользователь";
            case 2: return "Менеджер";
            case 3: return "Админиcтратор";
            default: return "Неопределённая роль";
        }
    }

	return (
	    <div className="user-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="user-card-img" src={user.photoUrl}/>
            <div className='user-card-name'>
                <b>{user.name} {user.surname}</b>
            </div>
            <div className="user-card-contact-info">
                <div>
                    <b>Email: </b> {user.email}
                </div>
                <div>
                    <b>Номер телефона: </b> {user.phoneNumber}
                </div>
                <div>
                    <b>Роль: </b> {getRoleName(user.role)}
                </div>
            </div>

            { !isChangeRoleMode ? (
                <>
                    {!user.blockedStatus ?  (
                        <div className="user-card-status" style={{backgroundColor: 'rgb(254, 60, 60'}} onClick={(e)=>{e.preventDefault(); blockUser(user.id)}}>
                            Заблокировать
                        </div>
                        ) : (
                            <div className="user-card-status" onClick={(e)=>{e.preventDefault(); blockUser(user.id)}}>
                                Разблокировать
                            </div>
                        )
                    }
        
                    <div className='user-card-change-role' onClick={() => setIsChangeRoleMode(!isChangeRoleMode)}>
                        Сменить роль
                    </div>
                </>
            ) : (
                <div className='user-card-roles'>
                    <div onClick={() => changeRole(user.id, 1)}>Пользователь</div>
                    <div onClick={() => changeRole(user.id, 2)}>Менеджер</div>
                    <div onClick={() => changeRole(user.id, 3)}>Админимстратор</div>
                    <div onClick={() => setIsChangeRoleMode(!isChangeRoleMode)}>Отмена</div>
                </div> 
            )}

            {isHovered && 
                <button className='user-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteUser(user.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
  	);
}

export default UserCard;