import React, { useState } from 'react';

function RoomTypeCard({roomType, openRoomTypeEditor}) {
	return (
        <div className="room-type-card" onClick={openRoomTypeEditor}>
            <div className='room-type-card-name'><b>{roomType.name}</b></div>
            <div className='room-type-card-info'>
                <div>Мест: {roomType.seatsNumber}</div>
                <div>Количество: {roomType.roomsNumber}</div>
                <div>Цена: {roomType.price} BYN</div>
            </div>
        </div>
	);
}

export default RoomTypeCard;