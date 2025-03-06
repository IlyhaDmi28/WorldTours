import React, { useState, useEffect } from 'react';
import axios from 'axios';
import star from '../../img/star.svg'
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function RoomTypeEditor({selectedRoomType, roomTypes, setRoomTypes, closeModal}) {    
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);

    const [characteristics, setCharacteristics] = useState(['sdfsdg', 'dfgdf', 'gfhjgf']);

    const [roomType, setRoomType] = useState(selectedRoomType !== null ? selectedRoomType : {
        name: null,
        seatsNumber: null,
        roomsNumber: null,
        price: null,
        characteristics: [],
    });


    useEffect(() => {
		const getData = async () => {
            try {
				let response;

				// response = await axios.get(`https://localhost:7276/tour/tour_to_edit?tourId=${id}`, {
                //     headers: {
                //         'Authorization': 'Bearer ' + token,
                //     }
                // });
				// const tourData = response.data;
				// setHotel((prevHotel) => ({
				// 	...prevHotel, // Сохраняем предыдущие значения
				// 	id: tourData.id,
				// 	name: tourData.name,
				// 	mainDescription: tourData.mainDescription,
				// 	nutritionTypeId: tourData.nutritionTypeId,
				// 	descriptions: tourData.descriptions,
				// }));
				// setPhotosUrl([tourData.photoUrl === null ? selectNewPhoto : tourData.photoUrl, t1, t2, t3, t4, t5, t6, t7, t8]);

				// if(tourData.hotelId !== null) {
				// 	response = await axios.get(
				// 		`https://localhost:7276/direction/get?hotelId=${tourData.hotelId}`,
				// 		{
				// 			headers: {
				// 				Authorization: `Bearer ${token}`,
				// 			},
				// 		}
				// 	);
				// 	const directionInfoData = response.data;
				// 	setDirectionInfo(directionInfoData);
				// }

                // response = await axios.get('https://localhost:7276/tour/tour_types', {
                //     headers: {
                //         'Authorization': 'Bearer ' + token,
                //     }
                // });
				// const typesData = response.data;
				// setTourTypes(typesData);

				response = await axios.get('https://localhost:7276/room_type/characteristics', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const characteristicsData = response.data;
				console.log(characteristicsData);
				console.log('characteristicsData');
				setCharacteristics(characteristicsData);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

    
    const removeSelectedCharacteristic = (characteristic) => {
        setRoomType((prevRoomType) => {
            return {
                ...prevRoomType,
                characteristics: prevRoomType.characteristics.filter((removedCharacteristic) => characteristic.id !== removedCharacteristic.id)
            }
        })

        const newCharacteristics = [...characteristics];
        newCharacteristics.push(characteristic);
        setCharacteristics(newCharacteristics);
    }

    const AddSelectedCharacteristic = (characteristic) => {
        const newCharacteristics = [...roomType.characteristics];
        newCharacteristics.push(characteristic);
        setRoomType((prevRoomType) => {
            return {
                ...prevRoomType,
                characteristics: newCharacteristics
            }
        })

        setCharacteristics(characteristics.filter((removedCharacteristic) => removedCharacteristic.id !== characteristic.id));
    };

    const changeRoomType = (e) => {
        const { name, value } = e.target;

        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            [name]: value,
        }));
    };

    const saveRoomType = () => {
        console.log(roomTypes); 

        let hyu = roomTypes;
        for(let i = 0; i < roomTypes.length; i++) {
            if(hyu[i].id === roomType.id) {
                console.log('xxxxxfff'); 

                hyu[i] = roomType;
                setRoomTypes(hyu);
                return;
            }
            else {
                console.log('dddddgggg'); 

                setRoomTypes([...roomTypes, roomType]);
                return;
            }
        }
    };

    const clearRoute = () => {
        
    };

    return (
        <div className="room-type-editor">
            <button className="close-edit-route-menu-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Тип номера</h2>

            <div className='room-type-editor-info'>
                <h3>Общая информация</h3>
                <hr></hr>
                <div>
                    <div>
                        <div className='parameter-name'>Название</div>
                        <input name='name' type='text' value={roomType.name} onChange={changeRoomType}/>
                    </div>

                    <div>
                        <div>
                            <div className='parameter-name'>Кол. мест</div>
                            <input name='seatsNumber' type='number' value={roomType.seatsNumber} onChange={changeRoomType}/>
                        </div>
                        <div>
                            <div className='parameter-name'>Кол. номеров</div>
                            <input name='roomsNumber' type='number' value={roomType.roomsNumber} onChange={changeRoomType}/>
                        </div>
                        <div>
                            <div className='parameter-name'>Цена</div>
                            <input name='price' type='number' value={roomType.price} onChange={changeRoomType}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='room-type-editor-characteristics'>
                <h3>Характеристики</h3>
                <hr></hr>
                <div>
                    {roomType.characteristics.map((characteristic, index) => (
                        <div className='room-type-editor-characteristic'>
                            {characteristic.name} <ClearIcon className='remove-room-type-characteristic-button' onClick={() => removeSelectedCharacteristic(characteristic)}/>
                        </div>
                    ))}
                   <AddIcon onClick={(e) => {setAnchorEl(e.currentTarget)}} />
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpenCharacteristicsMenu}
                        onClose={() => setAnchorEl(null)}
                        slotProps={{
                            paper: {
                              style: {
                                maxHeight: '200px',
                                width: '400px',
                              },
                            },
                        }}
                    >
                        {characteristics.map((characteristic, index) => (
                            <MenuItem onClick={() => AddSelectedCharacteristic(characteristic)}>{characteristic.name}</MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>

            <hr></hr>

            <div className='room-type-editor-controller'>{/*комп*/}
                <button onClick={clearRoute}>Очистить всё</button>
                <button onClick={saveRoomType}>Сохранить</button>
            </div>
        </div>
    );
}

export default RoomTypeEditor;
