import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTableStatus } from './tablesSlice';
import { TABLE_STATUS, TABLE_STATUS_LABELS } from '../../shared/constants/appConstants';

const STATUS_SHORT_LABELS = {
    [TABLE_STATUS.FREE]: 'Free',
    [TABLE_STATUS.OCCUPIED]: 'Occ',
    [TABLE_STATUS.RESERVED]: 'Res',
};

export default function StatusBadge({ tableNumber, currentStatus, status, showDropdown = true, onClick }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const displayStatus = currentStatus || status;

    const getStatusLabel = (status) => STATUS_SHORT_LABELS[status] || status;

    const handleStatusChange = (e, newStatus) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(setTableStatus({ tableNumber, status: newStatus }));
        setIsDropdownOpen(false);
    };

    const handleBadgeClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (showDropdown) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const fullStatusLabel = TABLE_STATUS_LABELS[displayStatus] || displayStatus;

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
                className={`status-badge status-${displayStatus}`}
                onClick={handleBadgeClick}
                aria-label={`Table ${tableNumber} status: ${fullStatusLabel}. ${showDropdown ? 'Click to change status' : ''}`}
                aria-haspopup={showDropdown ? 'menu' : undefined}
                aria-expanded={showDropdown ? isDropdownOpen : undefined}
            >
                <span aria-hidden="true">{getStatusLabel(displayStatus)}</span>
                <span className="sr-only">{fullStatusLabel}</span>
            </button>
            {showDropdown && isDropdownOpen && (
                <div
                    className="status-dropdown-table"
                    onClick={(e) => e.stopPropagation()}
                    role="menu"
                    aria-label="Change table status"
                >
                    <button role="menuitem" onClick={(e) => handleStatusChange(e, 'free')}>Free</button>
                    <button role="menuitem" onClick={(e) => handleStatusChange(e, 'occupied')}>Occupied</button>
                    <button role="menuitem" onClick={(e) => handleStatusChange(e, 'reserved')}>Reserved</button>
                </div>
            )}
        </div>
    );
}
