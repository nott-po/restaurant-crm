import {useState, useMemo, useEffect, useCallback} from "react";
import {useDispatch} from "react-redux";
import {setOrderStatus, clearTableOrders} from "../tables/tablesSlice";
import {
  getOrderStatusClass as getStatusClass,
  getOrderStatusLabel as getStatusLabel,
  formatTime as formatTimeUtil,
  formatDate as formatDateUtil,
  calculateOrderTotal,
} from "../../shared/lib/helpers";

export function useOrders(tables) {
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [openStatusMenu, setOpenStatusMenu] = useState(null);

  const allOrders = useMemo(() => {
    return tables
      .filter((table) => table.orders?.length > 0 && table.orderStatus)
      .map((table) => ({
        tableNumber: table.number,
        tableStatus: table.status,
        orderStatus: table.orderStatus,
        orderTime: table.orderTime,
        items: table.orders,
        total: calculateOrderTotal(table.orders),
      }));
  }, [tables]);

  const stats = useMemo(
    () => ({
      total: allOrders.length,
      pending: allOrders.filter((o) => o.orderStatus === "pending").length,
      preparing: allOrders.filter((o) => o.orderStatus === "preparing").length,
      ready: allOrders.filter((o) => o.orderStatus === "ready").length,
      delivered: allOrders.filter((o) => o.orderStatus === "delivered").length,
    }),
    [allOrders],
  );

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      if (statusFilter !== "all" && order.orderStatus !== statusFilter)
        return false;

      if (
        searchTerm &&
        !order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      if (dateFilter !== "all" && order.orderTime) {
        const orderDate = new Date(order.orderTime);
        const now = new Date();
        const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

        if (dateFilter === "today" && daysDiff > 0) return false;
        if (dateFilter === "week" && daysDiff > 7) return false;
        if (dateFilter === "month" && daysDiff > 30) return false;
      }

      return true;
    });
  }, [allOrders, statusFilter, searchTerm, dateFilter]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      if (!a.orderTime) return 1;
      if (!b.orderTime) return -1;
      return new Date(b.orderTime) - new Date(a.orderTime);
    });
  }, [filteredOrders]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".order-status-wrapper")) {
        setOpenStatusMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleStatusClick = useCallback((tableNumber) => {
    setOpenStatusMenu((prev) => (prev === tableNumber ? null : tableNumber));
  }, []);

  const handleStatusChange = useCallback(
    (tableNumber, status) => {
      dispatch(setOrderStatus({tableNumber, status}));
      setOpenStatusMenu(null);
    },
    [dispatch],
  );

  const handleCheckout = useCallback(
    (tableNumber) => {
      dispatch(clearTableOrders({tableNumber}));
    },
    [dispatch],
  );

  return {
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    openStatusMenu,
    stats,
    sortedOrders,
    handleStatusClick,
    handleStatusChange,
    handleCheckout,
    getOrderStatusClass: getStatusClass,
    getOrderStatusLabel: getStatusLabel,
    formatTime: formatTimeUtil,
    formatDate: formatDateUtil,
  };
}
