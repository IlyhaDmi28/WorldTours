import logo from '../../img/logo.png';
import account from '../../img/account.svg';
import MainFilters from './mainFilters';

function SmallHeader() {
	return (
	    <header style={{height: '100px'}}>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <a>О компнаии</a>
                    <a>Оплата</a>
                    <a href="/survey">Куда поехать?</a>
                </div>
            </div>
            <button className="user">
                <img src={account}/>
            </button>
        </header>
  	);
}

export default SmallHeader;