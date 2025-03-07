import { useState, useEffect  } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';

function ModalImageGallery({ index, images, setImages, closeModal }) {
  	const [indexOfSelectedImage, setIndexOfSelectedImage] = useState(index);

  	const goBackImage = () => {
		setIndexOfSelectedImage((prevIndex) => 
			prevIndex > 0 ? prevIndex - 1 : prevIndex
		);
	};
	
	const goNextImage = () => {
		setIndexOfSelectedImage((prevIndex) => 
			prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

  	useEffect(() => {
    	const handleKeyDown = (event) => {
			if (event.key === "ArrowRight") {
				goNextImage();
			}
			if (event.key === "ArrowLeft") {
				goBackImage();
			}
			if (event.key === "Escape") {
				closeModal(event); 
			}
    	};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
  	}, []);

  return (
    <div className="modal-image-gallery" onClick={closeModal}>
		<div className="image-gallery" onClick={closeModal}> 
			<div className="showed-image" onClick={closeModal}>
				<ArrowBackIosNewIcon 
					className="arrow-navigation-image-gallery" 
					onClick = {goBackImage}
					style={{
						marginRight: '10px',
						visibility: indexOfSelectedImage === 0 ? 'hidden' : 'visible'
					}}
				/>
				<img src={images[indexOfSelectedImage]} alt="Full Size" />
				<ArrowForwardIosIcon 
					className="arrow-navigation-image-gallery"
					onClick = {goNextImage}
					style={{
						marginLeft: '10px',
						visibility: indexOfSelectedImage === images.length - 1 ? 'hidden' : 'visible'
					}}
				/>
			</div>
			<div className="image-gallery-list">
				{images.map((image, i) => (<img src={image} onClick={() => {setIndexOfSelectedImage(i);  }}/>))}
			</div>
			{setImages !== undefined &&
			 	<DeleteIcon
					className='image-gallery-delete-button' 
					onClick={(e) => { 
						setImages(
							images.filter((_, i) => i !== indexOfSelectedImage)
						)

						if(images.length - 1 === 0) closeModal(e);
						if(indexOfSelectedImage === images.length - 1) setIndexOfSelectedImage(images.length - 2);
					}}
				/>
			}
		</div>
    </div>
  );
}

export default ModalImageGallery;