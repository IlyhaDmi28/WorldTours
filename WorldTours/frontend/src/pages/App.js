import '../styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tours from './tours';
import ToursEditor from './toursEditor';
import Tour from './tour';
import TourEditor from './tourEditor';
import Users from './users';
import Auth from './auth';
import TravelInfo from './travelInfo';
import User from './user';
import UserBookings from './userBookings';
import ManagerBookings from './managerBookings';
import Payment from './payment';
import Campany from './campany';
import Error from './error';
import { UserContext } from '../context/userContext';
const token = localStorage.getItem("token");

function App() {
	const [authUser, setAuthUser] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const isAuthenticated = async () => {
            try {
                const response = await axios.get('https://localhost:7276/auth/auth', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
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
		<UserContext.Provider value={{authUser, setAuthUser}}>
			<Router>
				<Routes>
					<Route path="/tours" element={authUser.role === 2 || authUser.role === 3 ? <ToursEditor/> : <Tours/>} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/tour/:id" element={<Tour />} />
					<Route path="/travel_info" element={<TravelInfo />} />
					<Route path="/user" element={<User/>} />
					<Route path="/payment" element={<Payment/>} />
					<Route path="/campany" element={<Campany/>} />
					<Route path="/error/:id" element={<Error/>} />

					{(authUser.role === 2 || authUser.role === 3) && (
						<>
							<Route path="/bookings" element={authUser ? <ManagerBookings /> : <Navigate to="/auth" replace />} />
						</>
					)}
					{(authUser.role === 1) && (
						<>
							<Route path="/bookings" element={authUser ? <UserBookings /> : <Navigate to="/auth" replace />} />
						</>
					)}

					{(authUser.role === 3) && (
						<>
							<Route path="/users" element={authUser ? <Users/> : <Navigate to="/auth" replace />} />
						</>
					)}

					<Route path="/bookings" element={authUser && authUser.role === 1 ? <UserBookings/> : <Navigate to="/auth" replace />} />
					{(authUser.role === 2 || authUser.role === 3) && (
						<>
							<Route path="/tour_editor/:id" element={authUser ? <TourEditor /> : <Navigate to="/auth" replace />} />
						</>
					)}
				</Routes>
			</Router>
		</UserContext.Provider>
		
	);
}

export default App;
