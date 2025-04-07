import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import useAlert from '../../hooks/useAlert';
import { useState } from 'react';

function RegisterForm() {
    const showAlert = useAlert();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(name === '' || surname === '' || email === '' || phoneNumber === ''  || password === '' || confirmPassword === '') {
            showAlert("Вы не заполнили все поля!", 'error');
            return;
        }

        if(phoneNumber.length !== 9) {
            showAlert("Номер телефона введён некорректно!", 'error');
            return;
        }

        if(password !== confirmPassword) {
            showAlert("Пароли не совпадают!", 'error');
            return;
        }
        
        try {
            const response = await axios.post('https://localhost:7276/auth/register', {
                email: email,
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
                password: password,
                confirmPassword: confirmPassword
            });

            localStorage.setItem('token', response.data.token);

            window.location.href = '/tours';
        } catch (error) {
            if(error.response.status  === 409) {
                showAlert("Пользователь с таким логином уже существует!", 'error');
                return;
            }
            console.error('Ошибка при входе:', error);
        }
    };

    return (
	    <form onSubmit={handleSubmit} className="register-form">
            <TextField 
                className='auth-form-input'
                name='name' 
                type='email'
                placeholder='E-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size='small'
            />
            <TextField 
                className='auth-form-input'
                name="name"
                type='text'
                placeholder='Имя'
                value={name} 
                onChange={(e) => setName(e.target.value)}
                size='small'
            />
            <TextField 
                className='auth-form-input'
                name="surname"
                type='text'
                placeholder='Фамилия'
                value={surname} 
                onChange={(e) => setSurname(e.target.value)}
                size='small'
            />
            <TextField 
                className='auth-form-input'
                name="phoneNumber"
                type='text'
                placeholder='Номер телефона'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{
                                alignSelf: 'center', // выравнивание по центру поля
                                marginBottom: '0px', // можно поиграть с этим значением
                            }}
                        >
                           +375
                        </InputAdornment>
                    ),
                }}
                size='small'
            />
            <TextField 
                className='auth-form-input'
                name="password"
                type='text'
                placeholder='Пароль'
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                size='small'

            />
            <TextField 
                className='auth-form-input'
                name="confirmPassword"
                type='password'
                placeholder='Повторите пароль'
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                size='small'
            />
            {/* <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" name="name" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" name="surname" placeholder="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <input type="text" name="phoneNumber" placeholder="Номер телефона" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" name="confirmPassword" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/> */}
            <Button type='submit' size='small'>
                Зарегистрироваться
			</Button>
        </form>
  	);
}

export default RegisterForm;