import Month from './month';
import january from '../../img/Months/january.jpg';
import february from '../../img/Months/february.jpg';

function Months({ setMonth }) {
	const month = {
		img: january,
		name: 'Январь'
	};

	return (
		<div className="months">
			<div>
				<Month name={'Январь'} img={january} setMonth={() => setMonth(0)}/>
				<Month name={'Февраль'} img={january} setMonth={() => setMonth(1)}/>
				<Month name={'Март'} img={january} setMonth={() => setMonth(2)}/>
				<Month name={'Апрель'} img={january} setMonth={() => setMonth(3)}/>
				<Month name={'Май'} img={january} setMonth={() => setMonth(4)}/>
				<Month name={'Июнь'} img={january} setMonth={() => setMonth(5)}/>
				<Month name={'Июль'} img={january} setMonth={() => setMonth(6)}/>
				<Month name={'Август'} img={january} setMonth={() => setMonth(7)}/>
				<Month name={'Сентябрь'} img={january} setMonth={() => setMonth(8)}/>
				<Month name={'Октябрь'} img={january} setMonth={() => setMonth(9)}/>
				<Month name={'Ноябрь'} img={january} setMonth={() => setMonth(10)}/>
				<Month name={'Декабрь'} img={january} setMonth={() => setMonth(11)}/>
			</div>
		</div>
	);
}

export default Months;
