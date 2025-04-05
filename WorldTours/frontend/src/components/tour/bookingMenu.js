import { useState } from "react";
import Modal from '@mui/material/Modal';
import SentBookingForm from "./sentBookingForm";
import airplane from "../../img/airplane.svg"
import bus from "../../img/bus.svg"
import ship from "../../img/ship.svg"
import dayjs from 'dayjs';

function BookingMenu({selectedRoute, hotel, sendApplicationForBooking}) {
    const[seatsNumber, setSeatsNumber] = useState(1);
    const[isOpenSentBookingForm, setIsOpenSentBookingForm] = useState(false);

    console.log(selectedRoute);

    const getTransportImage = (id) => {
        switch (id) {
            case 1:
                return airplane;
            case 2:
                return bus;
            case 3:
                return ship;
            default:
                return airplane;
        }
    };

	return (
        <div className="booking-menu">
            <div className='tour-price-and-seats-number'>
                <div className='tour-price'>
                    <b>{selectedRoute.price * seatsNumber}</b>
                    <span>BYN</span>
                </div>
            </div>
            
            <div class="main-booking-parametrs-container">
                <table class="main-booking-parametrs">
                    <tr>
                        <td style={{borderRadius: '10px 0px 0px 0px', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            Дата отправления<br/>
                            <input disabled  type="date" value={dayjs(selectedRoute.landingDateAndTimeOfReturn).format("YYYY-MM-DD")}/>
                        </td>
                        <td style={{borderRadius: '0px 10px 0px 0px'}}>
                            Дата возвращение<br/>
                            <input disabled  type="date" value={dayjs(selectedRoute.arrivalDateAndTimeOfReturn).format("YYYY-MM-DD")}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{borderRadius: '0px 0px 0px 10px'}}>
                            Отправление<br/>
                            <div className="destination">{selectedRoute.departmentDeparture.city}</div>
                        </td>
                        <td style={{borderRadius: '0px 0px 10px 0px', borderLeft: '1px solid black', borderTop: '1px solid black'}}>
                            Прибытие<br/>
                            <div className="destination">{hotel.city}</div>
                        </td>
                    </tr>
                </table>
            </div>

            <button className="tour-application-button" onClick={() => setIsOpenSentBookingForm(true)}>
                <b>Заявка на тур</b>
            </button>
            
            <div className='routes-info'>
                <div>
                    <img src={getTransportImage(selectedRoute.transportType.id)}/>
                    <div className='route-date-and-time'>
                        <div>{dayjs(selectedRoute.arrivalDateAndTimeOfDeparture).format("HH:mm")} - {dayjs(selectedRoute.landingDateAndTimeOfDeparture).format("HH:mm")}</div>
                        <div>{dayjs(selectedRoute.landingDateAndTimeOfDeparture).format("DD.MM.YYYY")}</div>
                        <div>{dayjs(selectedRoute.arrivalDateAndTimeOfDeparture).format("DD.MM.YYYY") }</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>{selectedRoute.departmentDeparture.city} - {hotel.city}</div>
                    </div>
                </div>
                {/* <hr></hr> */}
                <div>
                    <img src={getTransportImage(selectedRoute.transportType.id)}/>
                    <div className='route-date-and-time'>
                        <div>{dayjs(selectedRoute.arrivalDateAndTimeOfReturn).format("HH:mm")} - {dayjs(selectedRoute.landingDateAndTimeOfReturn).format("HH:mm")}</div>
                        <div>{dayjs(selectedRoute.landingDateAndTimeOfDeparture).format("DD.MM.YYYY")}</div>
                        <div>{dayjs(selectedRoute.arrivalDateAndTimeOfReturn).format("DD.MM.YYYY")}</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>{hotel.city} - {selectedRoute.departmentDeparture.city}</div>
                    </div>
                </div>
            </div>

            <Modal className='sent-booking-form-modal' open={isOpenSentBookingForm} onClose={() => setIsOpenSentBookingForm(false)} >
				<SentBookingForm roomTypes={hotel.roomTypes} selectedRoute={selectedRoute} closeModal={() => setIsOpenSentBookingForm(false)}/>
			</Modal>
        </div>
	);
}

export default BookingMenu;