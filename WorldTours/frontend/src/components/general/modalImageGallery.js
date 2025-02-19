import { useState } from "react";

function ModalImageGallery({ indexOfSelectedImage, images }) {
  const [selectedImage, setSelectedImage] = useState(images[indexOfSelectedImage]);

  return (
    <div className="modal-image-gallery">
		<div className="image-gallery"> 
			<img className="showed-image" src={images[0]} alt="Full Size" />
			<div className="image-gallery-list">
				{images.map((image) => (<img src={image}/>))}
			</div>
		</div>
    </div>
  );
}

export default ModalImageGallery;