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
import mountains from '../../img/elevations/mountains.jpg';
import hills from '../../img/elevations/hills.jpg';
import plains from '../../img/elevations/plains.jpg';

function Elevation({elevation, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>А какие возвышености там должны быть?</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={elevation}
						onChange={(e) => setAnswer(prev => ({ ...prev, elevation: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={'Горы рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={mountains}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'red'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Горы</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Холмистая местность'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={hills}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Холмы</b>
										</Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Равнинная местность'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        image={plains}
                                        alt="green iguana"
                                    />
                                    <CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Равнины</b>
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

export default Elevation;
