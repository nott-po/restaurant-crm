import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../auth/authApi';
import { selectUser } from '../auth/authSlice';
import { HiOutlineFilter, HiOutlineBell, HiOutlineUser } from 'react-icons/hi';

export default function StaffList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [shiftFilter, setShiftFilter] = useState('all'); // 'all', 'onShift', 'idle'
  const currentUser = useSelector(selectUser);
  const { data, isLoading, error } = useGetUsersQuery({ limit: 30 });

  const users = data?.users || [];

  // shift assignments based on user ID
  const userShiftMap = useMemo(() => {
    const shiftMap = {};
    users.forEach(user => {
      shiftMap[user.id] = user.id % 2 === 0 ? 'A' : 'B';
    });
    return shiftMap;
  }, [users]);

  // stats calc
  const onShiftCount = useMemo(() => {
    return users.filter(u => userShiftMap[u.id] === 'A').length;
  }, [users, userShiftMap]);

  const totalEmployees = users.length;
  const onShift = onShiftCount;
  const idle = totalEmployees - onShift;

  // shift filter and search filter
  const filteredUsers = users
    .filter(user => {
      // shift filter
      if (shiftFilter === 'onShift') {
        return userShiftMap[user.id] === 'A';
      } else if (shiftFilter === 'idle') {
        return userShiftMap[user.id] === 'B';
      }
      return true; // 'all'
    })
    .filter(user => {
      // search filter
      if (!searchTerm) return true;
      return (
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredUsers.map(u => u.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (userId) => {
    if (selectedEmployees.includes(userId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== userId));
    } else {
      setSelectedEmployees([...selectedEmployees, userId]);
    }
  };

  const allSelected = filteredUsers.length > 0 && selectedEmployees.length === filteredUsers.length;

  if (isLoading) return <div className="page-loading">Loading employees...</div>;
  if (error) return <div className="page-error">Error loading employees</div>;

  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>Employees</h1>
        <div className="user-info">
          <button className="icon-btn">
            <HiOutlineBell size={20} />
          </button>
          <div className="current-user">
            <HiOutlineUser size={20} />
            <span>{currentUser?.firstName || 'User'} {currentUser?.lastName || ''}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          label="All Employees"
          value={totalEmployees}
          isActive={shiftFilter === 'all'}
          onView={() => {
            setShiftFilter('all');
            setSearchTerm('');
          }}
        />
        <StatCard
          label="On Shift"
          value={onShift}
          isActive={shiftFilter === 'onShift'}
          onView={() => setShiftFilter('onShift')}
        />
        <StatCard
          label="Idle"
          value={idle}
          isActive={shiftFilter === 'idle'}
          onView={() => setShiftFilter('idle')}
        />
      </div>

      {/* Filters & Search */}
      <div className="table-controls">
        <button className="filter-btn">
          <HiOutlineFilter size={18} />
          Filters
        </button>
        <input
          type="text"
          placeholder="Search employees..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th width="40">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Employee</th>
              <th>Shift</th>
              <th>Employment date</th>
              <th>Billing date</th>
              <th width="80">Bonus</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <EmployeeRow
                key={user.id}
                user={user}
                shift={userShiftMap[user.id]}
                isSelected={selectedEmployees.includes(user.id)}
                onSelect={() => handleSelectEmployee(user.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, isActive, onView }) {
  return (
    <div className={`stat-card ${isActive ? 'stat-card-active' : ''}`}>
      <span className="stat-label">{label}</span>
      <div className="stat-footer">
        <div className="stat-value">{value}</div>
        <hr className="stat-divider" />
        <button className="stat-action" onClick={onView}>View</button>
      </div>
    </div>
  );
}

function EmployeeRow({ user, shift, isSelected, onSelect }) {
  const employmentDate = useMemo(() => {
    const year = 2020 + (user.id % 3);
    const month = user.id % 12;
    const day = (user.id % 28) + 1;
    return new Date(year, month, day);
  }, [user.id]);

  const billingDate = useMemo(() => {
    const day = 5 + (user.id % 10);
    return new Date(2023, 0, day);
  }, [user.id]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <tr className="employee-row">
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td>
        <div className="employee-info">
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
            alt={`${user.firstName} ${user.lastName}`}
            className="employee-avatar"
          />
          <div>
            <div className="employee-name">{user.firstName} {user.lastName}</div>
            <div className="employee-email">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className={`shift-badge shift-${shift.toLowerCase()}`}>{shift}</span>
      </td>
      <td className="date-cell">{formatDate(employmentDate)}</td>
      <td className="date-cell">{formatDate(billingDate)}</td>
      <td>
        <button className="bonus-btn">+</button>
      </td>
    </tr>
  );
}
