import '../styles/campany.scss';
import Header from '../components/general/header';
import logo from '../img/logo.png';
import team from '../img/team.jpg';

function Campany() {
	return (
		<div className="campany narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className="header-info">О КОМПАНИИ</div>
            <div className='campany-info'>
                <div>
                    <div>
                        Наша компания World Tours работает уже 10 лет! За это время мы обрели бесценный опыт взаимодейтсвия с клиентами.
                        Мы организуем различные туры в разные места на нашей планете. По качеству организации туров мы получаем 
                        множество положительных отзывов.
                    </div>

                    <div className='logo-info'>
                        <img src={logo}/>
                        <br></br>
                        <b className='logo-text'>World Tours</b>
                    </div>
                    
                    <br/>
                    <div>
                        У нас работают вежливые и оптыные сотрудники. Связавшись с ними, или придя в наше турагенство, они качествено вас опросят
                        и подберут необходимый вам тур по вашему описанию. Так же вы можете подобрать себе туры, пройдя опрос на нашем сайте. Для 
                        этого, в шапке сайта, вам необходимо перейти по "Куда поехать?". Наша команда представленна на рисунке ниже!
                    </div>

                    <div className='command-photo'>
                        <img src={team}/>
                    </div>
                    <br/>
                    <div>
                        Мы сотрудничаем со многими отелями и транспротынми компаниями по всему миру, поэтому наше турагенство может организовыват 
                        совершенно разные туры во все уголки нашей планеты!
                    </div>
                </div>
                {/* <img src={Money}/> */}
            </div>
		</div>
	);
}

export default Campany;
