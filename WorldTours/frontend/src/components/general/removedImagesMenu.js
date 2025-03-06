import '../../styles/general.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import star from '../../img/star.svg'
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import darkStar from '../../img/dark-star.svg'
import close from '../../img/close.svg'
const token = localStorage.getItem("token");

function RemovedImagesMenu({images, setImages, setRemovedImages, closeModal}) {    
    const saveRoomType = () => {
        // console.log(roomType); 
        // setRoomTypes([...roomTypes, roomType]);
    };

    const clearRoute = () => {
        
    };

    return (
        <div className="removed-images-menu">
            <button className="close-edit-route-menu-button" onClick={closeModal}>
                <img src={close}/>
            </button>

            <h2>Выберите изображения</h2>

            <div className='removed-images-list'>
                {images.map(image => (
                    <img src={image}/>
                ))}
                {images.map(image => (
                    <img src={image}/>
                ))}
            </div> 

            <hr></hr>

            <div className='room-type-editor-controller'>{/*комп*/}
                <button onClick={clearRoute}>Очистить всё</button>
                <button onClick={saveRoomType}>Сохранить</button>
            </div>
        </div>
    );
}

export default RemovedImagesMenu;
