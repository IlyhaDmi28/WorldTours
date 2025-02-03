import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import delete2 from '../../img/delete2.svg'

function ReviewCardForEitor({ review, deleteReview }) {
	const [isHovered, setIsHovered] = useState(false);
    const authUser = useSelector((state) => state.authUser.value);

	return (
	    <div className='tour-review-card' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{(isHovered && authUser.role === 3) &&
               	<button className='tour-review-card-delete-button' onClick={() => deleteReview(review.id)}>
			   		<img src={delete2}/>
		   		</button>
            }
			
			<div className='tour-review-card-user'>
				<b>{review.userName} {review.userSurname}</b>
			</div>
			<div className='tour-review-card-text'>
				{review.reviewText}
			</div>
		</div>
  	);
}

export default ReviewCardForEitor;