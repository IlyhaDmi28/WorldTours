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
import hot from '../../img/weathers/hot.jpg';
import warm from '../../img/weathers/warm.jpg';
import cool from '../../img/weathers/cool.jpg';
import cold from '../../img/weathers/cold.jpg';

function Weather({weather, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Какую погоду вы желаете в месте, куда вы отправитесь?</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={weather}
						onChange={(e) => setAnswer(prev => ({ ...prev, weather: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={1}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={hot}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'red'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Жарко</b>
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
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={warm}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Тепло</b>
										</Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={3}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        image={cool}
                                        alt="green iguana"
                                    />
                                    <CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Прохладно</b>
                                        </Typography>
                                    </CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={4}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={cold}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'blue'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Холодно</b>
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

export default Weather;
