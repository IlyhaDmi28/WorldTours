import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { useState } from 'react';


function LoginForm() {
    const showAlert = useAlert();
    const [errorText, setErrorText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(email === '' || password === '') {
            showAlert("Вы не заполнили все поля!", 'error');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7276/auth/login', {
                email: email,
                password: password
            });

            localStorage.setItem('token', response.data.token);

            window.location.href = '/tours'; 
        } catch (error) {
            if(error.response != undefined) {
                if(error.response.status === 401) {
                    showAlert("Неверный логин или пароль!", 'error');
                    return;
                }
            }
            
            console.error('Ошибка при входе:', error);
        }
    };

	return (
	    <form onSubmit={handleSubmit} className="login-form">
        
            <TextField 
                className='auth-form-input'
                name='email' 
                type='email'
                placeholder='E-mail'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                size='small'
            />
            <TextField 
                className='auth-form-input'
                name="password"
                type='password'
                placeholder='Пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size='small'

            />
            {/* <p id="errorMessage" style={{marginTop: '15px'}}>{errorText} </p> */}
            <div className='forget-password'>
                <Link to='/auth'>Забыли пароль?</Link>
            </div>
            <Button type='submit' size='small'>
                Войти
			</Button>

            {/* <button type="submit" >Войти</button> */}
        </form>
  	);
}

export default LoginForm;