import '../styles/survey.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import Months from '../components/survey/months';

function Survey() {
	return (
		<div className="survey">
			<Header/>
			<div className="line-under-header"></div>
			<div id="question">ВЫБЕРИТЕ МЕСЯЦ</div>
			<Months/>
		</div>
	);
}

export default Survey;
