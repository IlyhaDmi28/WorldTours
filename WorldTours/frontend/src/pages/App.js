import '../styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tours from './tours';
import Tour from './tour';
import TourEditor from './tourEditor';
import Auth from './auth';
import Survey from './survey';
import User from './user';
import Bookings from './bookings';
import History from './history';
import Payment from './payment';
import Campany from './campany';
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
				<Route path="/tours" element={<Tours />} />
				<Route path="/tour" element={<Tour />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/user" element={<User/>} />
				<Route path="/payment" element={<Payment/>} />
				<Route path="/campany" element={<Campany/>} />

				<Route path="/bookings" element={authUser && authUser.role === 1 ? <Bookings/> : <Navigate to="/auth" replace />} />
				<Route path="/history" element={authUser && authUser.role === 1 ? <History/> : <Navigate to="/auth" replace />} />

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
					 	<Route path="/tour_editor" element={authUser ? <TourEditor /> : <Navigate to="/auth" replace />} />
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;