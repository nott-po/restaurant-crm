import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiOutlineChat, HiX } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectTableByNumber } from './tablesSlice';
import { useGetProductsQuery } from './productsApi';
import { useTableDetail } from './useTableDetail';
import HeaderActions from '../../shared/ui/HeaderActions';
import AddProductModal from './AddProductModal';

export default function TableDetail() {
    const { tableNumber } = useParams();
    const navigate = useNavigate();
    const table = useSelector(selectTableByNumber(tableNumber));

    const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({ limit: 30 });

    const {
        expandedCategories,
        showProductsModal,
        setShowProductsModal,
        groupedOrders,
        total,
        allSelected,
        toggleCategory,
        handleUpdateQuantity,
        handleRemoveItem,
        handleToggleSelect,
        handleAddToCategory,
        handleAddProduct,
        handleCheckOrder,
        handleSelectAll,
    } = useTableDetail(table, tableNumber, navigate);

    if (!table) {
        return <div className="page-loading">Table not found</div>;
    }

    return (
        <div className="table-detail-page">
            <div className="page-header-tables">
                <div className="table-detail-header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/tables')}
                        aria-label="Go back to tables"
                    >
                        <HiArrowLeft size={20} aria-hidden="true" />
                    </button>
                    <div>
                        <h1>Table {tableNumber}</h1>
                        <p className="table-subtitle">Order details</p>
                    </div>
                </div>
                <HeaderActions />
            </div>

            <div className="order-content">
                <table className="order-table">
                    <thead>
                        <tr className="order-table-header-row">
                            <th className="col-checkbox">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    aria-label="Select all"
                                />
                            </th>
                            <th className="col-dish">Dish</th>
                            <th className="col-price">Price</th>
                            <th className="col-amount">Amount</th>
                            <th className="col-actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.orders.length === 0 ? (
                            <tr>
                                <td colSpan="5">
                                    <div className="empty-orders">
                                        <p>No orders yet. Click the button below to add items.</p>
                                        <button
                                            className="add-first-item-btn"
                                            onClick={() => setShowProductsModal(true)}
                                        >
                                            + Add Item
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            Object.entries(groupedOrders).map(([category, items]) => (
                                <Fragment key={category}>
                                    <tr className="category-row">
                                        <td colSpan="5">
                                            <div className="category-header">
                                                <button
                                                    className={`category-toggle ${expandedCategories[category] ? '' : 'collapsed'}`}
                                                    onClick={handleAddToCategory}
                                                    aria-label={`Add item to ${category}`}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="category-name"
                                                    onClick={() => toggleCategory(category)}
                                                    aria-expanded={expandedCategories[category]}
                                                    aria-label={`${expandedCategories[category] ? 'Collapse' : 'Expand'} ${category} category`}
                                                >
                                                    {category}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedCategories[category] && items.map(item => (
                                        <tr key={item.id} className="order-item-row">
                                            <td className="col-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={item.selected || false}
                                                    onChange={() => handleToggleSelect(item.id)}
                                                    aria-label={`Select ${item.title}`}
                                                />
                                            </td>
                                            <td className="col-dish">
                                                <div className="dish-info">
                                                    {typeof item.image === 'string' && item.image.startsWith('http') ? (
                                                        <img src={item.image} alt={item.title} className="dish-image-img" />
                                                    ) : (
                                                        <span className="dish-image">{item.image || '🍽️'}</span>
                                                    )}
                                                    <span className="dish-name">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="col-price">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="col-amount">
                                                <div className="amount-wrapper">
                                                    <div className="quantity-controls" role="group" aria-label={`Quantity for ${item.title}`}>
                                                        <button
                                                            className="qty-btn"
                                                            onClick={() => handleUpdateQuantity(item.id, -1)}
                                                            aria-label={`Decrease quantity of ${item.title}`}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="qty-value" aria-live="polite">{item.quantity}</span>
                                                        <button
                                                            className="qty-btn"
                                                            onClick={() => handleUpdateQuantity(item.id, 1)}
                                                            aria-label={`Increase quantity of ${item.title}`}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {item.quantity > 1 && (
                                                        <span className="item-total">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="col-actions">
                                                <button
                                                    className="action-icon-btn"
                                                    aria-label={`Add comment for ${item.title}`}
                                                >
                                                    <HiOutlineChat size={18} aria-hidden="true" />
                                                </button>
                                                <button
                                                    className="action-icon-btn remove"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    aria-label={`Remove ${item.title} from order`}
                                                >
                                                    <HiX size={18} aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="order-footer">
                    <span className="total-label">Total</span>
                    <div className="order-footer-box">
                        <span className="total-value">${total.toFixed(2)}</span>
                        <div className="order-actions">
                            <button className="discount-btn">Discount</button>
                            <button className="check-order-btn" onClick={handleCheckOrder}>
                                Check Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AddProductModal
                isOpen={showProductsModal}
                onClose={() => setShowProductsModal(false)}
                products={productsData?.products}
                isLoading={productsLoading}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
}
