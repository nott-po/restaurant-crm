import {useState, useCallback, useMemo} from "react";
import {useDispatch} from "react-redux";
import {
  setTableStatus,
  addOrderItem,
  removeOrderItem,
  updateOrderItemQuantity,
  toggleOrderItemSelection,
  clearTableOrders,
  selectAllItems,
} from "./tablesSlice";

export function useTableDetail(table, tableNumber, navigate) {
  const dispatch = useDispatch();

  const [expandedCategories, setExpandedCategories] = useState({
    Appetizer: true,
    "Main Course": true,
    Drinks: true,
    Dessert: true,
  });
  const [showProductsModal, setShowProductsModal] = useState(false);

  const groupedOrders = useMemo(() => {
    if (!table?.orders) return {};
    return table.orders.reduce((acc, item) => {
      const category = item.category || "Main Course";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [table?.orders]);

  const total = useMemo(() => {
    if (!table?.orders) return 0;
    return table.orders.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [table?.orders]);

  const allSelected = useMemo(() => {
    if (!table?.orders?.length) return false;
    return table.orders.every((item) => item.selected);
  }, [table?.orders]);

  const toggleCategory = useCallback((category) => {
    setExpandedCategories((prev) => ({...prev, [category]: !prev[category]}));
  }, []);

  const handleUpdateQuantity = useCallback(
    (itemId, change) => {
      const item = table?.orders?.find((o) => o.id === itemId);
      if (item) {
        dispatch(
          updateOrderItemQuantity({
            tableNumber,
            itemId,
            quantity: item.quantity + change,
          }),
        );
      }
    },
    [dispatch, table?.orders, tableNumber],
  );

  const handleRemoveItem = useCallback(
    (itemId) => {
      dispatch(removeOrderItem({tableNumber, itemId}));
    },
    [dispatch, tableNumber],
  );

  const handleToggleSelect = useCallback(
    (itemId) => {
      dispatch(toggleOrderItemSelection({tableNumber, itemId}));
    },
    [dispatch, tableNumber],
  );

  const handleStatusChange = useCallback(
    (newStatus) => {
      dispatch(setTableStatus({tableNumber, status: newStatus}));
    },
    [dispatch, tableNumber],
  );

  const handleAddToCategory = useCallback(() => {
    setShowProductsModal(true);
  }, []);

  const handleAddProduct = useCallback(
    (product) => {
      const orderItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        selected: false,
        comment: "",
      };
      dispatch(addOrderItem({tableNumber, item: orderItem}));
      if (table?.status === "reserved") {
        dispatch(setTableStatus({tableNumber, status: "occupied"}));
      }
    },
    [dispatch, tableNumber, table?.status],
  );

  const handleCheckOrder = useCallback(() => {
    dispatch(clearTableOrders({tableNumber}));
    navigate("/tables");
  }, [dispatch, tableNumber, navigate]);

  const handleSelectAll = useCallback(
    (checked) => {
      dispatch(selectAllItems({tableNumber, selected: checked}));
    },
    [dispatch, tableNumber],
  );

  return {
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
    handleStatusChange,
    handleAddToCategory,
    handleAddProduct,
    handleCheckOrder,
    handleSelectAll,
  };
}
