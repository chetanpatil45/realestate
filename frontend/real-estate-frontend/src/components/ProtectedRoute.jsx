import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getRoleHomePath, normalizeRole } from '../utils/propertyHelpers';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = normalizeRole(user.role);

  if (allowedRole && userRole !== normalizeRole(allowedRole)) {
    return <Navigate to={getRoleHomePath(userRole)} replace />;
  }

  return children;
};

export default ProtectedRoute;