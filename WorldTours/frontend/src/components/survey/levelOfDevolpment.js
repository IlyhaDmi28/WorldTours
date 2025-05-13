import React, { useState } from 'react';
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
import developed from '../../img/levelOfDevolpments/developed.jpg';
import poor from '../../img/levelOfDevolpments/poor.jpg';
import autumn from '../../img/months/autumn.jpg';
import winter from '../../img/months/winter.jpg';
import spring from '../../img/months/spring.jpg';

function LevelOfDevolpment({levelOfDevelopment, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Выберите желаемый тип стран</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={levelOfDevelopment}
						onChange={(e) => setAnswer(prev => ({ ...prev, levelOfDevelopment: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={1}
							control={<Radio size='small'/>}
							label={
								<Card className='country-answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={developed}
										alt="green iguana"
									/>
									<CardContent className='country-answer-card-content' sx={{backgroundColor: 'red'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Развитые и ухоженые</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={2}
							control={<Radio size='small'/>}
							label={
								<Card className='country-answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={poor}
										alt="green iguana"
									/>
									<CardContent className='country-answer-card-content' sx={{backgroundColor: 'green'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Бедные, но дешевле</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
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
    )
}

export default LevelOfDevolpment;
