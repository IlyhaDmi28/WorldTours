import React, { useState } from 'react';
import RoomTypeCard from "./roomTypeCard";
import RoomTypeEditor from "./roomTypeEditor";
import Modal from '@mui/material/Modal';
import add from "../../img/add.svg"

function RoomTypesMenu({roomTypes, setRoomTypes, saveHotel}) {
    const [isOpenRouteEditor, setIsOpenRouteEditor] = useState(false);

	return (
        <div className="room-types-menu">
            <div className="room-types-menu-name-and-add-route-button">
                <b>Типы номеров:</b>
                <button onClick={() => setIsOpenRouteEditor(true)}>
                    <img src={add}/>
                </button>
            </div>

            <div className="room-types">
                {roomTypes.map((roomType, index) => (<RoomTypeCard roomType={roomType} deleteRoomType={() => {console.log('zzzzz'); setRoomTypes(roomTypes.filter((_, i) => i !== index))}}/>))}
            </div>

            <div className="buttons-under-room-types">
                <button className="save-room-types-button" onClick={saveHotel}>
                    <b>Сохранить отель</b>
                </button>
            </div>
            
			{/* <EditRouteMenu routes={routes} setRoutes={setRoutes} isEditRouteMenuOpen={isEditRouteMenuOpen} closeEditRouteMenu={closeEditRouteMenu} /> */}
            <Modal className='room-type-editor-modal' open={isOpenRouteEditor} onClose={() => setIsOpenRouteEditor(false)} >
				<RoomTypeEditor roomTypes={roomTypes} setRoomTypes={setRoomTypes} closeModal={() => setIsOpenRouteEditor(false)}/>
			</Modal>
        </div>
	);
}

export default RoomTypesMenu;