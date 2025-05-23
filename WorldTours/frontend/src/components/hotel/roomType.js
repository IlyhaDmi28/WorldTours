import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function RoomType({indexOfSelectedRoomType, roomTypes, setRoomTypes, closeModal}) {    
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);

    const [characteristics, setCharacteristics] = useState([]);

    const [roomType, setRoomType] = useState(indexOfSelectedRoomType !== -1 ? roomTypes[indexOfSelectedRoomType] : {
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

				response = await axios.get('https://localhost:7276/room_type/characteristics', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const characteristicsData = response.data;

                const characteristicsIdsToRemove = new Set(roomType.characteristics.map(item => item.id));
				setCharacteristics(characteristicsData.filter(item => !characteristicsIdsToRemove.has(item.id)));
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

    
    // const removeSelectedCharacteristic = (characteristic) => {
    //     setRoomType((prevRoomType) => {
    //         return {
    //             ...prevRoomType,
    //             characteristics: prevRoomType.characteristics.filter((removedCharacteristic) => characteristic.id !== removedCharacteristic.id)
    //         }
    //     })

    //     const newCharacteristics = [...characteristics];
    //     newCharacteristics.push(characteristic);
    //     setCharacteristics(newCharacteristics);
    // }

    const removeSelectedCharacteristic = (characteristic) => {
        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            characteristics: prevRoomType.characteristics.filter(
                (removedCharacteristic) => removedCharacteristic.id !== characteristic.id
            ),
        }));
    
        setCharacteristics((prevCharacteristics) => [...prevCharacteristics, characteristic]);
    };

    // const AddSelectedCharacteristic = (characteristic) => {
    //     const newCharacteristics = [...roomType.characteristics];
    //     newCharacteristics.push(characteristic);
    //     setRoomType((prevRoomType) => {
    //         return {
    //             ...prevRoomType,
    //             characteristics: newCharacteristics
    //         }
    //     })

    //     setCharacteristics(characteristics.filter((removedCharacteristic) => removedCharacteristic.id !== characteristic.id));
    // };

    const addSelectedCharacteristic = (characteristic) => {
        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            characteristics: [...prevRoomType.characteristics, characteristic], // Добавляем характеристику напрямую
        }));
    
        setCharacteristics((prevCharacteristics) =>
            prevCharacteristics.filter((removedCharacteristic) => removedCharacteristic.id !== characteristic.id)
        );
    };

    const changeRoomType = (e) => {
        const { name, value } = e.target;

        setRoomType((prevRoomType) => ({
            ...prevRoomType,
            [name]: value,
        }));
    };

    // const saveRoomType = () => {
    //     console.log(roomTypes); 

    //     if(indexOfSelectedRoomType === -1)  setRoomTypes([...roomTypes, roomType]);
    //     else {
    //         let hyu = roomTypes;
    //         hyu[indexOfSelectedRoomType] = roomType;
    //         setRoomTypes(hyu);
    //     }
    // };

    const saveRoomType = () => {
        let newRoomTypes;
        console.log(indexOfSelectedRoomType);
        

        if(
			(roomType.name === "" || roomType.name === null) ||
			(roomType.seatsNumber === "" || roomType.seatsNumber === null) ||
			(roomType.roomsNumber === "" || roomType.roomsNumber === null) ||
			(roomType.price === "" || roomType.price === null) 
			
		) {
			alert("Вы не заполнили все поля!")
			return;
		}

        if(indexOfSelectedRoomType === -1) {
            newRoomTypes = roomTypes;
            newRoomTypes.push(roomType);
            setRoomTypes(newRoomTypes);
        }
        else {
            newRoomTypes = roomTypes.map((rt, index) => index === indexOfSelectedRoomType ? roomType : rt);
            setRoomTypes(newRoomTypes);
        }
    };

    const clearRoute = async () => {
        const response = await axios.get('https://localhost:7276/room_type/characteristics', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });
        const characteristicsData = response.data;
        setCharacteristics(characteristicsData);
        
        setRoomType({
            name: null,
            seatsNumber: null,
            roomsNumber: null,
            price: null,
            characteristics: [],
        });
    };

    return (
        <div className="room-type">
            <button className="close-room-type-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Тип номера</h2>

            <div className='room-type-info'>
                <h3>Общая информация</h3>
                <hr></hr>
                <div>
                    <div className='parameter-name'>Название: <b>{roomType.name}</b></div>
                    <div className='parameter-name'>Кол. мест: <b>{roomType.seatsNumber}</b></div>
                    <div className='parameter-name'>Кол. номеров: <b>{roomType.roomsNumber}</b></div>
                    <div className='parameter-name'>Цена за ночь: <b>{roomType.price} BYN</b></div>
                </div>
            </div>

            <div className='room-type-characteristics'>
                <h3>Характеристики</h3>
                <hr></hr>
                <div>
                    {roomType.characteristics.map((characteristic, index) => (
                        <div className='room-type-characteristic'>
                            {characteristic.name}
                        </div>
                    ))}
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
                        {characteristics.map((characteristic) => (
                            <MenuItem onClick={() => addSelectedCharacteristic(characteristic)}>{characteristic.name}</MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>

            <hr></hr>

            <div className='room-type-controller'>
                <button onClick={closeModal}>Ок</button>
            </div>
        </div>
    );
}

export default RoomType;
