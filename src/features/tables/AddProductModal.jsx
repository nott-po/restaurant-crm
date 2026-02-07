import { HiX } from 'react-icons/hi';
import { ProductCardSkeleton, SkeletonGrid } from '../../shared/ui/Skeleton';

export default function AddProductModal({
    isOpen,
    onClose,
    products,
    isLoading,
    onAddProduct
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Products</h2>
                    <button onClick={onClose} className="modal-close">
                        <HiX size={24} />
                    </button>
                </div>
                <div className="modal-body">
                    {isLoading ? (
                        <SkeletonGrid count={8} ItemSkeleton={ProductCardSkeleton} columns={4} />
                    ) : (
                        <div className="products-grid">
                            {products?.map(product => (
                                <div key={product.id} className="product-card">
                                    {typeof product.thumbnail === 'string' && product.thumbnail.startsWith('http') ? (
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="product-image"
                                        />
                                    ) : (
                                        <div className="product-image-emoji">
                                            {product.thumbnail || '🍽️'}
                                        </div>
                                    )}
                                    <h3>{product.title}</h3>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    <button
                                        className="add-to-order-btn"
                                        onClick={() => {
                                            onAddProduct(product);
                                        }}
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
