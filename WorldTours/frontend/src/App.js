import './styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Tours from './pages/tours';
import Countries from './pages/countries';
import Tour from './pages/tour';
import Auth from './pages/auth';
import Survey from './pages/survey';
import User from './pages/user';
import Bookings from './pages/bookings';
import History from './pages/history';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/tours" element={<Tours />} />
				<Route path="/countries" element={<Countries />} />
				<Route path="/tour" element={<Tour />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/user" element={<User/>} />
				<Route path="/user" element={<User/>} />
				<Route path="/bookings" element={<Bookings/>} />
				<Route path="/history" element={<History/>} />
			</Routes>
		</Router>
	);
}

export default App;
