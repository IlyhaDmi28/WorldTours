import { useState } from "react";

function ModalImageGallery({ indexOfSelectedImage, images, handleOverlayClick }) {
  const [selectedImage, setSelectedImage] = useState(images[indexOfSelectedImage]);

  return (
    <div className="modal-image-gallery" onClick={handleOverlayClick}>
		<div className="image-gallery" onClick={handleOverlayClick}> 
			<img className="showed-image" src={selectedImage} alt="Full Size" />
			<div className="image-gallery-list">
				{images.map((image, i) => (<img src={image} onClick={() => setSelectedImage(images[i])}/>))}
			</div>
		</div>
    </div>
  );
}

export default ModalImageGallery;