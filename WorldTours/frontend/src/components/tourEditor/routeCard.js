import React, { useState } from 'react';
import delete2 from '../../img/delete2.svg';

function RouteCard({directionInfo, route, deleteRoute}) {
    const [isHovered, setIsHovered] = useState(false);

	return (
        <div className="route-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="route-card-directions">
                <div className="route-card-direction">
                    <div className="route-card-direction-type">Отправление</div>
                    <div>
                        <div className="route-card-direction-info">
                            <div>
                                <div>{route.departmentDeparture.country}, {route.departmentDeparture.city}</div>
                                <div>{route.landingDateOfDeparture}, {route.landingTimeOfDeparture}</div>
                            </div>
                            &#8594;
                            <div>
                                
                                <div>{directionInfo.country !== null ? directionInfo.country : "Страна не выбрана"}, {directionInfo.city !== null ? directionInfo.city : "Город не выбран"}</div>
                                <div>{route.arrivalDateOfDeparture}, {route.arrivalTimeOfDeparture}</div>
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
                                <div>{route.arrivalDateOfReturn}, {route.arrivalTimeOfReturn}</div>
                            </div>
                            &#8592;
                            <div>
                                <div>{directionInfo.country !== null ? directionInfo.country : "Страна не выбрана"}, {directionInfo.city !== null ? directionInfo.city : "Город не выбран"}</div>
                                <div>{route.landingDateOfReturn}, {route.landingTimeOfReturn}</div>
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
                    <div>Кол. мест: {route.places}</div>
                </div>

                <div className="route-card-price-or-places">
                    <div><b>Цена: {route.price}</b> <span>BYN</span></div>
                </div>
            </div>

            {isHovered && 
                <button className="delete-route-card-button" onClick={deleteRoute}>
                    <img src={delete2}/>
                </button>
            }
            
        </div>
	);
}

export default RouteCard;