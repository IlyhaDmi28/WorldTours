import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideAlert } from '../../store/slices/alertSlice'

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // style={{position: 'absolute', top: '10px'}}
    >
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          	{alert.message}
        </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;