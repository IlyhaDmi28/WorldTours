import { useDispatch } from 'react-redux';
import { showAlert } from '../store/slices/alertSlice';

function useAlert() {
    const dispatch = useDispatch();
    const alert = (message, severity) => dispatch(showAlert({ message: message, severity: severity }));

    return alert;
}

export default useAlert;