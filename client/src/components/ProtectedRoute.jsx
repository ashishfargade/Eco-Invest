// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure this matches the file name

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
