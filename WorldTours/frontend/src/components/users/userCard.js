import React, { useState } from 'react';
import tourp from '../../img/test.jpg'
import star from '../../img/star.svg'
import deleteButon from '../../img/delete.svg'

function UserCard({ user, deleteUser }) {
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
                    <div className="user-card-status">
                        Заблокировать
                    </div>
                ) : (
                    <div className="user-card-status" style={{backgroundColor: 'rgb(60, 80, 254)'}}>
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