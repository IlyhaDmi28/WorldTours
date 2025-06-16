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
import modern from '../../img/buildings/modern.jpg';
import historical from '../../img/buildings/historical.jpg';

function Buildings({buildings, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Какие постройки в приоритете должны быть рядом</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={buildings}
						onChange={(e) => setAnswer(prev => ({ ...prev, buildings: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={'Большой город'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={modern}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Современные</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Исторический центр рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={historical}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Исторические</b>
										</Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
					</Box>
					<Box>
						<FormControlLabel
							value={''}
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

export default Buildings;
