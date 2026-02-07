import {createSlice} from "@reduxjs/toolkit";
import {
  DEFAULT_RESERVATION_HOURS,
  STORAGE_KEYS,
} from "../../shared/constants/appConstants";
import {getDefaultTables} from "../../shared/constants/sampleData";
import {logWarning} from "../../shared/lib/helpers";

const loadTablesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TABLES);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].number) {
        return parsed;
      }
    }
  } catch (e) {
    logWarning("tablesSlice", "Failed to load tables from localStorage", {
      error: e,
    });
  }
  return getDefaultTables();
};

const saveTablesToStorage = (tables) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
  } catch (e) {
    logWarning("tablesSlice", "Failed to save tables to localStorage", {
      error: e,
    });
  }
};

const initialState = {
  tables: loadTablesFromStorage(),
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTableStatus: (state, action) => {
      const {tableNumber, status} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.status = status;
        if (status === "reserved" && !table.reservedTime) {
          const now = new Date();
          now.setHours(now.getHours() + DEFAULT_RESERVATION_HOURS);
          table.reservedTime = now.toISOString();
        }
        if (status !== "reserved") {
          table.reservedTime = null;
        }
      }
      saveTablesToStorage(state.tables);
    },

    setOrderStatus: (state, action) => {
      const {tableNumber, status} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.orderStatus = status;
        if (!table.orderTime) {
          table.orderTime = new Date().toISOString();
        }
      }
      saveTablesToStorage(state.tables);
    },

    addOrderItem: (state, action) => {
      const {tableNumber, item} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        const existingItem = table.orders.find((order) => order.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          table.orders.push({
            ...item,
            quantity: 1,
            selected: false,
            comment: "",
          });
        }
        if (table.status === "free") {
          table.status = "occupied";
        }
        if (!table.orderStatus) {
          table.orderStatus = "pending";
        }
        if (!table.orderTime) {
          table.orderTime = new Date().toISOString();
        }
      }
      saveTablesToStorage(state.tables);
    },

    removeOrderItem: (state, action) => {
      const {tableNumber, itemId} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.orders = table.orders.filter((order) => order.id !== itemId);
      }
      saveTablesToStorage(state.tables);
    },

    updateOrderItemQuantity: (state, action) => {
      const {tableNumber, itemId, quantity} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        const item = table.orders.find((order) => order.id === itemId);
        if (item) {
          item.quantity = Math.max(1, quantity);
        }
      }
      saveTablesToStorage(state.tables);
    },

    toggleOrderItemSelection: (state, action) => {
      const {tableNumber, itemId} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        const item = table.orders.find((order) => order.id === itemId);
        if (item) {
          item.selected = !item.selected;
        }
      }
    },

    updateOrderItemComment: (state, action) => {
      const {tableNumber, itemId, comment} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        const item = table.orders.find((order) => order.id === itemId);
        if (item) {
          item.comment = comment;
        }
      }
      saveTablesToStorage(state.tables);
    },

    clearTableOrders: (state, action) => {
      const {tableNumber} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.orders = [];
        table.status = "free";
        table.orderStatus = null;
        table.orderTime = null;
        table.reservedTime = null;
      }
      saveTablesToStorage(state.tables);
    },

    setTableOrders: (state, action) => {
      const {tableNumber, orders} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.orders = orders;
      }
      saveTablesToStorage(state.tables);
    },

    selectAllItems: (state, action) => {
      const {tableNumber, selected} = action.payload;
      const table = state.tables.find((t) => t.number === tableNumber);
      if (table) {
        table.orders.forEach((item) => {
          item.selected = selected;
        });
      }
    },

    resetTables: (state) => {
      state.tables = getDefaultTables();
      saveTablesToStorage(state.tables);
    },
  },
});

export const {
  setTableStatus,
  setOrderStatus,
  addOrderItem,
  removeOrderItem,
  updateOrderItemQuantity,
  toggleOrderItemSelection,
  updateOrderItemComment,
  clearTableOrders,
  setTableOrders,
  selectAllItems,
  resetTables,
} = tablesSlice.actions;

export const selectAllTables = (state) => state.tables.tables;
export const selectTableByNumber = (tableNumber) => (state) =>
  state.tables.tables.find((t) => t.number === tableNumber);

export default tablesSlice.reducer;
