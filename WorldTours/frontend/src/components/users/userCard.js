import React, { useState } from 'react';
import deleteButon from '../../img/delete.svg'

function UserCard({ user, deleteUser, blockUser }) {
    const [isHovered, setIsHovered] = useState(false);

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
                    <b>Роль: </b> {user.role}
                </div>
            </div>


            { !user.blockedStatus ?  (
                    <div className="user-card-status" style={{backgroundColor: 'rgb(254, 60, 60'}} onClick={(e)=>{e.preventDefault(); blockUser(user.id)}}>
                        Заблокировать
                    </div>
                ) : (
                    <div className="user-card-status" onClick={(e)=>{e.preventDefault(); blockUser(user.id)}}>
                        Разблокировать
                    </div>
                )
            }
            
            {isHovered && 
                <button className='user-card-delete-button' onClick={(e)=>{e.preventDefault(); deleteUser(user.id)}}>
                    <img src={deleteButon}/>
                </button>
            }
        </div>
  	);
}

export default UserCard;