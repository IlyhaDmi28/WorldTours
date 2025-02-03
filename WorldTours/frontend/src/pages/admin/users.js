import '../../styles/users.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../../components/general/header';
import UserCard from '../../components/users/userCard';
const token = localStorage.getItem("token");

function Users() {
	const [isChangeUserListButtonsActive, setIsAllButtonActive] = useState([true, false, false]);
	const authUser = useSelector((state) => state.authUser.value);
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

	const blockUser = async (id) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете заблокироват/разблокировать пользователя, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.patch(`https://localhost:7276/user/block?userId=${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });


		let response;
		response = await axios.get(`https://localhost:7276/user/users`, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const usersData = response.data;
		const notBlockedUsersData = usersData.filter(user => !user.blockedStatus);
		const blockedUsersData = usersData.filter(user => user.blockedStatus);
		setAllUsers(usersData);
		setNotBlockedUsers(notBlockedUsersData);
		setBlockedUsers(blockedUsersData);
		setUsers(usersData);
		
		for(let i = 0; i < isChangeUserListButtonsActive.length; i++) {
			if(isChangeUserListButtonsActive[i]) {
				switch(i) {
					case 0: setUsers(usersData); return;
					case 1: setUsers(notBlockedUsersData); return;
					case 2: setUsers(blockedUsersData); return;
					default: setUsers(usersData); return;
				}
			}
		}
	}

	const deleteUser = async (id) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете удалить пользователя, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.delete(`https://localhost:7276/user/delete?userId=${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		let response;
		response = await axios.get(`https://localhost:7276/user/users`, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const usersData = response.data;
		const notBlockedUsersData = usersData.filter(user => !user.blockedStatus);
		const blockedUsersData = usersData.filter(user => user.blockedStatus);
		setAllUsers(usersData);
		setNotBlockedUsers(notBlockedUsersData);
		setBlockedUsers(blockedUsersData);
		setUsers(usersData);
		
		for(let i = 0; i < isChangeUserListButtonsActive.length; i++) {
			if(isChangeUserListButtonsActive[i]) {
				switch(i) {
					case 0: setUsers(usersData); return;
					case 1: setUsers(notBlockedUsersData); return;
					case 2: setUsers(blockedUsersData); return;
					default: setUsers(usersData); return;
				}
			}
		}
	}

	const changeRole = async (userId, roleId) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете изменить роль пользователя, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.patch(`https://localhost:7276/user/change_role?userId=${userId}&roleId=${roleId}`,{}, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		let response;
		response = await axios.get(`https://localhost:7276/user/users`, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const usersData = response.data;
		const notBlockedUsersData = usersData.filter(user => !user.blockedStatus);
		const blockedUsersData = usersData.filter(user => user.blockedStatus);
		setAllUsers(usersData);
		setNotBlockedUsers(notBlockedUsersData);
		setBlockedUsers(blockedUsersData);
		setUsers(usersData);
		
		for(let i = 0; i < isChangeUserListButtonsActive.length; i++) {
			if(isChangeUserListButtonsActive[i]) {
				switch(i) {
					case 0: setUsers(usersData); return;
					case 1: setUsers(notBlockedUsersData); return;
					case 2: setUsers(blockedUsersData); return;
					default: setUsers(usersData); return;
				}
			}
		}
	}

	return (
		<div className="users narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className='change-show-users-list'>
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
					Незаблокированные 
				</button>
				
				<button
					onClick={() => handlClickChangeUserListButton(2)}
					style={isChangeUserListButtonsActive[2]  ? {backgroundColor: 'rgb(254, 60, 60)', color: 'white'} : {}}
				>
					Заблокированные
				</button>

			</div>
			<div className="users-list">
				{users.map((user) => (<UserCard user={user} deleteUser={deleteUser} blockUser={blockUser} changeRole={changeRole}/>))}
			</div>
		</div>
	);
}

export default Users;
