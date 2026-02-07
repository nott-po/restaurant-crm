import { HiOutlineLogout, HiX } from 'react-icons/hi';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close">
                    <HiX size={20} />
                </button>

                <div className="logout-modal-icon">
                    <HiOutlineLogout size={48} />
                </div>

                <h2 className="logout-modal-title">Log Out</h2>
                <p className="logout-modal-message">
                    Are you sure you want to log out of your account?
                </p>

                <div className="logout-modal-actions">
                    <button onClick={onClose} className="logout-modal-btn cancel">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="logout-modal-btn confirm">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
