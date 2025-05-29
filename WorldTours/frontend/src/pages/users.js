import '../styles/users.scss';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../components/general/header';
import UserCard from '../components/users/userCard';
import { FormControlLabel, Checkbox } from '@mui/material';
const token = localStorage.getItem("token");

function Users() {
	const [isChangeUserListButtonsActive, setIsAllButtonActive] = useState([true, false, false]);
	const [isOnlyViolators, setIsOnlyViolators] = useState(false);
	const [selectBlockedStatus, setSelectBlockedStatus] = useState(false);
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
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);
	
    const handlClickChangeUserListButton = async (buttonId) => {
		let blockedStatus = selectBlockedStatus;

		switch(buttonId) {
			case 0: blockedStatus = null; break;
			case 1: blockedStatus = false; break;
			case 2: blockedStatus = true; break;
			default: blockedStatus = null; break;
		}

		setSelectBlockedStatus(blockedStatus);

		const response = await axios.get(`https://localhost:7276/user/users?blockedStatus=${blockedStatus}&isOnlyViolators=${isOnlyViolators}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		const usersData = response.data;
		setUsers(usersData);

		let arr = [];
		for(let i = 0; i < isChangeUserListButtonsActive.length; i++) {
			arr[i] = i === buttonId;
		}
		setIsAllButtonActive(arr);
    };

	const changeIsOnlyViolators = async () => {
		const response = await axios.get(`https://localhost:7276/user/users?blockedStatus=${selectBlockedStatus}&isOnlyViolators=${!isOnlyViolators}`, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const usersData = response.data;
		setUsers(usersData);

		setIsOnlyViolators(!isOnlyViolators);
	}

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

		let usersData = users.map((user) => user.id === id ? {...user, blockedStatus: !user.blockedStatus} : user);
		
		if(isChangeUserListButtonsActive[1]) usersData = usersData.filter((user) => !user.blockedStatus);
		if(isChangeUserListButtonsActive[2]) usersData = usersData.filter((user) => user.blockedStatus);

		setUsers(usersData);
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

		setUsers(users.filter(user => user.id !== id));
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

		setUsers(users.map((user) => user.id === userId ? {...user, role: roleId} : user))
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
			<div className='only-violators'>
				<FormControlLabel control={<Checkbox size='14px' value={isOnlyViolators} onChange={changeIsOnlyViolators} />} label="Только нарушители"  sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}/>
			</div>
			<div className="users-list">
				{users.map((user) => (<UserCard user={user} deleteUser={deleteUser} blockUser={blockUser} changeRole={changeRole}/>))}
			</div>
		</div>
	);
}

export default Users;
