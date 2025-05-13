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
import sea from '../../img/waters/sea.jpg';
import lake from '../../img/waters/lake.jpg';
import river from '../../img/waters/river.jpg';

function Water({water, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Какой водоём рядом должен быть?</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={water}
						onChange={(e) => setAnswer(prev => ({ ...prev, water: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={'Море рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={sea}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'blue'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Море</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Озеро рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={lake}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Озеро</b>
										</Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Река рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        image={river}
                                        alt="green iguana"
                                    />
                                    <CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Река</b>
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

export default Water;
