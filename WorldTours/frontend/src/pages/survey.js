import '../styles/survey.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import Months from '../components/survey/months';
import TourTypes from '../components/survey/tourTypes';

function Survey() {
	const [questionIndex, setQuestionIndex] = useState(0);
	const questions = [
		{ 
			Text: "ВЫБЕРИТЕ МЕСЯЦ",
			Component: <Months />
		},
		{ 
			Text: "ВЫБЕРИТЕ ТИП ТУРА",
			Component: <TourTypes />
		},
	];

	return (
		<div className="survey narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div id="question">{questions[1].Text}</div>
			{questions[1].Component}
		</div>
	);
}

export default Survey;
