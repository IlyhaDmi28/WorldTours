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
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import airplane from '../img/airplane.svg'
import bus from '../img/bus.svg'
import ship from '../img/ship.svg'
const token = localStorage.getItem("token");

function DepartmentDepartures() {
	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
	});
	
	const [filter, setFilter] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		transportTypeId: null,
	});

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

	const getDepartmentDeparture = async () => {
		const response = await axios.post(`https://localhost:7276/department_departure/filtred_department_departures`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const departmentDeparturesData = response.data;
		setDepartmentDepartures(departmentDeparturesData);
	}

	useEffect(() => {
		const getDirectionInfo = async () => {
			if (filter.regionId != null && filter.countryId != null && filter.cityId != null) {
				try {
					const response = await axios.get(
						`https://localhost:7276/direction/get?countryId=${filter.countryId}&cityId=${filter.cityId}&hotelId=${filter.hotelId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
                    
					setDirectionInfo(response.data);
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}

			if (filter.countryId != null && filter.cityId != null) {
				try {
					console.log(filter);
					getDepartmentDeparture();
				} catch (error) {
					console.error("Ошибка загрузки данных:", error);
				}
			}
		};
	
		getDirectionInfo();
	}, [filter]);

	const selectDirection = (directionId) => {
		setFilter((prevFilter) => {
			switch (directionsPageInndex) {
				case 1:
					return {
						...prevFilter,
						regionId: directionId
					}
				case 2:
					return {
						...prevFilter,
						countryId: directionId
					}
				case 3:
					return {
						...prevFilter,
						cityId: directionId
					}
				default:
					break;
			}
		});
	};

    const deleteSelectedDirection = async () => {
		setDirectionInfo({
			country: null,
			city: null,
		});

		setFilter((prevFilter) => { 
            return {
                ...prevFilter,
                regionId: null,
                countryId: null,
                cityId: null,
            }
        });

		const updatedFilter = {
			...filter,
            regionId: null,
            countryId: null,
            cityId: null,
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/department_departure/filtred_department_departures`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const departmentDeparturesData = response.data;
		setDepartmentDepartures(departmentDeparturesData);
	}

	const directions = [
        null,
        <Regions selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries regionId={filter.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities countyId={filter.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	const changeTransportType = async (id) => {
		setFilter((prevFilter) => { return {
			...prevFilter,
			transportTypeId: id
		}})

		const updatedFilter = {
			...filter,
			transportTypeId: id
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/department_departure/filtred_department_departures`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const departmentDeparturesData = response.data;
		setDepartmentDepartures(departmentDeparturesData);
    };

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
					<button className='select-location' onClick={() => {deleteSelectedDirection(); setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}}>
						Выберите месторасположение
						<div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
					</button>
					<div className='directions-area'>
						{directions[directionsPageInndex]}
					</div>

					<div className="transport-list-on-filter">
						<img src={airplane} onClick={() => changeTransportType(0)}/>
						<img src={airplane} onClick={() => changeTransportType(1)}/>
						<img src={bus} onClick={() => changeTransportType(2)}/>
						<img src={ship} onClick={() => changeTransportType(3)}/>
					</div>

					{/* <Button className="editor-list-more-filters" variant="outlined"></Button> */}
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
