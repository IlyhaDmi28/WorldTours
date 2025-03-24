import '../styles/department-departures.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Header from '../components/general/header';
import DepartmentDepartureCard from '../components/departmentDepartures/departmentDepartureCard';
import DepartmentDepartureEditor from '../components/departmentDepartures/departmentDepartureEditor';
import airplane from '../img/airplane.svg'
import bus from '../img/bus.svg'
import ship from '../img/ship.svg'
const token = localStorage.getItem("token");

function DepartmentDepartures() {
	// const [filter, setFilter] = useState({
	// 	regionId: 0,
	// 	countryId: 0,
	// 	cityId: 0,
    //     minHotelStars: 1,
    //     maxHotelStars: 5,
	// });

	const [indexOfSelectedDepartmentDeparture, setIndexOfSelectedDepartmentDeparture] = useState(-1);
	const [isOpenDepartmentDepartureEditor, setIsOpenDepartmentDepartureEditor] = useState(false);
	
	const [departmentDepartures, setDepartmentDepartures] = useState([]);

	const openDepartmentDepartureEditor = (index) => {
        setIndexOfSelectedDepartmentDeparture(index);
        setIsOpenDepartmentDepartureEditor(true);
    }
    
    const closeDepartmentDepartureEditor = () => {
        setIndexOfSelectedDepartmentDeparture(-1);
        setIsOpenDepartmentDepartureEditor(false);
    }

	useEffect(() => {
		const getData = async () => {
            try {
				let response;
				response = await axios.get('https://localhost:7276/department_departure/department_departures', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                
                const departmentDeparturesData = response.data;
				console.log(departmentDeparturesData);
                setDepartmentDepartures(departmentDeparturesData);

            } catch (error) {
				console.error('Ошибка загрузки данных:', error);
            } 
        };

        getData();
	}, []);

	const deleteDepartmentDeparture = async (id) => {
        await axios.delete(`https://localhost:7276/department_departure/delete?departmentDepartureId=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});

		window.location.href = '/department_departures';
	}

	
	return (
		<div className="department-departures narrow-conteiner">
			<Header SearchInputComponent={<input  type='text' placeholder='Поиск'/>} AddButtonComponent={<button onClick={() => openDepartmentDepartureEditor(-1)}><b>Добавить пункт отправления</b></button>}/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='vertical-list-filters-parameters'>
					<button className='select-location'>
						Выберите месторасположение
						<div>Страна, город</div>
					</button>

					<div className="transport-list-on-filter">
						<img src={airplane}/>
						<img src={bus}/>
						<img src={ship}/>
					</div>

					{/* <Button className="editor-list-more-filters" variant="outlined"></Button> */}
					<div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div>
				</div>
				<div className="department-departures-list">
					{departmentDepartures.map((departmentDeparture, index) => (
						<DepartmentDepartureCard 
							departmentDeparture={departmentDeparture}
							openDepartmentDepartureEditor={() => openDepartmentDepartureEditor(index)}
							deleteDepartmentDeparture={deleteDepartmentDeparture}
						/>))}
				</div>
				<Modal className='department-departure-editor-modal' open={isOpenDepartmentDepartureEditor} onClose={closeDepartmentDepartureEditor} >
					<DepartmentDepartureEditor indexOfSelectedDepartmentDeparture={indexOfSelectedDepartmentDeparture} departmentDepartures={departmentDepartures} setDepartmentDepartures={setDepartmentDepartures} closeModal={closeDepartmentDepartureEditor}/>
				</Modal>
			</main>
			
		</div>
	);
}

export default DepartmentDepartures;
