import React, { useState } from 'react';
import RouteCard from "./routeCard";
import RouteEditor from "./routeEditor";
import Modal from '@mui/material/Modal';
import add from "../../img/add.svg"

function RoutesMenu({directionInfo, routes, setRoutes, saveTour}) {
    const [isOpenRouteEditor, setIsOpenRouteEditor] = useState(false);
    const [indexOfSelectedRoute, setIndexOfSelectedRoute] = useState(-1);

    const openRouteEditor = (index) => {
        setIndexOfSelectedRoute(index);
        setIsOpenRouteEditor(true);
    }

    const closeRouteEditor = () => {
        setIndexOfSelectedRoute(-1);
        setIsOpenRouteEditor(false);
    }

	return (
        <div className="routes-menu">
            <div className="routes-menu-name-and-add-route-button">
                <b>Маршруты:</b>
                <button  onClick={() => setIsOpenRouteEditor(true)}>
                    <img src={add}/>
                </button>
            </div>

            <div className="routes-list">
                {routes.map((route, index) => (<RouteCard directionInfo={directionInfo} openRouteEditor={() => openRouteEditor(index)}  route={route} deleteRoute={() => setRoutes(routes.filter((_, i) => i !== index))}/>))}
            </div>

            <div className="buttons-under-routes">
                <button className="save-routes-button" onClick={saveTour}>
                    <b>Сохранить тур</b>
                </button>
            </div>
            
            <Modal className='route-editor-modal' open={isOpenRouteEditor} onClose={closeRouteEditor} >
                <RouteEditor indexOfSelectedRoute={indexOfSelectedRoute} routes={routes} setRoutes={setRoutes} closeModal={closeRouteEditor}/>
			</Modal>

        </div>
	);
}

export default RoutesMenu;