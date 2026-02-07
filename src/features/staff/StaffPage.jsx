import { useGetUsersQuery } from '../auth/authApi';
import { HiFilter, HiOutlineSearch } from 'react-icons/hi';
import { useStaffList } from './useStaffList';
import StatCard from '../../shared/ui/StatCard';
import HeaderActions from '../../shared/ui/HeaderActions';
import { PageHeaderSkeleton, StatCardSkeleton, EmployeeRowSkeleton } from '../../shared/ui/Skeleton';

export default function StaffList() {
    const { data, isLoading, error } = useGetUsersQuery({ limit: 30 });
    const users = data?.users || [];

    const {
        searchTerm,
        setSearchTerm,
        isSearchOpen,
        shiftFilter,
        setShiftFilter,
        userShiftMap,
        totalEmployees,
        onShift,
        idle,
        filteredUsers,
        allSelected,
        handleSelectAll,
        handleSelectEmployee,
        isEmployeeSelected,
        toggleSearch,
        getEmploymentDate,
        getBillingDate,
        formatDate,
    } = useStaffList(users);

    if (isLoading) {
        return (
            <div className="staff-page">
                <PageHeaderSkeleton />

                <div className="stats-grid">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <StatCardSkeleton key={index} />
                    ))}
                </div>

                <div className="employee-table">
                    <table>
                        <thead>
                            <tr>
                                <th width="40"></th>
                                <th>Employee</th>
                                <th>Shift</th>
                                <th>Employment date</th>
                                <th>Billing date</th>
                                <th width="80">Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <EmployeeRowSkeleton key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) return <div className="page-error">Error loading employees</div>;

    return (
        <div className="staff-page">
            <div className="page-header">
                <h1>Employees</h1>
                <HeaderActions />
            </div>

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

            <div className="table-controls">
                <button className="filter-btn">
                    <HiFilter size={18} />
                    Filters
                </button>
                <div className="table-search">
                    {isSearchOpen && (
                        <input
                            type="text"
                            placeholder="Search employees..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    )}
                    <button
                        className="search-btn"
                        aria-label="Search"
                        onClick={toggleSearch}
                    >
                        <HiOutlineSearch size={16} />
                    </button>
                </div>
            </div>

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
                            <tr key={user.id} className="employee-row">
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isEmployeeSelected(user.id)}
                                        onChange={() => handleSelectEmployee(user.id)}
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
                                    <span className={`shift-badge shift-${userShiftMap[user.id]?.toLowerCase()}`}>
                                        {userShiftMap[user.id]}
                                    </span>
                                </td>
                                <td className="date-cell">{formatDate(getEmploymentDate(user.id))}</td>
                                <td className="date-cell">{formatDate(getBillingDate(user.id))}</td>
                                <td>
                                    <button className="bonus-btn">+</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
