import '../styles/survey.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/general/header';
import Box from '@mui/material/Box';
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import TourCard from '../components/tours/tourCard';
const token = localStorage.getItem("token");


// const steps = ['Сезон', 'Тип тура', 'Погода',];

function ChatAI() {
	const [tours, setTours] = useState([])
	const [prompt, setPrompt] = useState('');

	const sendPrompt = async () => {
		let response;
	
		response = await axios.post(`https://localhost:7276/tour/tours_by_prompt_to_ai`, {text: prompt}, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});

		const toursData = response.data;
		setTours(toursData);
	}

	return (
		<div className="travelInfo narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<Box className='chat-with-ai'>
				<Box className='result-of-prompt-to-ai' sx={{ display: 'flex', flexDirection: 'row'}}>
					{tours.map((tour) => (<TourCard tour={tour} />))}
				</Box>
				<TextField 
					className='prompt-input'
					placeholder="Опишите город или местность, какую вы бы хотели посетить" 
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={sendPrompt}>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Box>
		</div>
	);
}

export default ChatAI;
