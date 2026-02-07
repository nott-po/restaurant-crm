export function Skeleton({ className = '', width, height, variant = 'rect', style = {} }) {
    const baseClass = 'skeleton';
    const variantClass = `skeleton-${variant}`;

    const inlineStyle = {
        width: width || '100%',
        height: height || '1em',
        ...style,
    };

    return (
        <div
            className={`${baseClass} ${variantClass} ${className}`}
            style={inlineStyle}
        />
    );
}

export function StatCardSkeleton() {
    return (
        <div className="stat-card skeleton-card">
            <Skeleton width="80px" height="14px" style={{ marginBottom: '12px' }} />
            <Skeleton width="60px" height="48px" />
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Skeleton width="1px" height="20px" />
                <Skeleton width="60px" height="32px" variant="rounded" />
            </div>
        </div>
    );
}

export function TableCardSkeleton() {
    return (
        <div className="table-card skeleton-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Skeleton width="40px" height="24px" />
                <Skeleton width="50px" height="24px" variant="rounded" />
            </div>
            <Skeleton width="60px" height="14px" style={{ marginTop: 'auto' }} />
        </div>
    );
}

export function OrderCardSkeleton() {
    return (
        <div className="order-card skeleton-card">
            <div className="order-header" style={{ borderBottom: 'none' }}>
                <div>
                    <Skeleton width="100px" height="20px" style={{ marginBottom: '8px' }} />
                    <Skeleton width="140px" height="14px" />
                </div>
                <Skeleton width="80px" height="28px" variant="rounded" />
            </div>
            <div style={{ padding: '16px 0' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <Skeleton width="70%" height="16px" />
                        <Skeleton width="50px" height="16px" />
                    </div>
                ))}
            </div>
            <div style={{ paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton width="60px" height="20px" />
                    <Skeleton width="80px" height="24px" />
                </div>
            </div>
        </div>
    );
}

export function BranchCardSkeleton() {
    return (
        <div className="branch-card skeleton-card">
            <div className="branch-images">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} width="56px" height="56px" variant="rounded" />
                ))}
            </div>
            <div style={{ marginTop: '12px' }}>
                <Skeleton width="60%" height="18px" style={{ marginBottom: '8px' }} />
                <Skeleton width="80%" height="14px" />
            </div>
        </div>
    );
}

export function EmployeeRowSkeleton() {
    return (
        <tr className="employee-row skeleton-row">
            <td><Skeleton width="18px" height="18px" /></td>
            <td>
                <div className="employee-info">
                    <Skeleton width="40px" height="40px" variant="circle" />
                    <div>
                        <Skeleton width="120px" height="14px" style={{ marginBottom: '4px' }} />
                        <Skeleton width="160px" height="12px" />
                    </div>
                </div>
            </td>
            <td><Skeleton width="28px" height="28px" variant="circle" /></td>
            <td><Skeleton width="100px" height="14px" /></td>
            <td><Skeleton width="100px" height="14px" /></td>
            <td><Skeleton width="30px" height="30px" variant="circle" /></td>
        </tr>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="product-card skeleton-card">
            <Skeleton height="140px" variant="rounded" style={{ marginBottom: '12px' }} />
            <Skeleton width="80%" height="16px" style={{ marginBottom: '8px' }} />
            <Skeleton width="50%" height="18px" style={{ marginBottom: '12px' }} />
            <Skeleton height="36px" variant="rounded" />
        </div>
    );
}

export function SkeletonGrid({ count = 6, ItemSkeleton = Skeleton, columns = 3, gap = '20px' }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: gap
        }}>
            {Array.from({ length: count }).map((_, i) => (
                <ItemSkeleton key={i} />
            ))}
        </div>
    );
}
    
export function PageHeaderSkeleton() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Skeleton width="150px" height="32px" />
            <div style={{ display: 'flex', gap: '12px' }}>
                <Skeleton width="40px" height="40px" variant="circle" />
                <Skeleton width="120px" height="40px" variant="rounded" />
            </div>
        </div>
    );
}
