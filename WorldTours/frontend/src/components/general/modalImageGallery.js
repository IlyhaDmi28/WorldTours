import { useState, useEffect  } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';

function ModalImageGallery({ index, images, setImages, handleOverlayClick }) {
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
				goNextImage(); // Здесь можно вызвать функцию, например, для перелистывания слайдера
			}
			if (event.key === "ArrowLeft") {
				goBackImage(); // Здесь можно вызвать функцию, например, для перелистывания слайдера
			}
			if (event.key === "Escape") {
				handleOverlayClick(event); // Здесь можно вызвать функцию, например, для перелистывания слайдера
			}
    	};

		// Добавляем слушатель события
		window.addEventListener("keydown", handleKeyDown);

		// Убираем слушатель при размонтировании компонента
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
  	}, []);

  return (
    <div className="modal-image-gallery" onClick={handleOverlayClick}>
		<div className="image-gallery" onClick={handleOverlayClick}> 
			<div className="showed-image" onClick={handleOverlayClick}>
				<ArrowBackIosNewIcon 
					className="arrow-imagel-gallery" 
					onClick = {goBackImage}
					style={{
						marginRight: '10px',
						visibility: indexOfSelectedImage === 0 ? 'hidden' : 'visible'
					}}
				/>
				<img src={images[indexOfSelectedImage]} alt="Full Size" />
				<ArrowForwardIosIcon 
					className="arrow-imagel-gallery"
					onClick = {goNextImage}
					style={{
						marginLeft: '10px',
						visibility: indexOfSelectedImage === images.length - 1 ? 'hidden' : 'visible'
					}}
				/>
			</div>
			{/* <img className="showed-image" src={selectedImage} alt="Full Size" /> */}
			<div className="image-gallery-list">
				{images.map((image, i) => (<img src={image} onClick={() => {setIndexOfSelectedImage(i);  }}/>))}
			</div>
			{setImages !== undefined &&
			 	<DeleteIcon
					className='image-delete-button' 
					onClick={(e) => { 
						setImages(
							images.filter((_, i) => i !== indexOfSelectedImage)
						)

						if(images.length - 1 === 0) handleOverlayClick(e);
						if(indexOfSelectedImage === images.length - 1) setIndexOfSelectedImage(images.length - 2);
					}
				}
				/>
			}
		</div>
    </div>
  );
}

export default ModalImageGallery;