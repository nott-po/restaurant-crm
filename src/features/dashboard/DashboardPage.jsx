import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllTables } from '../tables/tablesSlice';
import { useGetUsersQuery } from '../auth/authApi';
import StatCard from '../../shared/ui/StatCard';
import HeaderActions from '../../shared/ui/HeaderActions';
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineCollection } from 'react-icons/hi';
import { RiRestaurantLine } from 'react-icons/ri';

export default function Dashboard() {
    const navigate = useNavigate();
    const tables = useSelector(selectAllTables);
    const { data: usersData } = useGetUsersQuery({ limit: 30 });

    const tableStats = {
        total: tables.length,
        free: tables.filter(t => t.status === 'free').length,
        occupied: tables.filter(t => t.status === 'occupied').length,
        reserved: tables.filter(t => t.status === 'reserved').length,
    };

    const ordersWithItems = tables.filter(t => t.orders?.length > 0 && t.orderStatus);
    const orderStats = {
        total: ordersWithItems.length,
        pending: ordersWithItems.filter(t => t.orderStatus === 'pending').length,
        preparing: ordersWithItems.filter(t => t.orderStatus === 'preparing').length,
        ready: ordersWithItems.filter(t => t.orderStatus === 'ready').length,
    };

    const totalRevenue = tables.reduce((sum, table) => {
        return sum + table.orders.reduce((orderSum, item) => {
            return orderSum + (item.price * item.quantity);
        }, 0);
    }, 0);

    const employeeCount = usersData?.users?.length || 0;

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Dashboard</h1>
                <HeaderActions />
            </div>

            <div className="dashboard-section">
                <h2 className="section-title">Overview</h2>
                <div className="stats-grid">
                    <StatCard
                        label="Active Orders"
                        value={orderStats.total}
                        onView={() => navigate('/orders')}
                    />
                    <StatCard
                        label="Tables Occupied"
                        value={`${tableStats.occupied}/${tableStats.total}`}
                        onView={() => navigate('/tables')}
                    />
                    <StatCard
                        label="Employees"
                        value={employeeCount}
                        onView={() => navigate('/staff')}
                    />
                    <StatCard
                        label="Current Revenue"
                        value={`$${totalRevenue.toFixed(2)}`}
                    />
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="section-title">Table Status</h2>
                <div className="stats-grid">
                    <StatCard
                        label="Free Tables"
                        value={tableStats.free}
                        onView={() => navigate('/tables')}
                    />
                    <StatCard
                        label="Occupied"
                        value={tableStats.occupied}
                        onView={() => navigate('/tables')}
                    />
                    <StatCard
                        label="Reserved"
                        value={tableStats.reserved}
                        onView={() => navigate('/tables')}
                    />
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="section-title">Order Status</h2>
                <div className="stats-grid">
                    <StatCard
                        label="Pending"
                        value={orderStats.pending}
                        onView={() => navigate('/orders')}
                    />
                    <StatCard
                        label="Preparing"
                        value={orderStats.preparing}
                        onView={() => navigate('/orders')}
                    />
                    <StatCard
                        label="Ready"
                        value={orderStats.ready}
                        onView={() => navigate('/orders')}
                    />
                </div>
            </div>

            <div className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => navigate('/tables')}>
                        <RiRestaurantLine size={20} />
                        View Tables
                    </button>
                    <button className="quick-action-btn" onClick={() => navigate('/orders')}>
                        <HiOutlineClipboardList size={20} />
                        Manage Orders
                    </button>
                    <button className="quick-action-btn" onClick={() => navigate('/staff')}>
                        <HiOutlineUsers size={20} />
                        View Staff
                    </button>
                    <button className="quick-action-btn" onClick={() => navigate('/branches')}>
                        <HiOutlineCollection size={20} />
                        View Branches
                    </button>
                </div>
            </div>
        </div>
    );
}
