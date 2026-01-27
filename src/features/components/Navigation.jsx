import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
  HiOutlineHeart
} from 'react-icons/hi';

export default function Navigation() {
  // TODO: authentication state from Redux
  // for now we assume user is always logged in
  const isAuthenticated = true;
  const handleLogout = () => {
    console.log('Logout clicked - TODO: implement');
  };

  return (
    <nav className="navigation">
      <div className="nav-header">
          <img src="/logo.svg" alt="Restaurant CRM Logo" className="nav-logo" />
          <hr className="nav-divider" />
      </div>

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
            Employess
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

          {isAuthenticated && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
          )}
        </div>
      </nav>
  );
}