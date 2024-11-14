import React, { useState } from 'react';
import delete2 from '../../img/delete2.svg';

function RouteCard() {
    const [isHovered, setIsHovered] = useState(false);

	return (
        <div className="route-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="route-card-directions">
                <div className="route-card-direction">
                    <div className="route-card-direction-type">Отправление</div>
                    <div>
                        <div className="route-card-direction-info">
                            <div>
                                <div>Страна, город</div>
                                <div>31.01.2025, 08:00</div>
                            </div>
                            &#8594;
                            <div>
                                <div>Страна, город</div>
                                <div>31.01.2025, 08:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="route-card-direction">
                    <div className="route-card-direction-type">Возвращение</div>
                    <div>
                        <div className="route-card-direction-info">
                            <div>
                                <div>Страна, город</div>
                                <div>31.01.2025, 08:00</div>
                            </div>
                            &#8592;
                            <div>
                                <div>Страна, город</div>
                                <div>31.01.2025, 08:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className="route-card-info">
                <div className="route-card-transport">
                    <div>Тип транспорта:</div>
                    <div>Самолёт</div>
                </div>

                <div className="route-card-price-or-places">
                    <div>Кол. мест: 143</div>
                </div>

                <div className="route-card-price-or-places">
                    <div><b>Цена: 1488</b> <span>BYN</span></div>
                </div>
            </div>

            {isHovered && 
            <button className="delete-route-card-button">
                <img src={delete2}/>
            </button>
            }
            
        </div>
	);
}

export default RouteCard;