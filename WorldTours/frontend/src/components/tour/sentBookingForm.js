import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import close from '../../img/close.svg'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import useAlert from '../../hooks/useAlert';
const token = localStorage.getItem("token");

function SentBookingForm({roomTypes, selectedRoute, closeModal}) {
    const authUser = useSelector((state) => state.authUser.value);
    const showAlert = useAlert();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);
    
    const [indexOfSelectedRoomType, setIndexOfSelectedRoomType] = useState(0);
    const [requestForBooking, setRequestForBooking] = useState({
        bookedRoomTypes: (roomTypes || []).map((roomType) => ({
            id: roomType.id,
            orderRoomsNumber: null,
            price: roomType.price
        })),
        hasChildren: false,
        prioritySeatsInTransport: false,
        comment: '',
        orderSeatsNumber: 1,
        userId: authUser.id,
        routeId: selectedRoute.id
    });

    const [finalPrice, setFinalPrice] = useState();
    const [isSuccessfullBooking, setIsSuccessfullBooking] = useState(false);

    useEffect(() => {
		const changeFinalPrice = async () => {
            let sumAllPrices = selectedRoute.price * requestForBooking.orderSeatsNumber;

            requestForBooking.bookedRoomTypes.forEach((bookedRoomType) => { 
                sumAllPrices += bookedRoomType.orderRoomsNumber * (bookedRoomType.price  * Math.floor((new Date(selectedRoute.landingDateAndTimeOfReturn) - new Date(selectedRoute.arrivalDateAndTimeOfDeparture)) / (1000 * 60 * 60 * 24)));
            });

            setFinalPrice(sumAllPrices);
		};
	
		changeFinalPrice();
	}, [requestForBooking]);
    
    const changeRequestForbooking = (e) => {
        const { name, value } = e.target;
        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
            [name]: value,
        }));
    };

    const changeChecboxRequestForbooking = (e) => {
        const { name, checked } = e.target;
        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
            [name]: checked,
        }));
    };

    const changeBookedRoomTypes = (id, value, roomsNumber) => {
        if (value > roomsNumber) value = roomsNumber;
        if (value <= 0) value = '';

        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
            bookedRoomTypes: requestForBooking.bookedRoomTypes.map((bookedRoomType)=> {
                return bookedRoomType.id === id ? {
                    id: id, 
                    price: bookedRoomType.price,
                    orderRoomsNumber: value  
                } : bookedRoomType
            })
        }));
    };

    const addBookedRoomType = (id) => {
        const value =  requestForBooking.bookedRoomTypes.find((bookedRoomType) => bookedRoomType.id === id).orderRoomsNumber + 1;

        setRequestForBooking((prevRoute) => ({
            ...prevRoute,
            bookedRoomTypes: requestForBooking.bookedRoomTypes.map((bookedRoomType)=> {
                return bookedRoomType.id === id ? {
                    id: id, 
                    price: bookedRoomType.price,
                    orderRoomsNumber: value !== 0 ? value : null  
                } : bookedRoomType
            })
        }));

    };

    const removeBookedRoomType = (id) => {
        const value =  requestForBooking.bookedRoomTypes.find((bookedRoomType) => bookedRoomType.id === id).orderRoomsNumber - 1;

        setRequestForBooking((prevRoute) => ({
            ...prevRoute,
            bookedRoomTypes: requestForBooking.bookedRoomTypes.map((bookedRoomType)=> {
                return bookedRoomType.id === id ? {
                    id: id, 
                    price: bookedRoomType.price,
                    orderRoomsNumber: value !== 0 ? value : null  
                } : bookedRoomType
            })
        }));
        // changeFinalPrice();
    };

    const getAvailableNumberOfSeats = () => {
        let allSeatsNumberOfRoomTypes = 0;
        roomTypes.forEach((roomType) => { allSeatsNumberOfRoomTypes += roomType.roomsNumber * roomType.seatsNumber});
        return Math.min(allSeatsNumberOfRoomTypes, selectedRoute.seatsNumber);
    }

    const sendRequestForBooking = async () => {
		if(!authUser) {
            showAlert("Что бы забронировать тур, вам необходимо войти в аккаунт", 'error');
			return;
		}

		if(authUser.role !== 1) {
            showAlert("Только обычные пользователи могут бронировать туры!", 'error');
			return;
		}

		if(authUser.blockedStatus) {
            showAlert("Вы не можете забронировать тур, так как ваш профиль был заблокирован!", 'error');
			return;
		}

		if(requestForBooking.orderSeatsNumber <= 0) {
            showAlert("Вы ввели некоретное количество мест!", 'error');
			return;
		}

		if(getAvailableNumberOfSeats() - requestForBooking.orderSeatsNumber < 0) {
            showAlert("К сожалению, в туре не хватает мест!", 'error');
			return;
		}

        let sumOfOrderSeatsInRooms = 0;
        requestForBooking.bookedRoomTypes.forEach((bookedRoomType) => {sumOfOrderSeatsInRooms += bookedRoomType.orderRoomsNumber * roomTypes.find(roomType => roomType.id === bookedRoomType.id).seatsNumber})

        if(sumOfOrderSeatsInRooms < requestForBooking.orderSeatsNumber) {
            showAlert("Вы заказали недостаточно номеров! Вы указали больше людей, чем вместяться в номера", 'error');
			return;
        }

        const requestData = {
            ...requestForBooking,
            price: finalPrice
        }

		try {
			await axios.post('https://localhost:7276/booking/add', requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});

			// alert("Тур успешно забронирован!"); 
            showAlert("Заявка на тур успешно отправлена!", 'success');
		} catch (error) {
			if(error.response != undefined) {
				if(error.response.status === 409) {
                    showAlert("Вы уже отправили заявку на этот тур!", 'error');
					return;
				}
				if(error.response.status === 401) {
                    // setError("Что бы забронировать тур, вам необходимо войти в аккаунт")
                    showAlert('Что бы забронировать тур, вам необходимо войти в аккаун!', 'error');
					return;
				}
			}
	
			console.log('Ошибка бронировании тура: ', error);
		} 
	}

    return (
            <div className="sent-booking-form">
                <button className="close-sent-booking-form-button" onClick={closeModal}>
                    <img src={close}/>
                </button>

                <h2>Некоторые уточнения</h2>
               

                <div className='sent-booking-form-room-types'>
                    <h3>Выберите типы номеров</h3>
                    <hr></hr>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Хар-ки</th>
                                    <th>Тип номера</th>
                                    <th>Кол. брон. номеров</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomTypes.map((roomType, index) => (
                                    <tr>
                                        <td onClick={(e) => {setAnchorEl(e.currentTarget); setIndexOfSelectedRoomType(index)}}>▼</td>
                                        <td>{roomType.name}</td>
                                        <td className="booking-form-room-types-number">
                                            <button className="add-room-type-button" onClick={() => addBookedRoomType(roomType.id)}>+</button>
                                            <button className="remove-room-type-button" onClick={() => removeBookedRoomType(roomType.id)}>-</button>
                                            <TextField
                                                className='booking-form-room-types-number-input'
                                                name='orderSeatsNumber' 
                                                value={ 
                                                    requestForBooking.bookedRoomTypes.find((bookedRoomType) => bookedRoomType.id === roomType.id).orderRoomsNumber
                                                } 
                                                onChange={(e) => changeBookedRoomTypes(roomType.id, +e.target.value, roomType.roomsNumber)}
                                                size='small'
                                                variant="standard"
                                                type='number'
                                                placeholder={roomType.roomsNumber} 
                                                InputProps={{
                                                    min: 0,
                                                    max: roomType.roomsNumber,
                                                    sx: {
                                                        '& input': {
                                                            textAlign: 'center'
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td className="room-type-price"> +{
                                            roomType.price * Math.floor((new Date(selectedRoute.landingDateAndTimeOfReturn) - new Date(selectedRoute.arrivalDateAndTimeOfDeparture)) / (1000 * 60 * 60 * 24))
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
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
                        <MenuItem>Мест в номере: {roomTypes[indexOfSelectedRoomType].seatsNumber}</MenuItem>
                        <Divider></Divider>
                            {roomTypes[indexOfSelectedRoomType].characteristics.map((characteristic) => (
                                <MenuItem>{characteristic.name}</MenuItem>
                            ))}
                    </Menu>    
                </div>

                <div className='booking-form-seats'>
                    <div>Всего бронируемых мест:</div>
                    <TextField
                        className='booking-form-seats-input'
                        name='orderSeatsNumber' 
                        value={ requestForBooking.orderSeatsNumber} 
                        onChange={changeRequestForbooking}
                        size='small'
                        variant="standard"
                        type='number'
                        inputProps={{ min: 1, max: getAvailableNumberOfSeats() }}
                        InputProps={{
                            min: 0,
                            max: 8,
                            sx: {
                                '& input': {
                                    textAlign: 'center'
                                }
                            }
                        }}
                    />
                    <div style={{marginLeft: 'auto', color: '#9d9d9d'}}>Осталось: {getAvailableNumberOfSeats()}</div>
                </div>
                <FormControlLabel 
                    className="booking-form-checkbox" 
                    control = {
                        <Checkbox name='hasChildren' checked={requestForBooking.hasChildren} onChange={changeChecboxRequestForbooking} sx={{ transform: "scale(0.9)" }}/>
                    } 
                    label="Есть дети (менджер уточнит о возможных скидках и вам сообщит)"
                />
                <FormControlLabel 
                    className="booking-form-checkbox" 
                    control = {
                        <Switch name='prioritySeatsInTransport'  checked={requestForBooking.prioritySeatsInTransport} onChange={changeChecboxRequestForbooking} sx={{ transform: "scale(0.9)" }}/>
                    }
                    label="Места в приоритете в транспорте рядом/возле окна" 
                />
                
                <div className="booking-form-comment">
                    <div><b>Оставте коментарий</b></div>
                    <TextField className='booking-form-comment-input'
                        name="comment"
                        multiline
                        rows={5}
                        maxRows={5}
                        placeholder='Коментарий'
                        value={ requestForBooking.comment}
                        onChange={changeRequestForbooking}
                        sx={{width: "100%"}}
                    />
                </div>

                <div className='booking-form-disclaimer'>* Итоговая цена и некоторые детали тура могут поменться. Менеджер в случае чего, обо всё вам сообщит</div>
                
                <Divider className='booking-form-final-price' textAlign="right">Цена: <b>{finalPrice}</b> <span>BYN</span></Divider>

                <div className="sent-booking-form-controller">{/*комп*/}
                    <button>Отменить</button>
                    <button onClick={sendRequestForBooking}>Отправить заявку</button>
                </div>

                <Dialog
                    open={isSuccessfullBooking}
                    onClose={() => setIsSuccessfullBooking(false)}
                >
                    <DialogTitle >
                        {"Заявка на бронь тура успешно отправлена!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Данную бронь вы можете посмотреть в своём списке броней
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => {window.location.href = '/bookings'; setIsSuccessfullBooking(false)}}>Просмотреть бронь</Button>
                    <Button onClick={() => {window.location.href = '/tours'; setIsSuccessfullBooking(false)}} autoFocus>
                        Ок
                    </Button>
                    </DialogActions>
                </Dialog>

                

            </div>
    );
}

export default SentBookingForm;
