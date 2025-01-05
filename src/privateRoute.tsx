import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
}

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
export default PrivateRoute;