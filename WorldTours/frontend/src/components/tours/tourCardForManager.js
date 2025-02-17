import { useState } from 'react';
import { Link } from 'react-router-dom';
import noPhoto from '../../img/noPhoto.png';
import star from '../../img/star.svg'
import close from '../../img/close.svg'

function TourCardForManager({ tour, deleteTour }) {
    const [isHovered, setIsHovered] = useState(false);

	return (
	    <Link className="tour-card-for-editor" to={`/tour_editor/${tour.id}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {isHovered && 
               	<button className="tour-card-for-editor-delete-button" onClick={(e)=>{e.preventDefault(); deleteTour(tour)}}>
                   <img src={close}/>
                </button>
            }

            <img className="tour-card-for-editor-img" src={tour.photoUrl === "" ? noPhoto : tour.photoUrl}/>
            <div className="tour-card-for-editor-info">
                <div className='tour-card-for-editor-name'><b>{tour.name}</b></div>

                <div className="tour-card-for-editor-country-and-city">
                    {tour.country}, {tour.city}
                </div>

                <div className="tour-card-for-editor-hotel-stars">
                    {Array(tour.starsNumber).fill().map((_, i) => <img src={star} key={i}/>)}
                </div>
            </div>
        </Link>
  	);
}

export default TourCardForManager;