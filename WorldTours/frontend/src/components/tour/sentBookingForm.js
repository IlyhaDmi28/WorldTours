import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TextField   } from "@mui/material";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import star from '../../img/star.svg'
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function SentBookingForm({roomTypes, selectedRoute, closeModal}) {
    const [searchParams] = useSearchParams(); // Получение query-параметров
    const location = useLocation();

    const authUser = useSelector((state) => state.authUser.value);

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);
    
    const [indexOfSelectedRoomType, setIndexOfSelectedRoomType] = useState(0);
    const [requestForBooking, setRequestForBooking] = useState({
        bookedRoomTypes: (roomTypes || []).map((roomType) => ({
            id: roomType.id,
            orderRoomsNumber: null,
            price: roomType.price
        })),
        hasСhildren: false,
        prioritySeatsInTransport: false,
        comment: '',
        orderSeatsNumber: 1,
        userId: authUser.id,
        routeId: selectedRoute.id
    });

    const [finalPrice, setFinalPrice] = useState();

    useEffect(() => {
		const changeFinalPrice = async () => {
            let sumAllPrices = selectedRoute.price * requestForBooking.orderSeatsNumber;
            console.log('ssssffff');

            requestForBooking.bookedRoomTypes.forEach((bookedRoomType) => { 
                sumAllPrices += bookedRoomType.orderRoomsNumber * bookedRoomType.price;
                
            });
            console.log(sumAllPrices);

            setFinalPrice(sumAllPrices);
		};
	
		changeFinalPrice();
	}, [requestForBooking]);
    
    // useEffect(() => {
	// 	const setFinalPrice = async () => {
    //         let finalPrice = selectedRoute.price * requestForBooking.orderSeatsNumber;
    //         console.log('ssssffff');
    //         requestForBooking.bookedRoomTypes.forEach((bookedRoomType) => 
    //             finalPrice += bookedRoomType.roomTypes * bookedRoomType.price
    //         );

    //         setRequestForBooking((prevRequestForBooking) => ({
    //             ...prevRequestForBooking,
    //             price: finalPrice,
    //         }));
	// 	};
	
	// 	setFinalPrice();
	// }, [requestForBooking]);

    const changeRequestForbooking = (e) => {
        const { name, value } = e.target;
        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
            [name]: value,
        }));
        // changeFinalPrice();
    };

    const changeChecboxRequestForbooking = (e) => {
        const { name, checked } = e.target;
        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
            [name]: checked,
        }));
    };

    const changeBookedRoomTypes = (id, value) => {
        setRequestForBooking((RequestForBooking) => ({
            ...RequestForBooking,
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
        // changeFinalPrice();

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
			alert("Что бы забронировать тур, вам необходимо войти в аккаунт");
			return;
		}

		if(authUser.role !== 1) {
			alert("Только обычные пользователи могут бронировать туры!")
			return;
		}

		if(authUser.blockedStatus) {
			alert("Вы не можете забронировать тур, так как ваш профиль был заблокирован!");
			return;
		}

		if(requestForBooking.orderSeatsNumber <= 0) {
			alert("Вы ввели некоретное количество мест!")
			return;
		}

		if(getAvailableNumberOfSeats() - requestForBooking.orderSeatsNumber < 0) {
			alert("К сожалению, в туре не хватает мест!")
			return;
		}

        let sumOfOrderSeatsInRooms = 0;
        requestForBooking.bookedRoomTypes.forEach((bookedRoomType) => {sumOfOrderSeatsInRooms += bookedRoomType.orderRoomsNumber * roomTypes.find(roomType => roomType.id === bookedRoomType.id).seatsNumber})

        if(sumOfOrderSeatsInRooms > requestForBooking.orderSeatsNumber) {
            alert("Вы заказали недостаточно номеров! Вы указали больше людей, чем вместяться в номера")
			return;
        }

        console.log(requestForBooking);

        const requestData = {
            ...requestForBooking,
            price: finalPrice
        }

		try {
			// const routeId = searchParams.get('routeId');
			await axios.post('https://localhost:7276/booking/add', requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});

			alert("Тур успешно забронирован!"); 
		} catch (error) {
			if(error.response != undefined) {
				if(error.response.status === 409) {
					alert("Вы уже забронировали этот тур!"); 
					return;
				}
				if(error.response.status === 401) {
					alert("Что бы забронировать тур, вам необходимо войти в аккаунт"); 
					return;
				}
			}
	
			console.log('Ошибка бронировании тура: ', error);
		} 
	}
    // const changeRoute = (e) => {
    //     const { name, value } = e.target;
    //     setRoute((prevRoute) => ({
    //         ...prevRoute,
    //         [name]: value,
    //     }));
    // };

    // const changeDepartmentDeparture = (e) => {
    //     const selectedId = parseInt(e.target.value, 10); // Получаем id выбранного элемента
    //     const selectedDepartmentDeparture = departmentDepartures.find((departmentDeparture) => departmentDeparture.id === selectedId); // Ищем объект по id

    //     setRoute((prevRoute) => ({
    //         ...prevRoute,
    //         departmentDeparture: {
    //             id: selectedDepartmentDeparture.id,
    //             name: selectedDepartmentDeparture.name,
    //             city: selectedDepartmentDeparture.city,
    //             country: selectedDepartmentDeparture.country,
    //         },
    //         transportType: {
    //             id: selectedDepartmentDeparture.transportTypeId,
    //             name: transportTypes.find((transportType) => transportType.id === selectedDepartmentDeparture.transportTypeId).name
    //         }
    //     }));
    // };

    // const changeTransportType = (e) => {
    //     const selectedId = parseInt(e.target.value, 10); // Получаем id выбранного элемента
    //     const selectedTransportType = transportTypes.find((transportType) => transportType.id === selectedId); // Ищем объект по id
    //     if (selectedTransportType) {
    //         setRoute((prevRoute) => ({
    //             ...prevRoute,
    //             transportType: {
    //                 id: selectedTransportType.id,
    //                 name: selectedTransportType.name,
    //             },
    //         }));
    //     }
    // };

    // const saveRoute = () => {
    //     if(
    //         (route.landingDateOfDeparture === "" || route.landingDateOfDeparture === null) ||
    //         (route.landingTimeOfDeparture === "" || route.landingTimeOfDeparture === null) ||
    //         (route.arrivalDateOfDeparture === "" || route.arrivalDateOfDeparture === null) ||
    //         (route.arrivalTimeOfDeparture === "" || route.arrivalTimeOfDeparture === null) ||
    //         (route.landingDateOfReturn === "" || route.landingDateOfReturn === null) ||
    //         (route.landingTimeOfReturn === "" || route.landingTimeOfReturn === null) ||
    //         (route.arrivalDateOfReturn === "" || route.arrivalDateOfReturn === null) ||
    //         (route.arrivalTimeOfReturn === "" || route.arrivalTimeOfReturn === null) ||
    //         (route.departmentDeparture === "" || route.departmentDeparture === null) ||
    //         (route.transportType === "" || route.transportType === null) ||
    //         (route.departmentDeparture === "" || route.departmentDeparture === null) ||
    //         (route.price === "" ||route.price === null) ||
    //         (route.seatsNumber === "" || route.seatsNumber === null)
    //     ) {
    //         alert("Вы не заполнили все поля!");
    //         return;
    //     }
        
    //     let newRoutes;
    //     console.log(indexOfSelectedRoute);
    //     if(indexOfSelectedRoute === -1) {
    //         newRoutes = routes;
    //         newRoutes.push(route);
    //         setRoutes(newRoutes);
    //     }
    //     else {
    //         newRoutes = routes.map((r, index) => index === indexOfSelectedRoute ? route : r);
    //         setRoutes(newRoutes);
    //     }
    // };

    // const clearRoute = () => {
    //     setRoute({
    //         landingDateOfDeparture: "",
    //         landingTimeOfDeparture: "",
    //         arrivalDateOfDeparture: "",
    //         arrivalTimeOfDeparture: "",
    //         landingDateOfReturn: "",
    //         landingTimeOfReturn: "",
    //         arrivalDateOfReturn: "",
    //         arrivalTimeOfReturn: "",
    //         departmentDeparture: {
    //             id: 1,
    //             name: null,
    //             city: null,
    //             countrty: null
    //         },
    //         transportType: {
    //             id: 1,
    //             name: null,
    //         },
    //         price: 0,
    //         seatsNumber: 0,
    //     });


    return (
            <div className="sent-booking-form">
                <button className="close-sent-booking-form-button" onClick={closeModal}>
                    <img src={close}/>
                </button>

                <h2>Некоторые уточнения</h2>
               

                <div className='sent-booking-form-room-types'>
                    <h3>Типы номеров</h3>
                    <hr></hr>
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
                                        <input
                                            type='number'
                                            placeholder={roomType.roomsNumber} 
                                            value={
                                                requestForBooking.bookedRoomTypes.find((bookedRoomType) => bookedRoomType.id === roomType.id).orderRoomsNumber
                                            }
                                            onChange={(e) => changeBookedRoomTypes(roomType.id, +e.target.value)}
                                        />
                                        {/* <input type="text" value="0"/> */}
                                    </td>
                                    <td className="room-type-price">+{roomType.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <input name='orderSeatsNumber' placeholder={getAvailableNumberOfSeats()} value={ requestForBooking.orderSeatsNumber} onChange={changeRequestForbooking}/>
                    <div style={{marginLeft: '10px'}}><b>Осталось: {getAvailableNumberOfSeats()}</b></div>
                </div>
                <FormControlLabel 
                    className="booking-form-checkbox" 
                    control = {
                        <Checkbox name='hasСhildren' checked={requestForBooking.hasСhildren} onChange={changeChecboxRequestForbooking} sx={{ transform: "scale(0.9)" }}/>
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
                {/* <div className="booking-form-checkbox">
                    <input
                        type="checkbox"
					/>
					<div>
						Есть дети (менджер уточнит о возможных скидказ и вам сообщит)
					</div>
                </div> */}
                
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
            </div>
    );
}

export default SentBookingForm;
