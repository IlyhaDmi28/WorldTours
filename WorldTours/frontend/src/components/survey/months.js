import january from '../../img/Months/january.jpg';

function Month() {
	return (
		<div className="months">
			<button className="month">
					<div>
						<img src={january}/>
					</div>
					<div>
						<b>Январь</b>
					</div>
			</button>
		</div>
	);
}

export default Month;
