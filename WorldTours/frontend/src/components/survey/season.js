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
import summer from '../../img/months/summer.jpg';
import autumn from '../../img/months/autumn.jpg';
import winter from '../../img/months/winter.jpg';
import spring from '../../img/months/spring.jpg';

function Season({season, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>В какое вреям года вы хотите отправиться?</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={season}
						onChange={(e) => setAnswer(prev => ({ ...prev, season: e.target.value }))}
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
										image={summer}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'red'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Лето</b>
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
										image={autumn}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Осень</b>
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
                                        image={winter}
                                        alt="green iguana"
                                    />
                                    <CardContent className='answer-card-content' sx={{backgroundColor: 'blue'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Зима</b>
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
										image={spring}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Весна</b>
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

export default Season;
