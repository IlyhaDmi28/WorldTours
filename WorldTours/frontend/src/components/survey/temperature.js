function Temperature({ name, img, setTemperature }) {
	return (
		<button className="temperature" onClick={setTemperature}>
			<div>
				<img src={img}/>
			</div>
			<div className="temperature-name">
				<b>{name}</b>
			</div>
		</button>
	);
}

export default Temperature;
