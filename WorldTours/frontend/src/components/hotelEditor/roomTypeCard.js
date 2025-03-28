import React, { useState } from 'react';
import delete2 from '../../img/delete2.svg';

function RoomTypeCard({roomType, deleteRoomType, openRoomTypeEditor}) {
    const [isHovered, setIsHovered] = useState(false);

	return (
        <div className="room-type-card" onClick={openRoomTypeEditor} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className='room-type-card-name'><b>{roomType.name}</b></div>
            <div className='room-type-card-info'>
                <div>Мест: {roomType.seatsNumber}</div>
                <div>Количество: {roomType.roomsNumber}</div>
                <div>Цена: {roomType.price} BYN</div>
            </div>

            {isHovered && 
                <button className="delete-room-type-card-button" onClick={(e) => {e.stopPropagation(); deleteRoomType()}}>
                    <img src={delete2}/>
                </button>
            }
        </div>
	);
}

export default RoomTypeCard;