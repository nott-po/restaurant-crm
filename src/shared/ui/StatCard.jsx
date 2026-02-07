export default function StatCard({ label, value, isActive, onView }) {
    return (
        <div className={`stat-card ${isActive ? 'stat-card-active' : ''}`}>
            <span className="stat-label">{label}</span>
            <div className="stat-footer">
                <div className="stat-value">{value}</div>
                <hr className="stat-divider" />
                <button className="stat-action" onClick={onView}>
                    View
                </button>
            </div>
        </div>
    );
}
