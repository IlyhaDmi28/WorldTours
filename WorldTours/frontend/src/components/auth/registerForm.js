import axios from 'axios';
import { useState } from 'react';

function RegisterForm() {
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
            setErrorText("Вы не заполнили все поля!"); 
            return;
        }

        if(password !== confirmPassword) {
            setErrorText("Пароли не совпадают!"); 
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

            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);

            window.location.href = '/tours';
        } catch (error) {
            if(error.response.status  === 409) {
                setErrorText("Пользователь с таким логином уже существует!"); 
                return;
            }
            console.error('Ошибка при входе:', error);
        }
    };

    return (
	    <form onSubmit={handleSubmit} className="auth-form">
            <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" name="name" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" name="surname" placeholder="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <input type="text" name="phoneNumber" placeholder="Номер телефона" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" name="confirmPassword" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div id="errorMessage" style={{marginTop: '15px'}}>{errorText}</div>
            <button type="submit">Зарегестрироваться</button>
        </form>
  	);
}

export default RegisterForm;