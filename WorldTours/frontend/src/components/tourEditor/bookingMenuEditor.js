import React, { useState } from 'react';
import RouteCard from "./routeCard";
import EditRouteMenu from "./editRouteMenu";
import add from "../../img/add.svg"

function BookingMenuEditor({openAddRouteMenu}) {
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
        <div className="booking-menu">
            <div className="booking-menu-name">
                <b>Маршруты:</b>
                <button className="add-route-button" onClick={openEditRouteMenu}>
                    <img src={add}/>
                </button>
            </div>

            <div className="routes">
            </div>

            <div className="save-tour-button-under-routes">
                <button className="tour-application-button">
                    <b>Сохранить тур</b>
                </button>
            </div>
            
			<EditRouteMenu isEditRouteMenuOpen={isEditRouteMenuOpen} closeEditRouteMenu={closeEditRouteMenu} />

        </div>
	);
}

export default BookingMenuEditor;