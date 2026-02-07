import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineLogout,
    HiOutlineLocationMarker,
    HiOutlineMenu,
    HiOutlineX
} from 'react-icons/hi';
import { RiDrinks2Line } from 'react-icons/ri';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { logout } from '../../features/auth/authSlice';
import Logo from './Logo';
import LogoutModal from '../../features/auth/LogoutModal';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        dispatch(logout());
        navigate('/login');
        setIsLogoutModalOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <button
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
            >
                {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>

            {isMobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <nav className={`navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <Logo />

                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        <HiOutlineHome className="nav-icon" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/staff"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        <HiOutlineUsers className="nav-icon" />
                        Employees
                    </NavLink>

                    <NavLink
                        to="/branches"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                    >
                        <HiOutlineLocationMarker className="nav-icon" />
                        Branches
                    </NavLink>

                    <button onClick={handleLogout} className="logout-btn">
                        <HiOutlineLogout className="nav-icon" />
                        Logout
                    </button>
                </div>

                <div className="nav-bottom">
                    <NavLink
                        to="/tables"
                        className={({ isActive }) =>
                            isActive ? 'nav-bottom-link active' : 'nav-bottom-link'
                        }
                    >
                        <RiDrinks2Line className="nav-bottom-icon" />
                        Tables
                    </NavLink>

                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive ? 'nav-bottom-link dark active' : 'nav-bottom-link dark'
                        }
                    >
                        <MdOutlineRestaurantMenu className="nav-bottom-icon" />
                        Orders
                    </NavLink>
                </div>
            </nav>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={confirmLogout}
            />
        </>
    );
}
