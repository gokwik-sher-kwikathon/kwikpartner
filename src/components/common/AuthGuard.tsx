import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { state, dispatch } = useApp();
  const location = useLocation();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token && !state.isAuthenticated) {
      // If user exists in localStorage but not in state, restore it
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
    }
  }, [dispatch, state.isAuthenticated]);

  if (!state.isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // If user hasn't selected a role yet, redirect to role selection
  if (state.isAuthenticated && state.user && !state.user.role) {
    return <Navigate to='/role-selection' replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
