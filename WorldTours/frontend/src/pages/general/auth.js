import '../../styles/auth.scss';
import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/auth/loginForm';
import RegisterForm from '../../components/auth/registerForm';
import AuthLogo from '../../components/auth/authLogo';

function Auth() {
	useEffect(() => {
		document.body.style.backgroundColor = 'lightblue';
	
		return () => {
		  	document.body.style.backgroundColor = '';
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
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
	};

	const activeRegisterModeStyle = {
		backgroundColor: mode === 'register' ? 'rgb(60, 80, 254)' : 'transparent',
		color: mode === 'register' ? 'white' : 'black',
		border: 'none', 
		borderRadius: '8px',
		cursor: 'pointer',
	};

	return (
		<div>
			<div className="auth">
				<AuthLogo />
				<div className="reg-log">
					<button style={activeLoginModeStyle} onClick={switchToLogin}>
						Вход
					</button>
					<button style={activeRegisterModeStyle} onClick={switchToRegister}>
						Регистрация
					</button>
				</div>
				{mode === 'login' && <LoginForm />}
				{mode === 'register' && <RegisterForm/>}
			</div>
		</div>
	);
}

export default Auth;
