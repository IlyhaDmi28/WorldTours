import '../styles/survey.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import Months from '../components/survey/months';
import TourTypes from '../components/survey/tourTypes';
import Temperatures from '../components/survey/temperatures';
import Temperature from '../components/survey/temperature';

function Survey() {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState({
		month: null,
		tourType: null,
		temperature: null
	});
	
	const goBack = () => setQuestionIndex(questionIndex - 1);

	const questions = [
		{ 
			Text: "ВЫБЕРИТЕ МЕСЯЦ",
			Component: <Months setMonth={(monthIndex) => {
				setAnswers({
					...answers,
					month: monthIndex
				});
				setQuestionIndex(questionIndex + 1);
				console.log(`Андрей пидорас! лох ${questionIndex} ПИЗДА ${answers.month}`);

			}}/>,
		},
		{ 
			Text: "ВЫБЕРИТЕ ТИП ТУРА",
			Component: <TourTypes setTourType={(tourTypeIndex) => {
				setAnswers({
					...answers,
					tourType: tourTypeIndex
				});
				setQuestionIndex(questionIndex + 1);
				console.log(`Андрей пидорас! ХУЙ ${questionIndex} ПИЗДА ${answers.tourType}`);
			}} 
			goBack= {goBack}/>,
		},
		{ 
			Text: "ВЫБЕРИТЕ ТЕМПЕРАТУРУ МЕСТА ОТПРАВЛЕНИЯ",
			Component: <Temperatures setTemperature={(temperatureIndex) => {
				setAnswers({
					...answers,
					temperature: temperatureIndex
				});
				setQuestionIndex(questionIndex + 1);
				console.log(`Андрей пидорас! ХУЙ ${questionIndex} ПИЗДА ${answers.tourType}`);
			}} 
			goBack= {goBack}/>,
		},
	];

	return (
		<div className="survey narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div id="question">{questions[questionIndex].Text}</div>
			{questions[questionIndex].Component}
		</div>
	);
}

export default Survey;
