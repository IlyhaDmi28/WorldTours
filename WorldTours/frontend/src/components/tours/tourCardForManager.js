import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating  } from "@mui/material";
import noPhoto from '../../img/noPhoto.png';
import close from '../../img/close.svg'

function TourCardForManager({ tour, deleteTour }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <Link className="tour-for-editor-card" to={`/tour_editor/${tour.id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img className="tour-for-editor-card-img" src={tour.photoUrl === "" ? noPhoto : tour.photoUrl}/>
            <div className='tour-for-editor-card-name'>
                <b>{tour.name}
            </b></div>

            <div className="tour-for-editor-card-direction">
                {tour.country}, {tour.city}
            </div>

            <Rating 
				className="tour-for-editor-card-hotel-stars" 
				name="starsNumber" 
				defaultValue={tour.starsNumber} 
				precision={1}
                readOnly 
			/>

            {isHovered && 
               	<button className="tour-for-editor-card-delete-button" onClick={(e)=>{e.preventDefault(); deleteTour(tour)}}>
                   <img src={close}/>
                </button>
            }
        </Link>
  	);
}

export default TourCardForManager;