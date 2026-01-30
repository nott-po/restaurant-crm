import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../auth/authSlice';

export default function ProtectedRoute({ children }) {
    const location = useLocation(); // after loging use page tha wanted to go to
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