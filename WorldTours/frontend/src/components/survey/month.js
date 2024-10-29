function Month({ name, img, setMonth }) {
	return (
		<button className="month" onClick={setMonth}>
			<div>
				<img src={img}/>
			</div>
			<div className="month-name">
				<b>{name}</b>
			</div>
		</button>
	);
}

export default Month;
