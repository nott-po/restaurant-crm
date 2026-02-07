import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectAllTables } from './tablesSlice';
import { getTableStatusLabel } from '../../shared/lib/helpers';
import StatCard from '../../shared/ui/StatCard';
import StatusBadge from './StatusBadge';
import HeaderActions from '../../shared/ui/HeaderActions';

export default function Tables() {
    const navigate = useNavigate();
    const tables = useSelector(selectAllTables);
    const [statusFilter, setStatusFilter] = useState('all');    
    const freeCount = tables.filter(t => t.status === 'free').length;
    const occupiedCount = tables.filter(t => t.status === 'occupied').length;
    const reservedCount = tables.filter(t => t.status === 'reserved').length;

    const filteredTables = tables.filter(table => {
        if (statusFilter === 'all') return true;
        return table.status === statusFilter;
    });

    const handleTableClick = (tableNumber) => {
        navigate(`/tables/${tableNumber}`);
    };

    const handleTableKeyDown = (e, tableNumber) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTableClick(tableNumber);
        }
    };

    const getStatusClassName = (status) => {
        if (status === 'free') return 'status-free';
        if (status === 'occupied') return 'status-occupied';
        if (status === 'reserved') return 'status-reserved';
        return 'status-occupied';
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="tables-page">
            <div className="page-header-tables">
                <h1>Tables</h1>
                <HeaderActions />
            </div>

            <div className="stats-grid">
                <StatCard
                    label="All Tables"
                    value={tables.length}
                    isActive={statusFilter === 'all'}
                    onView={() => setStatusFilter('all')}
                />
                <StatCard
                    label="Free"
                    value={freeCount}
                    isActive={statusFilter === 'free'}
                    onView={() => setStatusFilter('free')}
                />
                <StatCard
                    label="Occupied"
                    value={occupiedCount}
                    isActive={statusFilter === 'occupied'}
                    onView={() => setStatusFilter('occupied')}
                />
                <StatCard
                    label="Reserved"
                    value={reservedCount}
                    isActive={statusFilter === 'reserved'}
                    onView={() => setStatusFilter('reserved')}
                />
            </div>

            <div className="tables-grid-container">
                <div className="tables-grid">
                    {filteredTables.map((table) => {
                        const statusClassName = getStatusClassName(table.status);
                        const displayTime = table.reservedTime ? formatTime(table.reservedTime) : null;

                        return (
                            <div
                                key={table.id}
                                className={`table-card ${statusClassName}`}
                                data-table-number={table.number}
                                onClick={() => handleTableClick(table.number)}
                                onKeyDown={(e) => handleTableKeyDown(e, table.number)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Table ${table.number}, ${getTableStatusLabel(table.status)}${displayTime ? `, reserved at ${displayTime}` : ''}`}
                            >
                                <div className="table-card-header">
                                    <span className="table-number">{table.number}</span>
                                    <StatusBadge
                                        tableNumber={table.number}
                                        currentStatus={table.status}
                                        showDropdown={true}
                                    />
                                </div>

                                <div className="table-card-body">
                                    {displayTime && (
                                        <div className="table-time">{displayTime}</div>
                                    )}
                                    <HiOutlineArrowRight className="table-arrow" aria-hidden="true" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
