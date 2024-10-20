import airplane from "../../img/airplane.svg"

function BookingMenu() {
	return (
        <div className="booking-menu">
            <div className='tour-price'>
                <b>1900</b>
                <span>BYN</span>
            </div>

            <div class="main-booking-parametrs-container">
                <table class="main-booking-parametrs">
                    <tr>
                        <td style={{borderRadius: '10px 0px 0px 0px', borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            Прибытие<br/>
                            <input type="date"/>
                        </td>
                        <td style={{borderRadius: '0px 10px 0px 0px'}}>
                            Убытие<br/>
                            <input type="date"/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{borderRadius: '0px 0px 0px 10px'}}>
                            Отправление<br/>
                            <select>
                                <option>Россия</option>
                                <option>США</option>
                                <option>Германия</option>
                                <option>Франция</option>
                            </select>
                        </td>
                        <td style={{borderRadius: '0px 0px 10px 0px', borderLeft: '1px solid black', borderTop: '1px solid black'}}>
                            Прибытие<br/>
                            <div className="destination">Россия</div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="people-count">
                <div>Количество людей:</div>
                <input type="number"/>
            </div>

            <button className="tour-application-button">
                <b>Заявка на тур</b>
            </button>
            
            <div className='routes-info'>
                <div>
                    <img src={airplane}/>
                    <div className='route-date-and-time'>
                        <div>00:35 - 08:00</div>
                        <div>14 октября</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>Минск- Ебеня</div>
                        <div>6 ч 25 мин</div>
                    </div>
                </div>
                {/* <hr></hr> */}
                <div>
                    <img src={airplane}/>
                    <div className='route-date-and-time'>
                        <div>00:35 - 08:00</div>
                        <div>14 октября</div>
                    </div>
                    <div className='route-city-and-duration'>
                        <div>Минск- Ебеня</div>
                        <div>6 ч 25 мин</div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default BookingMenu;