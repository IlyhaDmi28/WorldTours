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
import desert from '../../img/bioms/desert.jpg';
import steppe from '../../img/bioms/steppe.jpg';
import forest from '../../img/bioms/forest.jpg';

function Biom({biom, setAnswer}) {
	return (
	    <Box sx={{textAlign: 'center'}}>
			<FormControl className='question' sx={{textAlign: 'center'}}>
				<FormLabel className='question-text'>Какой биом, в зависимости от количества растительности, вы предпочитаете?</FormLabel>
					<RadioGroup
						rox
						className='answers'
						defaultValue={biom}
						onChange={(e) => setAnswer(prev => ({ ...prev, biom: e.target.value }))}
					>
					<Box >
						<FormControlLabel
							value={'Пустынная местность'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={desert}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'red'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Пустыня</b>
                                        </Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Степная местность'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
									<CardMedia
										component="img"
										height="300px"
										image={steppe}
										alt="green iguana"
									/>
									<CardContent className='answer-card-content' sx={{backgroundColor: 'orange'}}>
										<Typography gutterBottom variant="h5" component="div">
											<b>Степи/луга</b>
										</Typography>
									</CardContent>
								</Card>
							}
							labelPlacement="top"
						/>
						<FormControlLabel
							value={'Лес рядом'}
							control={<Radio size='small'/>}
							label={
								<Card className='answer-card'>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        image={forest}
                                        alt="green iguana"
                                    />
                                    <CardContent className='answer-card-content' sx={{backgroundColor: 'green'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <b>Лес/джунгли</b>
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

export default Biom;
