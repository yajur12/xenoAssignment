import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { authData } = useContext(AuthContext);
  return authData?.token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
