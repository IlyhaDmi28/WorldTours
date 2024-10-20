import '../styles/survey.scss';
import React, { useState } from 'react';
import SmallHeader from '../components/general/smallHeader';
import Months from '../components/survey/months';

function Survey() {
	return (
		<div className="survey">
			<SmallHeader/>
			<div className="line-under-header"></div>
            <Months/>
		</div>
	);
}

export default Survey;
