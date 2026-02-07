import { useSelector } from 'react-redux';
import { selectAllTables } from '../tables/tablesSlice';
import { useOrders } from './useOrders';
import StatCard from '../../shared/ui/StatCard';
import HeaderActions from '../../shared/ui/HeaderActions';

export default function Orders() {
    const tables = useSelector(selectAllTables);

    const {
        statusFilter,
        setStatusFilter,
        searchTerm,
        setSearchTerm,
        openStatusMenu,
        stats,
        sortedOrders,
        handleStatusClick,
        handleStatusChange,
        handleCheckout,
        getOrderStatusClass,
        getOrderStatusLabel,
        formatTime,
        formatDate,
    } = useOrders(tables);

    return (
        <div className="orders-page">
            <div className="page-header">
                <h1>Orders</h1>
                <HeaderActions />
            </div>

            <div className="stats-grid">
                <StatCard
                    label="All Orders"
                    value={stats.total}
                    isActive={statusFilter === 'all'}
                    onView={() => setStatusFilter('all')}
                />
                <StatCard
                    label="Pending"
                    value={stats.pending}
                    isActive={statusFilter === 'pending'}
                    onView={() => setStatusFilter('pending')}
                />
                <StatCard
                    label="Preparing"
                    value={stats.preparing}
                    isActive={statusFilter === 'preparing'}
                    onView={() => setStatusFilter('preparing')}
                />
                <StatCard
                    label="Ready"
                    value={stats.ready}
                    isActive={statusFilter === 'ready'}
                    onView={() => setStatusFilter('ready')}
                />
                <StatCard
                    label="Delivered"
                    value={stats.delivered}
                    isActive={statusFilter === 'delivered'}
                    onView={() => setStatusFilter('delivered')}
                />
            </div>

            <div className="table-controls" role="search">
                <label htmlFor="status-filter" className="sr-only">Filter by status</label>
                <select
                    id="status-filter"
                    className="date-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter orders by status"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                </select>
                <label htmlFor="table-search" className="sr-only">Search by table number</label>
                <input
                    id="table-search"
                    type="text"
                    placeholder="Search by table number..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search orders by table number"
                />
            </div>

            <div className="orders-list">
                {sortedOrders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found</p>
                    </div>
                ) : (
                    sortedOrders.map((order) => (
                        <div key={`order-${order.tableNumber}`} className="order-card">
                            <div className="order-header">
                                <div className="order-title">
                                    <h3>Table {order.tableNumber}</h3>
                                    <span className="order-time">
                                        {formatDate(order.orderTime)} • {formatTime(order.orderTime)}
                                    </span>
                                </div>
                                <div className="order-status-wrapper">
                                    <button
                                        className={`order-status-badge ${getOrderStatusClass(order.orderStatus)}`}
                                        onClick={() => handleStatusClick(order.tableNumber)}
                                        aria-label={`Order status: ${getOrderStatusLabel(order.orderStatus)}. Click to change`}
                                        aria-haspopup="menu"
                                        aria-expanded={openStatusMenu === order.tableNumber}
                                    >
                                        {getOrderStatusLabel(order.orderStatus)}
                                    </button>
                                    {openStatusMenu === order.tableNumber && (
                                        <div
                                            className="order-status-dropdown"
                                            onClick={(e) => e.stopPropagation()}
                                            role="menu"
                                            aria-label="Change order status"
                                        >
                                            <button role="menuitem" onClick={() => handleStatusChange(order.tableNumber, 'pending')}>Pending</button>
                                            <button role="menuitem" onClick={() => handleStatusChange(order.tableNumber, 'preparing')}>Preparing</button>
                                            <button role="menuitem" onClick={() => handleStatusChange(order.tableNumber, 'ready')}>Ready</button>
                                            <button role="menuitem" onClick={() => handleStatusChange(order.tableNumber, 'delivered')}>Delivered</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div key={`order-${order.tableNumber}-item-${item.id}`} className="order-item">
                                        <div className="item-info">
                                            <span className="item-quantity">{item.quantity}x</span>
                                            <span className="item-name">{item.title}</span>
                                        </div>
                                        <span className="item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span className="total-label">Total:</span>
                                    <span className="total-amount">${order.total.toFixed(2)}</span>
                                </div>
                                <div className="order-card-actions">
                                    <button
                                        className="order-card-btn discount"
                                        aria-label={`Apply discount to table ${order.tableNumber} order`}
                                    >
                                        Discount
                                    </button>
                                    <button
                                        className="order-card-btn checkout"
                                        onClick={() => handleCheckout(order.tableNumber)}
                                        aria-label={`Checkout table ${order.tableNumber} for $${order.total.toFixed(2)}`}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
