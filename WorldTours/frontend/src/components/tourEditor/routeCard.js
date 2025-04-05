import React, { useState } from 'react';
import delete2 from '../../img/delete2.svg';
import dayjs from 'dayjs';

function RouteCard({directionInfo, route, deleteRoute, openRouteEditor}) {
    const [isHovered, setIsHovered] = useState(false);

	return (
        <div className="route-card" onClick={openRouteEditor} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="route-card-directions">
                <div className="route-card-direction">
                    <div className="route-card-direction-type">Отправление</div>
                    <div>
                        <div className="route-card-direction-info">
                            <div>
                                <div>{route.departmentDeparture.country}, {route.departmentDeparture.city}</div>
                                <div>{ dayjs(route.landingDateAndTimeOfDeparture).format("DD.MM.YYYY, HH:mm")}</div>
                            </div>
                            &#8594;
                            <div>
                                
                                <div>{directionInfo.country !== null ? directionInfo.country : "Страна не выбрана"}, {directionInfo.city !== null ? directionInfo.city : "Город не выбран"}</div>
                                <div>{ dayjs(route.arrivalDateAndTimeOfDeparture).format("DD.MM.YYYY, HH:mm")}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="route-card-direction">
                    <div className="route-card-direction-type">Возвращение</div>
                    <div>
                        <div className="route-card-direction-info">
                            <div>
                                <div>{route.departmentDeparture.country}, {route.departmentDeparture.city}</div>
                                <div>{ dayjs(route.arrivalDateAndTimeOfReturn).format("DD.MM.YYYY, HH:mm")}</div>
                            </div>
                            &#8592;
                            <div>
                                <div>{directionInfo.country !== null ? directionInfo.country : "Страна не выбрана"}, {directionInfo.city !== null ? directionInfo.city : "Город не выбран"}</div>
                                <div>{dayjs(route.landingDateAndTimeOfReturn).format("DD.MM.YYYY, HH:mm")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className="route-card-info">
                <div className="route-card-transport">
                    <div>Тип транспорта:</div>
                    <div>{route.transportType.name}</div>
                </div>

                <div className="route-card-price-or-places">
                    <div>Кол. мест: {route.seatsNumber}</div>
                </div>

                <div className="route-card-price-or-places">
                    <div><b>Цена: {route.price}</b> <span>BYN</span></div>
                </div>
            </div>

            {isHovered && 
                <button className="delete-route-card-button"  onClick={(e) => {e.stopPropagation(); deleteRoute()}}>
                    <img src={delete2}/>
                </button>
            }
            
        </div>
	);
}

export default RouteCard;