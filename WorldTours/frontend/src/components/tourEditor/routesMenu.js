import React, { useState } from 'react';
import RouteCard from "./routeCard";
import EditRouteMenu from "./editRouteMenu";
import add from "../../img/add.svg"

function RoutesMenu({openAddRouteMenu}) {
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
            </div>

            <div className="buttons-under-routes">
                <button className="save-routes-button">
                    <b>Сохранить тур</b>
                </button>
            </div>
            
			<EditRouteMenu isEditRouteMenuOpen={isEditRouteMenuOpen} closeEditRouteMenu={closeEditRouteMenu} />

        </div>
	);
}

export default RoutesMenu;