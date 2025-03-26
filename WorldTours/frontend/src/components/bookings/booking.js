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
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField   } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Regions from '../general/regions';
import Countries from '../general/countries';
import Cities from '../general/cities';
import ClickableMap from '../general/clickableMap'
import close from '../../img/close.svg'
import map from '../../img/map.png'
const token = localStorage.getItem("token");

function Booking({indexOfSelectedBooking, deleteBooking, bookings, closeModal}) {   
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpenCharacteristicsMenu = Boolean(anchorEl);
    const [open, setOpen] = useState(false);

    const [isOpenHotelMap, setIsOpenHotelMap] = useState(false);
    const [isOpenDepartmentDepartureMap, setIsOpenDepartmentDepartureMap] = useState(false);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
        
    const [indexOfSelectedRoomType, setIndexOfSelectedRoomType] = useState(0);

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
            landingDateOfDeparture: null,
            landingTimeOfDeparture: null,
            arrivalDateOfDeparture: null,
            arrivalTimeOfDeparture: null,
            landingDateOfReturn: null,
            landingTimeOfReturn: null,
            arrivalDateOfReturn: null,
            arrivalTimeOfReturn: null,
            departmentDeparture: {
                name: null,
                address: null,
                city: null,
                country: null,
                lat: 53.89196,
		        lng: 27.55760,
            },
            tranportTypeName: null
        },
        hotel: {
            id: 1,
            name: null,
            city: null,
            country: null,
            address: null,
            starsNumber: null,
            lat: 53.89196,
		    lng: 27.55760,
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
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
    }, []);

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
                <div><b>Путь до отеля: </b> {booking.route.landingDateOfDeparture}, {booking.route.landingTimeOfDeparture} --) {booking.route.arrivalDateOfDeparture}, {booking.route.arrivalTimeOfDeparture}</div>
                <div><b>Путь обратно: </b> {booking.route.landingDateOfReturn}, {booking.route.landingTimeOfReturn} --) {booking.route.arrivalDateOfReturn}, {booking.route.arrivalTimeOfReturn}</div>
            </div>

            <div className='room-types-on-booking'>
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
                        {booking.hotel.roomTypes.map((roomType, index) => (
                            <tr>
                                <td onClick={(e) => {setAnchorEl(e.currentTarget); setIndexOfSelectedRoomType(index)}}>▼</td>
                                <td>{roomType.name}</td>
                                <td className="room-types-number-on-booking">
                                    {roomType.orderRoomsNumber}
                                </td>
                                <td className="room-type-price">{roomType.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                    <div className='show-comment-button' onClick={handleClickOpen}>Показать коментарий...</div>
                }
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Коментарий"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           {booking.comment}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Зарыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {
                (booking.status === null || booking.status === 0) && <div className='status-info'>Дождитесь подтрверждения брони</div>
            }

            {
                (booking.status === 1) && <div className='status-info' style={{color: 'rgb(60, 80, 254'}}>Необходимо оплатить тур</div>
            }

            {
                (booking.status === 2) && <div className='status-info' style={{color: 'rgb(224, 190, 39)'}}>Тур забронирован!</div>
            }

            <Divider className='price-on-booking' textAlign="right">Цена: <b>{booking.price}</b> <span>BYN</span></Divider>


            <div className='modal-editor-controller'>
                <button onClick={() => {deleteBooking(booking.id)}}>Отменить</button>
                <button 
                    style={booking.status !== 1 ? {backgroundColor: 'grey'} : {}} 
                    disabled={booking.status !== 1}
                    onClick={() => {window.location.href = `/payment_booking/${booking.id}`;}}
                >
                    Оплатить
                </button>
            </div>
        </div>
    );
}

export default Booking;
