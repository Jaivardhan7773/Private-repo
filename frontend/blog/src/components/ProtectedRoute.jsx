import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import SplashScreen from './SplashScreen';
import PageNotFound from './PageNotFound';

const ProtectedRoute = ({ children, requireAdmin, requireEditor }) => {
    const { authUser, isChechingAuth } = useAuthStore();

    if (isChechingAuth) {
        return <SplashScreen />;
    }

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !authUser.isAdmin) {
        return <PageNotFound />;
    }

    if (requireEditor && !authUser.isEditor && !authUser.isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
