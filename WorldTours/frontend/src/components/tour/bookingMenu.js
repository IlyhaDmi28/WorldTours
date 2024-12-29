import { useState } from "react";
import airplane from "../../img/airplane.svg"
import bus from "../../img/bus.svg"
import ship from "../../img/ship.svg"

function BookingMenu({selectedRoute, direction, sendApplicationForBooking}) {
    const[seatsNumber, setSeatsNumber] = useState(1);

    console.log(selectedRoute);
    const convertDateToInputFormat = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

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

                <div className='tour-seats-number'>
                    Осталось мест: <b>{selectedRoute.seatsNumber}</b>
                </div>
            </div>
            
            <div class="main-booking-parametrs-container">
                <table class="main-booking-parametrs">
                    <tr>
                        <td style={{borderRadius: '10px 0px 0px 0px', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            Дата отправления<br/>
                            <input disabled  type="date" value={convertDateToInputFormat(selectedRoute.landingDateOfDeparture)}/>
                        </td>
                        <td style={{borderRadius: '0px 10px 0px 0px'}}>
                            Дата возвращение<br/>
                            <input disabled  type="date" value={convertDateToInputFormat(selectedRoute.arrivalDateOfReturn)}/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{borderRadius: '0px 0px 0px 10px'}}>
                            Отправление<br/>
                            <div className="destination">{selectedRoute.departmentDeparture.city}</div>
                        </td>
                        <td style={{borderRadius: '0px 0px 10px 0px', borderLeft: '1px solid black', borderTop: '1px solid black'}}>
                            Прибытие<br/>
                            <div className="destination">{direction.city}</div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="people-count">
                <div>Количество людей:</div>
                <input type="number" min={1} max={selectedRoute.seatsNumber} value={seatsNumber} onChange={(e) => setSeatsNumber(e.target.value)}/>
            </div>

            <button className="tour-application-button" onClick={() => sendApplicationForBooking(seatsNumber)}>
                <b>Заявка на тур</b>
            </button>
            
            <div className='routes-info'>
                <div>
                    <img src={getTransportImage(selectedRoute.transportType.id)}/>
                    <div className='route-date-and-time'>
                        <div>{selectedRoute.arrivalTimeOfDeparture} - {selectedRoute.landingTimeOfDeparture}</div>
                        <div>{selectedRoute.landingDateOfDeparture}</div>
                        <div>{selectedRoute.arrivalDateOfDeparture}</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>{selectedRoute.departmentDeparture.city} - {direction.city}</div>
                    </div>
                </div>
                {/* <hr></hr> */}
                <div>
                    <img src={getTransportImage(selectedRoute.transportType.id)}/>
                    <div className='route-date-and-time'>
                        <div>{selectedRoute.arrivalTimeOfReturn} - {selectedRoute.landingTimeOfReturn}</div>
                        <div>{selectedRoute.landingDateOfReturn}</div>
                        <div>{selectedRoute.arrivalDateOfReturn}</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>{direction.city} - {selectedRoute.departmentDeparture.city}</div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default BookingMenu;