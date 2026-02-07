import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../features/auth/authSlice';

export default function ProtectedRoute({ children }) {
    const location = useLocation(); 
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}