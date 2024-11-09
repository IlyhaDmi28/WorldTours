import './styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import Tours from './pages/tours';
import Tour from './pages/tour';
import TourEditor from './pages/tourEditor';
import Auth from './pages/auth';
import Survey from './pages/survey';
import User from './pages/user';
import Bookings from './pages/bookings';
import History from './pages/history';
import Payment from './pages/payment';
import Campany from './pages/campany';

function App() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.post('https://localhost:7276/home/index', {
					message: "XYU"
				});
				console.log(result.data); 
			} catch (error) {
				console.error("Ошибка при отправке данных:", error);
			}
		};
	
		fetchData();
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/tours" element={<Tours />} />
				<Route path="/tour" element={<Tour />} />
				<Route path="/tour_editor" element={<TourEditor />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/user" element={<User/>} />
				<Route path="/bookings" element={<Bookings/>} />
				<Route path="/history" element={<History/>} />
				<Route path="/payment" element={<Payment/>} />
				<Route path="/campany" element={<Campany/>} />
			</Routes>
		</Router>
	);
}

export default App;
