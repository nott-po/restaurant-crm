import { NavLink } from 'react-router-dom';

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
          <img src="/logo.svg" alt="Restaurant CRM Logo" style={{ width: "120px", display: "block", margin: "0 auto" }} />
      </div>
      
      <div className="nav-links">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/staff" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Staff
        </NavLink>
        
        <NavLink 
          to="/orders" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Orders
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Analytics
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
