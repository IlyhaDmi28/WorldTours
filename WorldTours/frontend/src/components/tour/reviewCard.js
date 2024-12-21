function ReviewCard({ review }) {
	return (
	    <div className='tour-review-card'>
			<div className='tour-review-card-user'>
				<b>{review.userName} {review.userSurname}</b>
			</div>
			<div className='tour-review-card-text'>
				{review.reviewText}
			</div>
		</div>
  	);
}

export default ReviewCard;