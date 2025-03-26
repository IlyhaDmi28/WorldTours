import '../styles/tours-for-editor.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Modal from '@mui/material/Modal';
import Header from '../components/general/header';
import TourType from '../components/tours/tourType'
import FilterButton from "../components/tours/filterButton";
import SortButton from "../components/general/sortButton";
import Regions from '../components/general/regions';
import Countries from '../components/general/countries';
import Cities from '../components/general/cities';
import TourTypesNavForManager from '../components/tours/tourTypesNavForManager';
import TourCardForManager from '../components/tours/tourCardForManager';
import all from '../img/all.svg'
const token = localStorage.getItem("token");

function ToursForEditor() {
	const authUser = useSelector((state) => state.authUser.value)
	const [tourTypes, setTourTypes] = useState([]); 
	const [tours, setTours] = useState([])
	const [indexOfTourTypePage, setIndexOfTourTypePage] = useState(0); 
	

	const [directionsPageInndex, setDirectionsPageInndex] = useState(0);
	const [directionInfo, setDirectionInfo] = useState({
		country: null,
		city: null,
	});

	const [filter, setFilter] = useState({
		regionId: null,
		countryId: null,
		cityId: null,
		tourTypeId: null,
	});

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

	const getTours = async () => {
		const response = await axios.post(`https://localhost:7276/tour/filtred_tours_to_editor`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;
		setTours(toursData);
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
					getTours();
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

		const response = await axios.post(`https://localhost:7276/tour/filtred_tours_to_editor`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;

		setTours(toursData);
	}

	const directions = [
        null,
        <Regions position={{left: '18%', top: '27%'}} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Countries position={{left: '10%', top: '27%'}} regionId={filter.regionId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
        <Cities position={{left: '18%', top: '27%'}} countyId={filter.countryId} selectDirection={selectDirection} goNextDirectionsPage={() => setDirectionsPageInndex(directionsPageInndex + 1 > directions.length ? 0 : directionsPageInndex + 1)} closeDirections={() => setDirectionsPageInndex(0)}/>,
    ]

	const changeTourType = async (id) => {
		setFilter((prevFilter) => { return {
			...prevFilter,
			tourTypeId: id
		}})

		const updatedFilter = {
			...filter,
			tourTypeId: id
		}
		console.log(updatedFilter);

		const response = await axios.post(`https://localhost:7276/tour/filtred_tours_to_editor`, updatedFilter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data;

		setTours(toursData);
    };

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

	const getSearchedItems = async(e) => {
		const response = await axios.post(`https://localhost:7276/tour/filtred_tours_to_editor`, filter, {
			headers: {
				'Authorization': 'Bearer ' + token,
			}
		});
		const toursData = response.data.filter(item => item.name.startsWith(e.target.value));;

		setTours(toursData);
	}

	return (
		<div className="tours-for-editor narrow-conteiner">
			<Header 
				SearchInputComponent={
					<TextField
						className='search-input'
						label="Поиск"
						type="search"
						variant="standard"
						onChange={getSearchedItems}
					/>
					// <input  type='text' placeholder='Поиск'/>
				} 
				AddButtonComponent={<button><Link to='/tour_editor/0'><b>Добавить тур</b></Link>
				</button>}
			/>
			<div className="line-under-header"></div>
			<main className='vertical-list-page'>
				<div className='tours-filters-parametrs'>
					<button className='select-tour-direction' onClick={() => {deleteSelectedDirection(); setDirectionsPageInndex(directionsPageInndex == 0 ? 1 : 0 )}}>
						Выберите месторасположение
						<div>{(directionInfo.city !== null || directionInfo.country !== null) ?  `${directionInfo.country}${directionInfo.city !== null ? ", " + directionInfo.city : ""}` : "Регион, страна, город"}</div>
					</button>
					<div className='directions-area'>
						{directions[directionsPageInndex]}
					</div>
					
					<div className="select-tour-types">
						<ArrowBackIosNewIcon 
							className="arrow-navigation-tour-type" 
							onClick = {()=>{
								setIndexOfTourTypePage(indexOfTourTypePage !== 0 ? indexOfTourTypePage - 1 : indexOfTourTypePage) 
							}}
							style={{
								visibility: indexOfTourTypePage === 0 ? 'hidden' : 'visible'
							}}
						/>

						<div className="tour-types-list">
							<TourType 
								tourType={{name: 'Все туры', imageUrl: all}}
								selectedTourType={filter.tourTypeId} 
								setTourType={() => {changeTourType(0)}}
							/>
							{tourTypes.slice(indexOfTourTypePage, indexOfTourTypePage + 5).map((tourType) => (
								<TourType 
									tourType={tourType}
									selectedTourType={filter.tourTypeId} 
									setTourType={() => {changeTourType(tourType.id)}}
								/>
							))}
						</div>
						<ArrowForwardIosIcon 
							className="arrow-navigation-tour-type"
							onClick = {()=>{
								setIndexOfTourTypePage(indexOfTourTypePage + 5 <= tourTypes.length - 1 ? indexOfTourTypePage + 1 : indexOfTourTypePage) 
							}}
							style={{
								visibility: indexOfTourTypePage + 5 >= tourTypes.length  ? 'hidden' : 'visible'
							}}
						/>
					</div>
					
					{/* <div className="tour-types-filter">

						<div className="tour-types-list">
							<TourType tourType={{name: 'Все туры', imageUrl: all}}/>
							{tourTypes.map((tourType) => (<TourType tourType={tourType}/>))}
						</div>
							
					</div> */}

					{/* <div className="tour-type-list-on-filter">
						<img src={airplane}/>
						<img src={bus}/>
						<img src={ship}/>
					</div> */}
					
					{/* <div className='filter-and-sort-buttons'>
						<FilterButton text={"Ещё фильтры"}/>
						<SortButton/>
					</div> */}
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
