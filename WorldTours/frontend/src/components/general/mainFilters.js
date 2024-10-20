import search from '../../img/search.svg'

function MainFilters() {
	return (
	    <div className="main-filters"> 
            <div className="input-route">
                <div>Выберите направление</div>
                <div>Регион, страна, город</div>
            </div>
            <hr></hr>
            <div className="input-date">
                <div>Прибытие</div>
                <input type="date"/>
            </div>
            <hr></hr>
            <div className="input-date">
                <div>Убытие</div>
                <input type="date"/>
            </div>
            <hr></hr>
            <div className="input-transport">
                <div>Выбирете транспорт</div>
                <select>
                    <option selected="selected">Вид</option>
                    <option>Самолёт</option>
                    <option>Автобус</option>
                    <option>Поезд</option>
                </select>
            </div>

            <button className='search-by-main-filters'>
                <img src={search}/>
            </button>
        </div>
  	);
}

export default MainFilters;