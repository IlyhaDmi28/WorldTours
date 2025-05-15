import '../styles/general.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tours from './tours';
import ToursForEditor from './toursForEditor';
import Tour from './tour';
import TourEditor from './tourEditor';
import HotelEditor from './hotelEditor';
import Users from './users';
import Auth from './auth';
import TravelInfo from './travelInfo';
import Survey from './survey';
import ChatAI from './chatAI';
import User from './user';
import Bookings from './bookings';
import History from './history';
import BookingsForManager from './bookingsForManager';
import HotelsForEditor from './hotelsForEditor';
import Hotels from './hotels';
import Hotel from './hotel';
import DepartmentDepartures from './departmentDepartures';
import GeographicObjects from './geographicObjects';
import Payment from './payment';
import PaymentBooking from './paymentBooking';
import Campany from './campany';
import Countries from './countries';
import Country from './country';
import City from './city';
import Error from './error';
import GlobalAlert from '../components/general/globalAlert ';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../store/slices/authUserSlice';
const token = localStorage.getItem("token");

function App() {
	const authUser = useSelector((state) => state.authUser.value)
 	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const isAuthenticated = async () => {
            try {
                const response = await axios.get('https://localhost:7276/auth/auth', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
				console.log(response.data.photoUrl);
                dispatch(setAuthUser(response.data));
				console.log(authUser);
            } catch (error) {
				console.log(error.response);
                if(error.response == undefined) return dispatch(setAuthUser(false));
                if(error.response.status === 401) {
                    dispatch(setAuthUser(false));
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
				<Route path="/tours" element={<Tours/>} />
				<Route path="/tours/:hotelId" element={<Tours/>} />
				<Route path="/hotels" element={<Hotels/>} />
				<Route path="/payment_booking/:id" element={<PaymentBooking/>} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/tour/:id" element={<Tour />} />
				<Route path="/hotel/:id" element={<Hotel />} />
				<Route path="/travel_info" element={<Survey />} />
				<Route path="/chat_ai" element={<ChatAI />} />
				<Route path="/user" element={<User/>} />
				<Route path="/payment" element={<Payment/>} />
				<Route path="/campany" element={<Campany/>} />
				<Route path="/countries" element={<Countries/>} />
				<Route path="/country/:id" element={<Country />} />
				<Route path="/city/:id" element={<City />} />
				<Route path="/error/:id" element={<Error/>} />


				{(authUser.role === 2 || authUser.role === 3) && (
					<>
							<Route path="/bookings" element={authUser ? <BookingsForManager /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
							<Route path="/tours_for_editor" element={authUser ? <ToursForEditor /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
							<Route path="/hotels_for_editor" element={authUser ? <HotelsForEditor /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
							<Route path="/department_departures" element={authUser ? <DepartmentDepartures /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 1) && (
					<>
						<Route path="/bookings" element={authUser ? <Bookings /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 1) && (
					<>
						<Route path="/history" element={authUser ? <History /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 3) && (
					<>
						<Route path="/users" element={authUser ? <Users/> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
						<Route path="/tour_editor/:id" element={authUser ? <TourEditor /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
						<Route path="/hotel_editor/:id" element={authUser ? <HotelEditor /> : <Navigate to="/auth" replace />} />
					</>
				)}

				{(authUser.role === 2 || authUser.role === 3) && (
					<>
						<Route path="/geographic_objects" element={authUser ? <GeographicObjects /> : <Navigate to="/auth" replace />} />
					</>
				)}
			</Routes>
            <GlobalAlert/>

		</Router>
	);
}

export default App;
