function Month({ month }) {
	return (
		<button className="month">
			<div>
				<img src={month.img}/>
			</div>
			<div className="month-name">
				<b>{month.name}</b>
			</div>
		</button>
	);
}

export default Month;
