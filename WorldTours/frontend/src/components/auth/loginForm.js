import axios from 'axios';
import { useState } from 'react';


function LoginForm() {
    const [errorText, setErrorText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(email === '' || password === '') {
            setErrorText("Вы не заполнили все поля!"); 
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
                    setErrorText("Неверный логин или пароль!"); 
                    return;
                }
            }
            
            console.error('Ошибка при входе:', error);
        }
    };

	return (
	    <form onSubmit={handleSubmit} className="auth-form">
            <input type="text" name="email" style={{marginTop: '40px'}} placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" style={{marginTop: '40px'}} placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p id="errorMessage" style={{marginTop: '15px'}}>{errorText} </p>
            <button type="submit" >Войти</button>
        </form>
  	);
}

export default LoginForm;