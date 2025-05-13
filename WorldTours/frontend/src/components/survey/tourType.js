import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import TourType from '../tours/tourType'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import all from '../../img/all.svg'
import { Balance } from '@mui/icons-material';
const token = localStorage.getItem("token");

function TypesTour({tourType, setAnswer}) {
	const [tourTypes, setTourTypes] = useState([]); 

	useEffect(() => {
		const getData = async () => {
            try {
				const response = await axios.get('https://localhost:7276/tour/tour_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const typesData = response.data;
				setTourTypes(typesData);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);


	return (
		<Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Выберите цель поездки</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={tourType}
						onChange={(e) => setAnswer(prev => ({ ...prev, tourType: e.target.value }))}
					>
					<Box >
						{tourTypes.map((tourType) => (
							<FormControlLabel
								value={tourType.id}
								control={<Radio size='small'/>}
								label={
									<Card className='tour-type-answer-card'>
										<CardMedia
											className='tour-type-answer-card-media'
											component="img"
											image={tourType.imageUrl}
											alt="green iguana"
										/>
										<CardContent className='tour-type-answer-card-content'>
											<Typography gutterBottom variant="h7" component="div">
												<b>{tourType.name}</b>
											</Typography>
										</CardContent>
									</Card>
									// <button className="tour-type">
									// 	<img src={tourType.imageUrl}/>
									// 	<div>{tourType.name}</div>
									// </button>
								}
								labelPlacement="top"
							/>
						))}
					</Box>
					<Box>
						<FormControlLabel
							value={0}
							control={<Radio size='small'/>}
							label="Не имеет значения"
							labelPlacement="right"
						/>
					</Box>
				</RadioGroup>
			</FormControl>
		</Box>
	    // <div className="tour-types-nav">
		// 	<div className="tour-types-nav-list">
		// 		{/* <button className='tour-types-nav-page-button'>B</button> */}

		// 		<div className="tour-types-list">
		// 			<TourType tourType={{id: 0, name: "Все виды туров", imageUrl: all}} selectedTourType={selectedTourType} setTourType={() => changeTourType(0)}/>
		// 			{tourTypes.map((tourType) => (<TourType tourType={tourType} selectedTourType={selectedTourType} setTourType={() => changeTourType(tourType.id)}/>))}
		// 		</div>
				
		// 		{/* <button className='tour-types-nav-page-button'>N</button> */}
		// 	</div>
        // </div>
  	);
}

export default TypesTour;