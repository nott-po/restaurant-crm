import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineLogout
} from 'react-icons/hi';
import { logout, selectUser } from '../auth/authSlice';
import Logo from './Logo';

export default function Navigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

  const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');

        if (confirmLogout) {
            dispatch(logout());
            navigate('/login');

            console.log('User logged out successfully');
        }
  };

  return (
    <nav className="navigation">
            <Logo />

      <div className="nav-links">
              <NavLink
              to="/"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineHome className="nav-icon" />
            Home
          </NavLink>

          <NavLink
              to="/shift"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineCalendar className="nav-icon" />
            Shift
          </NavLink>

          <NavLink
              to="/payroll"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineDocumentText className="nav-icon" />
            Payroll
          </NavLink>

          <NavLink
              to="/tasks"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineClipboardList className="nav-icon" />
            Tasks
          </NavLink>

          <NavLink
              to="/analytics"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineChartBar className="nav-icon" />
            Analytics
          </NavLink>

          <NavLink
              to="/staff"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineUsers className="nav-icon" />
                    Staff
          </NavLink>

          <NavLink
              to="/vacation"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineGlobeAlt className="nav-icon" />
            Vacation
          </NavLink>

          <NavLink
              to="/sick-days"
              className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
              }
          >
            <HiOutlineHeart className="nav-icon" />
            Sick days
          </NavLink>

                {/* Logout Button */}
              <button onClick={handleLogout} className="logout-btn">
                    <HiOutlineLogout className="nav-icon" />
                Logout
              </button>
        </div>
      </nav>
  );
}
