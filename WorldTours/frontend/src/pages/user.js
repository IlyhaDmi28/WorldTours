import '../styles/user.scss';
import React, { useState, useRef, useContext } from 'react';
import {UserContext} from '../context/userContext';
import Header from '../components/general/header';
import account from '../img/account.svg';
import axios from 'axios';
const token = localStorage.getItem("token");

function User() {
    const [errorText, setErrorText] = useState('');
    const {authUser, setAuthUser} = useContext(UserContext);
    const [user, setUser] = useState({
        id: authUser.id,
        name: authUser.name,
        surname: authUser.surname,
        phoneNumber: authUser.phoneNumber,
        photoFile: useRef(null)
    })
    const [photoUrl, setPhotoUrl] = useState(authUser.photoUrl);

    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectAva = () => {
        user.photoFile.current.click();
    };
    
    const changePhoto = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoUrl(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }

		const file = e.target.files[0]; // Получаем выбранный файл
		if (file) {
			setUser((prevUser) => ({
                ...prevUser,
                photoFile: file, // Сохраняем файл в состоянии
			}));
		}
    };

    
    const changeUser = (e) => {
		const { name, value } = e.target;
        setUser((prevUser) => ({
			...prevUser,
            [name]: value,
        }));
	}

    const saveUser = async () => {
        if(user.name === '' || user.surname === '' || user.phoneNumber === '') {
            setErrorText("Вы не заполнили все поля!"); 
            return;
        }

        // let belPattern = new RegExp("^375[0-9]{9}$");
        // if(!belPattern.test(user.phoneNumber)) {
        //     setErrorText("Номер телефона введён некоретно"); 
        //     return;
        // }
        try {     
            await axios.put('https://localhost:7276/user/edit', user, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            window.location.href = '/tours';
        } catch (error) {
            console.error('Ошибка при изменении данных пользователя:', error);
        }
    };

	return (
        <div className="user narrow-conteiner">
            <Header />
            <div className="line-under-header"></div>

            <div className='user-editor'>
                <div className='user-parametrs'>
                    <div className='ava-controller'>
                        {/* Там с фотками какая-то хуета, чекни усебя на гитхабе в RentalPremise */}
                        <img
                            src={photoUrl === null ? account : photoUrl}
                            alt="click to change"
                            onClick={openFileDialogToSelectAva} // Обработчик клика по изображению
                        />
                        <input
                            type="file"
                            ref={user.photoFile}
                            onChange={changePhoto} // Обработчик изменения файла
                            style={{ display: 'none' }} // Скрываем input
                            accept="image/*"
                        />
                    </div>

                    <form className="user-form">
                        <input name='name' placeholder='Имя' value={user.name} onChange={changeUser}/>
                        <input name='surname' placeholder='Фамилия' value={user.surname} onChange={changeUser}/>
                        <input name='phoneNumber' placeholder='Номер телефона' value={user.phoneNumber} onChange={changeUser}/>
                    </form>
                </div>

                <div className='under-user-params'>
                    <div id="errorMessage">{errorText} </div>
                    <button className='save-button' onClick={saveUser}>Сохранить измения</button>
                </div>
            </div>
        </div>
  	);
}

export default User;