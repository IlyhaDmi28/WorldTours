import Temperature from './temperature';
import january from '../../img/Months/january.jpg';
import february from '../../img/Months/february.jpg';

function Temperatures({ setTemperature, goBack }) {
	const month = {
		img: january,
		name: 'Январь'
	};

	return (
		<div className="temperatures">
			<div>
				<Temperature name={'Холодно'} img={january} setTemperature={() => setTemperature(0)}/>
				<Temperature name={'Прохладно'} img={january} setTemperature={() => setTemperature(1)}/>
				<Temperature name={'Тепло'} img={january} setTemperature={() => setTemperature(2)}/>
				<Temperature name={'Жарко'} img={january} setTemperature={() => setTemperature(3)}/>
			</div>
			<div className="question-buttons">
				<button>Не имеет значения</button>
				<br/>
				<br/>
				<button onClick={goBack}>Назад</button>
			</div>
		</div>
	);
}

export default Temperatures;
