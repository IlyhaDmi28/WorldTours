import '../styles/users.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../context/userContext';
import Header from '../components/general/header';
import UserCard from '../components/users/userCard';
const token = localStorage.getItem("token");

function Users() {
	const [isChangeUserListButtonsActive, setIsAllButtonActive] = useState([true, false, false]);
	const {authUser, setAuthUser} = useContext(UserContext);
	const [users, setUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const [notBlockedUsers, setNotBlockedUsers] = useState([]);
	const [blockedUsers, setBlockedUsers] = useState([]);

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get(`https://localhost:7276/user/users`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

				const usersData = response.data;
				setUsers(usersData);
				setAllUsers(usersData);
				setNotBlockedUsers(usersData.filter(user => !user.blockedStatus));
				setBlockedUsers(usersData.filter(user => user.blockedStatus));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
    const handlClickChangeUserListButton = (buttonId) => {
		let arr = [];
		for(let i = 0; i < isChangeUserListButtonsActive.length; i++) {
			arr[i] = i === buttonId;
		}

		switch(buttonId) {
			case 0: setUsers(allUsers); break;
			case 1: setUsers(notBlockedUsers); break;
			case 2: setUsers(blockedUsers); break;
			default: setUsers(allUsers); break;
		}

		setIsAllButtonActive(arr);
    };

	const deleteUser = async (id) => {
        await axios.delete(`https://localhost:7276/user/delete?userId=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		// setAllBookings(allBookings.filter(booking => booking.id !== id));
		// setNotConfirmedBookings(notConfirmedBookings.filter(booking => booking.id !== id));
		// setConfirmedBookings(confirmedBookings.filter(booking => booking.id !== id));
		// setBookings(bookings.filter(booking => booking.id !== id));
	}

	return (
		<div className="users narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className='change-show-bookings-list'>
				<button 
					onClick={() => handlClickChangeUserListButton(0)}
					style={isChangeUserListButtonsActive[0] ? {backgroundColor: 'rgb(209, 216, 0', color: 'white'} : {}}
				>
					Все
				</button>

				<button 
					onClick={() => handlClickChangeUserListButton(1)}
					style={isChangeUserListButtonsActive[1] ? {backgroundColor: 'rgb(69, 189, 69)', color: 'white'}: {}}
				>
					Отправленные
				</button>
				
				<button
					onClick={() => handlClickChangeUserListButton(2)}
					style={isChangeUserListButtonsActive[2]  ? {backgroundColor: 'rgb(60, 80, 254)', color: 'white'} : {}}
				>
					Подтверждённые
				</button>

			</div>
			<div className="users-list">
				{users.map((user) => (<UserCard user={user} deleteUser={deleteUser}/>))}
			</div>
		</div>
	);
}

export default Users;
