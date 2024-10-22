import Month from './month';
import january from '../../img/Months/january.jpg';

function Months() {
	const month = {
		img: january,
		name: 'Январь'
	};

	return (
		<div className="months">
			<Month month={{ img: january, name: 'Январь'}}/>
			<Month month={{ img: january, name: 'Февраль'}}/>
			<Month month={{ img: january, name: 'Март'}}/>
			<Month month={{ img: january, name: 'Апрель'}}/>
			<Month month={{ img: january, name: 'Май'}}/>
			<Month month={{ img: january, name: 'Июнь'}}/>
			<Month month={{ img: january, name: 'Июль'}}/>
			<Month month={{ img: january, name: 'Август'}}/>
			<Month month={{ img: january, name: 'Сентябрь'}}/>
			<Month month={{ img: january, name: 'Октябрь'}}/>
			<Month month={{ img: january, name: 'Ноябрь'}}/>
			<Month month={{ img: january, name: 'Декабрь'}}/>
		</div>
	);
}

export default Months;
