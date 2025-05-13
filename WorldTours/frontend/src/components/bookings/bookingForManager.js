import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField   } from "@mui/material";
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import ClickableMap from '../general/clickableMap'
import close from '../../img/close.svg'
import map from '../../img/map.png'
import account from '../../img/account.svg';
const token = localStorage.getItem("token");

function BookingForManager({indexOfSelectedBooking, deleteBooking, confirmBooking, bookings, closeModal}) {   
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isOpenPriceEditor, setIsOpenPriceEditor] = useState(false);
    const [indexOfSelectedRoomType, setIndexOfSelectedRoomType] = useState(0);
    const [userHasAva, setUserHasAva] = useState(false);

    const [isOpenHotelMap, setIsOpenHotelMap] = useState(false);
    const [isOpenDepartmentDepartureMap, setIsOpenDepartmentDepartureMap] = useState(false);

    const [booking, setBooking] = useState({
        id: null,
        tourId: null,
        routeId: null,
        tourName: null,
        tourPhotoUrl: null,
        price: null,
        orderSeatsNumber: null,
        status: null,
        hasChildren: null,
        prioritySeatsInTransport: null,
        comment: null,
        route: {
            id: null,
            landingDateAndTimeOfDeparture: "",
            arrivalDateAndTimeOfDeparture: "",
            landingDateAndTimeOfReturn: "",
            arrivalDateAndTimeOfReturn: "",
            departmentDeparture: {
                name: null,
                address: null,
                city: null,
                country: null,
            },
            tranportTypeName: null
        },
        user: {
            id: null,
            name: null,
            surname: null,
            phoneNumber: null,
            email: null,
        },
        hotel: {
            id: 1,
            name: null,
            city: null,
            country: null,
            address: null,
            starsNumber: null,
            roomTypes: [
                {
                    id: null,
                    name: null,
                    price: null,
                    seatsNumber: null,
                    orderRoomsNumber: null,
                    characteristics: [
                        {
                            id:null,
                            name: null
                        },
                        {
                            id: null,
                            name: null
                        }
                    ]
                }
            ]
        }
    });

    const [changedPrice, setChangedPrice] = useState(booking.price);


    useEffect(() => {
        const getData = async () => {
            try {
                let response;

                response = await axios.get(`https://localhost:7276/booking/get?bookingId=${bookings[indexOfSelectedBooking].id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });

                const bookingData = response.data;
                setBooking(bookingData);
                setChangedPrice(bookingData.price);

                try {
                    response = await axios.head(bookingData.user.photoUrl); // HEAD-запрос получает только заголовки, без загрузки файла
                    if(response.status === 200) setUserHasAva(true); // Проверяем, вернул ли сервер код 200
                } catch (error) {
                    setUserHasAva(false);
                } 

            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

    const parseCustomDate = (str) => {
        if(str === "") return null;

        const [datePart, timePart] = str.split(', ');
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
      
        return new Date(year, month - 1, day, hours, minutes);
    }

    return (
        <div className="booking">
            <button className="close-modal-editor-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Бронь тура</h2>

            <div className='tour-info-on-booking'>
                <img className='tour-image-on-booking' src={booking.tourPhotoUrl}/>
                <div className='tour-text-info-on-booking'>
                    <div className='tour-name-on-booking'><b>{booking.tourName}</b></div>
                    <div className='department-departure-info-on-booking'>
                        <div>
                            <div><b>Отправление с: </b>{booking.route.departmentDeparture.name}</div>
                            <div><b>Транспорт: </b> {booking.route.tranportTypeName}</div>
                            <div className='location-on-booking'>{booking.route.departmentDeparture.country}, {booking.route.departmentDeparture.city}, {booking.route.departmentDeparture.address}</div>
                        </div>
                        <img className='map-on-booking' src={map} onClick={() => setIsOpenDepartmentDepartureMap(true)}/>
                        <Modal open={isOpenDepartmentDepartureMap} onClose={() => setIsOpenDepartmentDepartureMap(false)} className='hotel-map-on-modal'>
                            <ClickableMap 
                                lat={booking.route.departmentDeparture.lat} 
                                lng={booking.route.departmentDeparture.lng}
                            />
                        </Modal>
                        
                    </div>
                    <div className='hotel-info-on-booking'>
                        <div>
                            <div><b>Отель: </b>{booking.hotel.name}</div>
                            <div className='location-on-booking'>{booking.hotel.country}, {booking.hotel.city}, {booking.hotel.address}</div>
                        </div>
                        <img className='map-on-booking' src={map} onClick={() => setIsOpenHotelMap(true)}/>
                        <Modal open={isOpenHotelMap} onClose={() => setIsOpenHotelMap(false)} className='hotel-map-on-modal'>
                            <ClickableMap 
                                lat={booking.hotel.lat} 
                                lng={booking.hotel.lng}
                            />
                        </Modal>
                    </div>
                </div>
            </div>

            <div className='dates-and-times-on-booking'>
                <div><b>Путь до отеля: </b> {booking.route.landingDateAndTimeOfDeparture} &#8594; {booking.route.arrivalDateAndTimeOfDeparture}</div>
                <div><b>Путь обратно: </b> {booking.route.landingDateAndTimeOfReturn} &#8592; {booking.route.arrivalDateAndTimeOfReturn}</div>
            </div>

            <div className='room-types-on-booking'>
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
                            {booking.hotel.roomTypes.map((roomType, index) => (
                                <tr>
                                    <td onClick={(e) => {setAnchorEl(e.currentTarget); setIndexOfSelectedRoomType(index)}}>▼</td>
                                    <td>{roomType.name}</td>
                                    <td className="room-types-number-on-booking">
                                        {roomType.orderRoomsNumber}
                                    </td>
                                    <td className="room-type-price">{
                                        roomType.price * Math.floor((new Date(parseCustomDate(booking.route.landingDateAndTimeOfReturn)) - new Date(parseCustomDate(booking.route.arrivalDateAndTimeOfDeparture))) / (1000 * 60 * 60 * 24))
                                    }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
                <hr></hr>     
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
                    <MenuItem>Мест в номере: {booking.hotel.roomTypes[indexOfSelectedRoomType].seatsNumber}</MenuItem>
                    <Divider></Divider>
                        {booking.hotel.roomTypes[indexOfSelectedRoomType].characteristics.map((characteristic) => (
                            <MenuItem>{characteristic.name}</MenuItem>
                        ))}
                </Menu>    
            </div>

            <div className='order-seat-on-booking'><b>Заказано мест: </b>{booking.orderSeatsNumber}</div>
           
            <div className='more-booking-info'>
                {booking.hasChildren && <div><b>Есть дети!</b></div>} 
                <div>
                    <b>Приоритет расcадки: </b>
                    {booking.prioritySeatsInTransport ? 'возле окон' : 'рядом'}
                </div>
                {
                    (booking.comment !== '' && booking.comment !== null && booking.comment !== undefined) &&
                    <div className='show-comment-button' onClick={() => {setIsOpenComment(true)}}>Показать коментарий...</div>
                }
                <Dialog
                    open={isOpenComment}
                    onClose={() => {setIsOpenComment(false)}}
                >
                    <DialogTitle>
                        {"Коментарий"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           {booking.comment}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setIsOpenComment(false)}} autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={isOpenPriceEditor}
                    onClose={() => {setIsOpenPriceEditor(false)}}
                    slotProps={{
                        paper: {
                            component: 'form',
                            onSubmit: async (event) => {
                                event.preventDefault();

                                await axios.patch(`https://localhost:7276/booking/change_price?price=${changedPrice}&bookingId=${booking.id}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                });
                                
                                setBooking((prevBooking) => {
                                    return {
                                        ...prevBooking,
                                        price: changedPrice
                                    }
                                })
                                setIsOpenPriceEditor(false);
                            },
                        },
                    }}
                >
                    <DialogTitle>
                        {"Укажите цену"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Цена"
                            sx={{marginTop: '10px'}}
                            value={changedPrice}
                            onChange={(e) => {
                                setChangedPrice(+e.target.value)
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {setIsOpenPriceEditor(false)}} autoFocus>
                            Зарыть
                        </Button>
                        <Button type="submit" autoFocus>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            
            <div className='user-info-on-booking'>
                <img 
                    className='user-avatar-on-booking'
                    src={userHasAva ? booking.user.photoUrl : account}
                />
                <div>
                    {booking.user.name} {booking.user.surname}, {booking.user.email}, +375{booking.user.phoneNumber},
                </div>
            </div>

            <Divider className='price-on-booking' textAlign="right">Цена: <b>{booking.price}</b> <span>BYN</span><EditIcon className='edit-price-button' onClick={()=> {setChangedPrice(booking.price); setIsOpenPriceEditor(true)}}/></Divider>

            <div className='modal-editor-controller'>
                <button onClick={() => {deleteBooking(booking.id)}}>Отменить</button>
                <button 
                    style={booking.status === 1 ? {backgroundColor: 'grey'} : {}} 
                    disabled={booking.status === 1}
                    onClick={() => {confirmBooking(booking.id); setBooking((prevBooking) => {return {...prevBooking, status: 1}})}}
                >
                    Подтвердить
                </button>
            </div>
        </div>
    );
}

export default BookingForManager;
