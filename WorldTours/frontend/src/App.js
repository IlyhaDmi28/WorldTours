import './styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Tours from './pages/tours';
import Countries from './pages/countries';
import Tour from './pages/tour';
import Auth from './pages/auth';
import Survey from './pages/survey';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/tours" element={<Tours />} />
				<Route path="/countries" element={<Countries />} />
				<Route path="/tour" element={<Tour />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/survey" element={<Survey />} />
			</Routes>
		</Router>
	);
}

export default App;
