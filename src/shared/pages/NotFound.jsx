import { useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-code">404</div>
                <h1 className="not-found-title">Page Not Found</h1>
                <p className="not-found-message">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-actions">
                    <button
                        className="not-found-btn primary"
                        onClick={() => navigate('/')}
                    >
                        <HiOutlineHome size={18} />
                        Go to Dashboard
                    </button>
                    <button
                        className="not-found-btn secondary"
                        onClick={() => navigate(-1)}
                    >
                        <HiOutlineArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
