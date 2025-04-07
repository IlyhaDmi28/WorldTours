import '../styles/user.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import useAlert from '../hooks/useAlert';
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
    const showAlert = useAlert();

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
        if(user.name === '' || user.surname === '') {
            showAlert("Вы не заполнили все поля!", 'error');
            // setErrorText("Вы не заполнили все поля!"); 
            return;
        }

        if(user.phoneNumber.length !== 9) {
            showAlert("Номер телефона введён некорректно!", 'error');
            // setErrorText("Вы не заполнили все поля!"); 
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
                        <Avatar 
                            alt="click to change" 
                            className='ava-img'
                            src={userHasAva || isChangeAva ? photoUrl : account}
                            onClick={openFileDialogToSelectAva}
                        />
                        {/* <img
                            src={userHasAva || isChangeAva ? photoUrl : account}
                            alt="click to change"
                            onClick={openFileDialogToSelectAva}
                        /> */}
                        <input
                            type="file"
                            ref={user.photoFile}
                            onChange={changePhoto}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>

                    <form className="user-form">
                        <TextField className='user-form-input' name='name' label='Имя' value={user.name} onChange={changeUser} variant="standard"/>
                        <TextField className='user-form-input' name='surname' label='Фамилия' value={user.surname} onChange={changeUser} variant="standard"/>
                        <TextField 
                            className='user-form-input' 
                            name='phoneNumber' 
                            label='Номер телефона' 
                            value={user.phoneNumber} 
                            onChange={changeUser}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        sx={{
                                            alignSelf: 'center', // выравнивание по центру поля
                                            marginBottom: '2px', // можно поиграть с этим значением
                                        }}
                                    >
                                       +375
                                    </InputAdornment>
                                ),
                            }}
                        />                  
                    </form>
                </div>

                <div className='under-user-params'>
                    <div id="errorMessage">{errorText} </div>
                    <Button className='save-button' onClick={saveUser} variant="contained"  >Сохранить измения</Button>
                </div>
            </div>
        </div>
  	);
}

export default User;