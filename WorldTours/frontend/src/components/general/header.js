import logo from '../../img/logo.png';
import account from '../../img/account.svg';
import MainFilters from './mainFilters';

function Header() {
	return (
	    <header>
            <a className='logo-href' href='/tours'>
                <img src={logo} alt="logo" />
            </a>
            <div className="info-and-main-filters">
                <div className="info-href">
                    <a>О компнаии</a>
                    <a>Оплата</a>
                    <a href="/survey">Куда поехать?</a>
                </div>
                <MainFilters/>
            </div>
            <button className="user">
                <img src={account}/>
            </button>
        </header>
  	);
}

export default Header;