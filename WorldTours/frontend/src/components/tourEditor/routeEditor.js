import close from '../../img/close.svg';

function RouteEditor({ closeRouteEditor }) {
	return (
        <div className="route-editor-overlay" onClick={handleOverlayClick}>
            <div className="route-editor">
                <button className="close-filters-button" onClick={closeRouteEditor}>
                    <img src={close}/>
                </button>
                <h2>Добавить тур</h2>
            </div>
        </div>
	);
}

export default RouteEditor;