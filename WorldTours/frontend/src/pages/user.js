import '../styles/user.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/general/header';
import account from '../img/account.svg';
import axios from 'axios';
const token = localStorage.getItem("token");

function User() {
	const authUser = useSelector((state) => state.authUser.value);
    const [errorText, setErrorText] = useState('');
    const [userHasAva, setUserHasAva] = useState(false);
    const [isChangeAva, setIsChangeAva] = useState(false);

    const [user, setUser] = useState({
        id: authUser.id,
        name: authUser.name,
        surname: authUser.surname,
        phoneNumber: authUser.phoneNumber,
        photoFile: useRef(null)
    })
    const [photoUrl, setPhotoUrl] = useState(authUser.photoUrl);

    useEffect(() => {
        const checkPhoto = async () => {
            try {
                const response = await axios.head(authUser.photoUrl); // HEAD-запрос получает только заголовки, без загрузки файла
                if(response.status === 200) setUserHasAva(true); // Проверяем, вернул ли сервер код 200
                    
            } catch (error) {
                 setUserHasAva(false);
            } 
        };
    
        checkPhoto();
    }, []);

    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectAva = () => {
        user.photoFile.current.click();
    };
    
    const changePhoto = (e) => {
        const file = e.target.files[0]; // Берем первый файл из input

        if (file) {
            setPhotoUrl(URL.createObjectURL(file));
        }

		if (file) {
			setUser((prevUser) => ({
                ...prevUser,
                photoFile: file, // Сохраняем файл в состоянии
			}));

            setIsChangeAva(true);
		}
    };

    
    const changeUser = (e) => {
		const { name, value } = e.target;
        setUser((prevUser) => ({
			...prevUser,
            [name]: value,
        }));
	}

    //Вынести желательно(низ)
	const createFileFromObjectUrl = async (objectUrl, fileName) => {
		const response = await axios.get(objectUrl, { responseType: "blob" }); // Загружаем как Blob
		const blob = response.data;
		return new File([blob], fileName, { type: blob.type }); // Создаём новый File
	};
	
	const convertObjectUrlsToFiles = async (objectUrls) => {
		const filePromises = objectUrls.map((url, index) =>
			createFileFromObjectUrl(url, `copied_image_${index}.jpg`)
		);
		return await Promise.all(filePromises);
	};
	//Вынести желательно(верх)

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
            const formData = new FormData();
                
            formData.append("Id", user.id);
            formData.append("Name", user.name);
            formData.append("Surname", user.surname);
            formData.append("PhoneNumber", user.phoneNumber);
            
            if(isChangeAva) {
                console.log(photoUrl);
                const copiedphotosFiles = await convertObjectUrlsToFiles([photoUrl]);
                console.log(copiedphotosFiles[0]);
                formData.append("PhotoFile", copiedphotosFiles[0]); // Название должно совпадать с C#
            }

            await axios.put('https://localhost:7276/user/edit', formData, {
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
                            src={userHasAva || isChangeAva ? photoUrl : account}
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