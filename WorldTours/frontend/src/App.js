import './styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
const token = localStorage.getItem("token");

function App() {
	const [authUser, setAuthUser] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const isAuthenticated = async () => {
            try {
				console.log(token);

                const response = await axios.get('https://localhost:7276/auth/auth', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

				console.log(response.data.id);
                setAuthUser(response.data);

            } catch (error) {
				console.log(error.response);
                if(error.response == undefined) return setAuthUser(false)
                if(error.response.status === 401) {
                    setAuthUser(false);
                }
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        isAuthenticated();
	}, []);

	if (loading) {
        return <div>Loading...</div>;
    }

	return (
		<Router>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/tours" element={authUser ? <Tours /> : <Navigate to="/auth" replace />} />
				<Route path="/tour" element={authUser ? <Tour /> : <Navigate to="/auth" replace />} />
				<Route path="/tour_editor" element={authUser ? <TourEditor /> : <Navigate to="/auth" replace />} />
				<Route path="/survey" element={authUser ? <Survey /> : <Navigate to="/auth" replace />} />
				<Route path="/user" element={authUser ? <User/> : <Navigate to="/auth" replace />} />
				<Route path="/bookings" element={authUser ? <Bookings/> : <Navigate to="/auth" replace />} />
				<Route path="/history" element={authUser ? <History/> : <Navigate to="/auth" replace />} />
				<Route path="/payment" element={authUser ? <Payment/> : <Navigate to="/auth" replace />} />
				<Route path="/campany" element={authUser ? <Campany/> : <Navigate to="/auth" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
