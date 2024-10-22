import '../styles/user.scss';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/general/header';
import noPhoto from '../img/account.svg';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

function User() {
    const [errorText, setErrorText] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ava, setAva] = useState(noPhoto); // Задаём исходное изображение
    const inputAvaFile = useRef(null); // Используем useRef для открытия input

    // Функция для обработки замены изображения
    const avaChange = (e) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setAva(e.target.result); // Обновляем изображение на выбранное
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Функция для открытия input по нажатию на изображение
    const openFileDialogToSelectAva = () => {
        inputAvaFile.current.click();
    };

    useEffect(() => {
        // const setUserValue = async () => {
        //     const response = await axios.get(`https://localhost:3441/user/my`, {
        //         headers: {
        //                     'Authorization': `${accessToken}; ${refreshToken}`
        //                 }
        //           });
        //           const user = response.data;

        //           setName(user.Name);
        //           setSurname(user.Surname);
        //           if(user.PhoneNumber === null) setPhoneNumber(''); 
        //           else setPhoneNumber(user.PhoneNumber);
        //           setLogin(user.Login);
        //           if(user.Photo !== 'data:image/png;base64,null') setAva(user.Photo);
        //           else setAva(noPhoto);
        //     };    

            // setUserValue();

            setErrorText('');  
      }, []);

    const save = async (e) => {
        if(name === '' || surname === '') {
            setErrorText("Вы не заполнили все поля!"); 
            return;
        }

        let belPattern = new RegExp("^375[0-9]{9}$");
        if(!belPattern.test(phoneNumber) && phoneNumber !== '') {
            setErrorText("Номер телефона введён некоретно"); 
            return;
        }

            // try {
            //       const formData = new FormData();
            //       formData.append('name', name);
            //       formData.append('surname', surname);
            //       formData.append('phoneNumber', phoneNumber);
            //       formData.append('photo', ava2);
            //       formData.append('login', login);
                  
            //       const response = await axios.put('https://localhost:3441/user/edit', formData, {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data',
            //                 'Authorization': `${accessToken}; ${refreshToken}`
            //             }
            //       });

            //       const user = response.data.user;
                  

            //       window.location.href = '/';
            // } catch (error) {
            //       console.error('Ошибка при изменении данных пользователя:', error);
            // }
      };

    // const changeAva = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
            
    //     setAva2(file);
    //     reader.onloadend = () => {
    //         setAva(reader.result);
    //     };
        
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

	return (
        <div className="user">
            <Header />
            <div className="line-under-header"></div>

            <div>
                <div className='user-parametrs'>
                    <div className='ava-controller'>
                        {/* Там с фотками какая-то хуета, чекни усебя на гитхабе в RentalPremise */}
                        <img
                            src={ava}
                            alt="click to change"
                            onClick={openFileDialogToSelectAva} // Обработчик клика по изображению
                        />
                        <input
                            type="file"
                            ref={inputAvaFile}
                            onChange={avaChange} // Обработчик изменения файла
                            style={{ display: 'none' }} // Скрываем input
                            accept="image/*"
                        />
                    </div>

                    <form className="user-form">
                        <input placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}/>
                        <input placeholder='Фамилия' value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        <input placeholder='Номер телефона' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </form>
                </div>

                <div className='under-user-params'>
                    <div id="errorMessage">{errorText} </div>
                    <button className='save-button' onClick={save}>Сохранить измения</button>
                </div>
            </div>
        </div>
  	);
}

export default User;