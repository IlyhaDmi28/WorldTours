import '../styles/tours-for-editor.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/general/header';
import TourType from '../components/tours/tourType'
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import TourTypesNavForManager from '../components/tours/tourTypesNavForManager';
import TourCardForManager from '../components/tours/tourCardForManager';
import all from '../img/all.svg'
const token = localStorage.getItem("token");

function ToursForEditor() {
	const authUser = useSelector((state) => state.authUser.value)
	const [tourTypes, setTourTypes] = useState([]); 
	const [tours, setTours] = useState([{
		id: 0,
		photoUrl: "",
		name: 'dsfsd',
		country: 'Беларусь',
		city: 'Дрогичини',
		starsNumber: 3
	}])
	const [selectedTourType, setSelectedTourType] = useState(0);

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get('https://localhost:7276/tour/tours_for_editor', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const toursData = response.data;
				console.log(toursData);
				setTours(toursData);

				response = await axios.get('https://localhost:7276/tour/tour_types', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
				const typesData = response.data;
				console.log(typesData);
				setTourTypes(typesData);
            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const deleteTour = async (deletedTour) => {
		if(authUser.blockedStatus) {
			alert("Вы не можете удалить тур, так как ваш профиль был заблокирован!");
			return;
		}

        await axios.delete(`https://localhost:7276/tour/delete?tourId=${deletedTour.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

		setTours(tours.filter(tour => tour !== deletedTour))
	}

	return (
		<div className="tours-for-editor narrow-conteiner">
			<Header SearchInputComponent={<input  type='text' placeholder='Поиск'/>} AddButtonComponent={<button><Link to='/tour_editor/0'><b>Добавить тур</b></Link></button>}/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='tours-filters-parametrs'>
					<button className='select-tour-direction'>
						Выберите месторасположение
						<div>Страна, город</div>
					</button>
					<div className="tour-types-filter">
						{/* <button className='tour-types-nav-page-button'>B</button> */}

						<div className="tour-types-list">
							<TourType tourType={{name: 'Все туры', imageUrl: all}}/>
							{tourTypes.map((tourType) => (<TourType tourType={tourType}/>))}
						</div>
							
						{/* <button className='tour-types-nav-page-button'>N</button> */}
					</div>

					{/* <div className="tour-type-list-on-filter">
						<img src={airplane}/>
						<img src={bus}/>
						<img src={ship}/>
					</div> */}
					
					<div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div>
				</div>
				<div className="tours-for-editor-list">
					{tours.map((tour) => (<TourCardForManager tour={tour} deleteTour={deleteTour} />))}
				</div>
			</main>
			{/* <TourTypesNavForManager setTours={setTours} setSelectedTourType={setSelectedTourType} selectedTourType={selectedTourType}/>
			<div className="tours-list">
				{tours.map((tour) => (<TourCardForManager tour={tour} deleteTour={deleteTour} />))}
			</div> */}
		</div>
	);
}

export default ToursForEditor;
