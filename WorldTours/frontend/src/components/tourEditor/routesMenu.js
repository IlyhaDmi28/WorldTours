import React, { useState } from 'react';
import RouteCard from "./routeCard";
import EditRouteMenu from "./editRouteMenu";
import add from "../../img/add.svg"

function RoutesMenu({directionInfo, routes, setRoutes}) {
    const [isEditRouteMenuOpen, setIsEditRouteMenuOpen] = useState(false);

    // Функция для открытия модального окна
	const openEditRouteMenu = () => {
		setIsEditRouteMenuOpen(true);
		document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
	};

	// Функция для закрытия модального окна
	const closeEditRouteMenu = () => {
		setIsEditRouteMenuOpen(false);
		document.body.style.overflow = 'auto'; // Включаем прокрутку страницы обратно
	};

	return (
        <div className="routes-menu">
            <div className="routes-menu-name-and-add-route-button">
                <b>Маршруты:</b>
                <button  onClick={openEditRouteMenu}>
                    <img src={add}/>
                </button>
            </div>

            <div className="routes">
                {routes.map((route, index) => (<RouteCard directionInfo={directionInfo} route={route} deleteRoute={() => setRoutes(routes.filter((_, i) => i !== index))}/>))}
            </div>

            <div className="buttons-under-routes">
                <button className="save-routes-button">
                    <b>Сохранить тур</b>
                </button>
            </div>
            
			<EditRouteMenu routes={routes} setRoutes={setRoutes} isEditRouteMenuOpen={isEditRouteMenuOpen} closeEditRouteMenu={closeEditRouteMenu} />

        </div>
	);
}

export default RoutesMenu;