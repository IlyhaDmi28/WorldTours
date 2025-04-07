import '../styles/auth.scss';
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/loginForm';
import RegisterForm from '../components/auth/registerForm';
import AuthLogo from '../components/auth/authLogo';
import Button from '@mui/material/Button';
import background from '../img/background.gif'



function Auth() {
	useEffect(() => {
		document.body.style.backgroundImage = `url('${background}')`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.backgroundRepeat = "no-repeat";

		// очистка при выходе со страницы
		return () => {
			document.body.style.backgroundImage = '';
			document.body.style.backgroundSize = '';
			document.body.style.backgroundPosition = '';
			document.body.style.backgroundRepeat = '';
		};
	}, []);

	const [mode, setMode] = useState('login');

	const switchToLogin = () => {
		setMode('login');
	};

	const switchToRegister = () => {
		setMode('register');
	};

	const activeLoginModeStyle = {
		backgroundColor: mode === 'login' ? 'rgb(60, 80, 254)' : 'transparent',
		color: mode === 'login' ? 'white' : 'black',
	};

	const activeRegisterModeStyle = {
		backgroundColor: mode === 'register' ? 'rgb(60, 80, 254)' : 'transparent',
		color: mode === 'register' ? 'white' : 'black',
	};

	return (
		<div className='pizs'>
			<div className="auth" style={mode === 'register' ? {marginTop: '4%'} : {}}>
				<AuthLogo />
				<div className="reg-log">
					<Button style={activeLoginModeStyle} onClick={switchToLogin} size='small'>
						Вход
					</Button>
					<Button style={activeRegisterModeStyle} onClick={switchToRegister} size='small' variant="text">
						Регистрация
					</Button>
				</div>
				{mode === 'login' && <LoginForm />}
				{mode === 'register' && <RegisterForm/>}
			</div>
		</div>
	);
}

export default Auth;
