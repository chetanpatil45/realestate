import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If not logged in, force redirect to login page
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // If logged in but role doesn't match (e.g. Customer trying to open Dealer route)
    return <Navigate to={user.role === 'DEALER' ? '/dealer' : '/customer'} replace />;
  }

  return children;
};

export default ProtectedRoute;