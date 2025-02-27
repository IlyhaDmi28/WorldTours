import { useState, useEffect } from "react";
import airplane from "../../img/airplane.svg"
import bus from "../../img/bus.svg"
import ship from "../../img/ship.svg"

function ImagesAndMap({images, showImages}) {
    const [mode, setMode] = useState('images');

    useEffect(() => {
        setMode(images.length > 0 ? 'images' : 'map');
    }, [images]); 

    const switchToImages = () => {
        setMode('images');
    };
    
    const switchToMap = () => {
        setMode('map');
    };

	return (
        <div className='images-and-map'>
			<div className='select-tour-images-or-map'>
				{images.length > 0 && <button style={{backgroundColor: mode === 'images' ? 'rgb(236, 236, 236)' : 'transparent'}} onClick={switchToImages}>Фото</button>}
				<button style={{backgroundColor: mode === 'map' ? 'rgb(236, 236, 236)' : 'transparent'}} onClick={switchToMap}>Карта</button>
			</div>

            {mode === 'images' && 
                <div className='other-tour-images'>
                    <div>
					    {images.slice(0, 6).map((image, i) => (<img src={image} onClick={() => showImages(i + 1)}/>))}
                    </div>
                    {images.length > 6 && <button className='more-tour-images-button' onClick={() => showImages(0)}>Показать больше ...</button>}
                </div>
            }

			{mode === 'map' && <iframe className='tour-map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d588.0220734032202!2d27.616216344539804!3d53.876858255031635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce18581d62a7%3A0xfbca977ea03db2c7!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDMyLzEsINCc0LjQvdGB0LosINCc0LjQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMIDIyMDEwNw!5e0!3m2!1sru!2sby!4v1739876954826!5m2!1sru!2sby" width="600" height="450" style={{border: '0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>}
		</div>
	);
}

export default ImagesAndMap;