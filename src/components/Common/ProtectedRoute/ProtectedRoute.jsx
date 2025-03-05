import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Wrong role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;