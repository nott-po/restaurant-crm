import { HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

export default function HeaderActions() {
    const currentUser = useSelector(selectUser);

    const displayName = currentUser?.firstName && currentUser?.lastName
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser?.name || 'User';

    return (
        <div className="header-actions">
            <button className="icon-btn" aria-label="Notifications">
                <HiOutlineBell size={20} />
            </button>
            <div className="current-user">
                <HiOutlineUser size={20} />
                <span>{displayName}</span>
            </div>
        </div>
    );
}
