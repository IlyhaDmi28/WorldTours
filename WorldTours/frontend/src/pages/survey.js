import '../styles/survey.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/general/header';
import Box from '@mui/material/Box';
import TourCard from '../components/tours/tourCard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Season from '../components/survey/season';
import TourType from '../components/survey/tourType';
import Weather from '../components/survey/weather';
import Biom from '../components/survey/biom';
import Elevation from '../components/survey/elevation';
import Water from '../components/survey/water';
import Buildings from '../components/survey/buildings';
import LevelOfDevolpment from '../components/survey/levelOfDevolpment';
import autumn from '../img/months/autumn.jpg';
import winter from '../img/months/winter.jpg';
import spring from '../img/months/spring.jpg';
const token = localStorage.getItem("token");


// const steps = ['Сезон', 'Тип тура', 'Погода',];

function Survey() {
	const [tours, setTours] = useState([])
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const [answer, setAnswer] = useState({
		season:  0,
		tourType: 0,
		weather: 0,
		noRain: false,
		biom: '',
		elevation: '',
		water: '',
		buildings: '',
		levelOfDevelopment: 0
	});

	const steps = [
		<Season season={answer.season} setAnswer={setAnswer}/>,
		<TourType tourType={answer.tourType} setAnswer={setAnswer}/>,
		<Weather weather={answer.weather} setAnswer={setAnswer}/>,	
		<Biom biom={answer.biom} setAnswer={setAnswer}/>,
		<Elevation elevation={answer.elevation} setAnswer={setAnswer}/>,	
		<Water water={answer.water} setAnswer={setAnswer}/>,	
		<Buildings buildings={answer.buildings} setAnswer={setAnswer}/>,	
		<LevelOfDevolpment levelOfDevelopment={answer.levelOfDevelopment} setAnswer={setAnswer}/>,	
	];

	// const questionComponents = [
	// 	<Seasons season={answer.season} setAnswer={setAnswer}/>,
	// 	<TourTypes tourType={answer.tourType} setAnswer={setAnswer}/>,
	// 	<Weathers weather={answer.weather} setAnswer={setAnswer}/>
	// ]

	// const isStepOptional = (step) => {
	// 	return step === 1;
	// };

	useEffect(() => {
		const sendSurveyResults = async () => {
			console.log(answer);
			let response;
	
			response = await axios.post(`https://localhost:7276/tour/tours_by_survey`, answer, {
				headers: {
					'Authorization': 'Bearer ' + token,
				}
			});

			const toursData = response.data;
			setTours(toursData);
		}

		if (activeStep === steps.length) {
		  sendSurveyResults();
		}
	}, [activeStep]);

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		console.log(activeStep + 1);

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		// if (!isStepOptional(activeStep)) {
		// // You probably want to guard against something like this,
		// // it should never occur unless someone's actively trying to break something.
		// 	throw new Error("You can't skip a step that isn't optional.");
		// }

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
		const newSkipped = new Set(prevSkipped.values());
		newSkipped.add(activeStep);
		return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
 	};


	return (
		<div className="travelInfo narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<Box sx={{ width: '100%' }}>
				{/* <Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper> */}
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center', marginTop: '20px'}}>
							Подходящие вам туры
						</Typography>
						<Box className='result-of-survey' sx={{ display: 'flex', flexDirection: 'row'}}>
							{tours.map((tour) => (<TourCard tour={tour} />))}
						</Box>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleReset}>Занаво</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						{steps[activeStep]}
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Назад
							</Button>
							<Link className='changes-method-of-search-tours' to='/chat_ai'><span>Спросить у ИИ</span></Link>
							<Box sx={{ flex: '1 1 auto' }} />
							{/* <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
								Спросить у ИИ
							</Button> */}
							<Button onClick={handleNext}>
							{activeStep === steps.length - 1 ? 'Завершить' : 'Дальше'}
							</Button>
						</Box>
					</React.Fragment>
				)}
				</Box>
		</div>
	);
}

export default Survey;
