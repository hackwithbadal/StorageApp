import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { loginState } from '../../redux/IsloginSlice'

const PrivateRoute = () => {
    const token = useSelector((state) => state.islogin.value)
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute;