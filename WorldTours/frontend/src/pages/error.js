import '../styles/error.scss';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/general/header';

function Error() {
    const location = useLocation();
    const [errorText, setErrorText] = useState("");
	useEffect(() => {
		const setError = async () => {
			const segments = location.pathname.split('/');
			const id = segments[segments.length - 1];
            console.log(id);

            switch(+id) {
                case 0: { 
                    setErrorText("Не удалось определить маршрут тура. Возможно тур был изменён или удалён. Попробуйте перезагрузить главную страницу и выбрать тур вновь!");
                    break;
                }
                default: { 
                    setErrorText("Неопределённая ошибка!");
                    break;
                }
            }
        };

        setError();
	}, []);

	

	return (
		<div className="error narrow-conteiner">
			<Header />
			<div className="line-under-header"></div>

			<div className="errorText">
                {errorText}
            </div>
				
		</div>
	);
}

export default Error;
