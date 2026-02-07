import {
  TABLE_STATUS,
  TABLE_STATUS_LABELS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  COLORS,
  MAP_CONFIG,
} from "../constants/appConstants";

export const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatFullDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const createReservationTime = (hoursOffset = 0) => {
  const now = new Date();
  now.setHours(now.getHours() + hoursOffset);
  return now.toISOString();
};

export const getTableStatusLabel = (status) => {
  return TABLE_STATUS_LABELS[status] || status;
};

export const getTableStatusColor = (status) => {
  switch (status) {
    case TABLE_STATUS.FREE:
      return COLORS.STATUS_FREE;
    case TABLE_STATUS.OCCUPIED:
      return COLORS.STATUS_OCCUPIED;
    case TABLE_STATUS.RESERVED:
      return COLORS.STATUS_RESERVED;
    default:
      return COLORS.MUTED;
  }
};

export const getTableStatusBgColor = (status) => {
  switch (status) {
    case TABLE_STATUS.FREE:
      return COLORS.STATUS_FREE_BG;
    case TABLE_STATUS.OCCUPIED:
      return COLORS.STATUS_OCCUPIED_BG;
    case TABLE_STATUS.RESERVED:
      return COLORS.STATUS_RESERVED_BG;
    default:
      return COLORS.BORDER;
  }
};

export const getOrderStatusLabel = (status) => {
  return ORDER_STATUS_LABELS[status] || status;
};

export const getOrderStatusClass = (status) => {
  const classMap = {
    [ORDER_STATUS.PENDING]: "order-status-pending",
    [ORDER_STATUS.PREPARING]: "order-status-preparing",
    [ORDER_STATUS.READY]: "order-status-ready",
    [ORDER_STATUS.DELIVERED]: "order-status-delivered",
  };
  return classMap[status] || "order-status-pending";
};

export const getOrderStatusColors = (status) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return {bg: COLORS.ORDER_PENDING_BG, text: COLORS.ORDER_PENDING_TEXT};
    case ORDER_STATUS.PREPARING:
      return {bg: COLORS.ORDER_PREPARING_BG, text: COLORS.ORDER_PREPARING_TEXT};
    case ORDER_STATUS.READY:
      return {bg: COLORS.ORDER_READY_BG, text: COLORS.ORDER_READY_TEXT};
    case ORDER_STATUS.DELIVERED:
      return {bg: COLORS.ORDER_DELIVERED_BG, text: COLORS.ORDER_DELIVERED_TEXT};
    default:
      return {bg: COLORS.BORDER, text: COLORS.MUTED};
  }
};

export const getBranchCoordinates = (seed) => {
  const {
    LAT_BASE,
    LNG_BASE,
    LAT_MULTIPLIER,
    LNG_MULTIPLIER,
    OFFSET_RANGE,
    OFFSET_CENTER,
  } = MAP_CONFIG.COORDINATE_OFFSET;

  const offsetLat = ((seed % OFFSET_RANGE) - OFFSET_CENTER) * LAT_MULTIPLIER;
  const offsetLng =
    (((seed + 5) % OFFSET_RANGE) - OFFSET_CENTER) * LNG_MULTIPLIER;

  return [LAT_BASE + offsetLat, LNG_BASE + offsetLng];
};

export const buildCuisineImageMap = (recipes) => {
  return recipes.reduce((acc, recipe) => {
    if (!recipe.cuisine || !recipe.image) return acc;
    if (!acc[recipe.cuisine]) acc[recipe.cuisine] = [];
    acc[recipe.cuisine].push(recipe.image);
    return acc;
  }, {});
};

export const getCuisineImages = (cuisine, cuisineImageMap, count = 4) => {
  const images = cuisineImageMap[cuisine] || [];
  return images.slice(0, count);
};

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

/**
 * Calculate order total
 * @param {Array} items - Array of order items with price and quantity
 * @returns {number} Total price
 */
export const calculateOrderTotal = (items) => {
  if (!items || !Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getShiftType = (userId) => {
  return userId % 2 === 0 ? SHIFT_TYPES.A : SHIFT_TYPES.B;
};

export const getEmploymentDate = (userId) => {
  const year = 2020 + (userId % 3);
  const month = userId % 12;
  const day = 1 + (userId % 28);
  return new Date(year, month, day);
};

export const getBillingDate = (userId) => {
  const month = new Date().getMonth();
  const day = 5 + (userId % 10);
  return new Date(new Date().getFullYear(), month, day);
};

export const generateKey = (prefix, id) => {
  return `${prefix}-${id}`;
};

export const logError = (context, error, data = {}) => {
  console.error(`[${context}]`, error, data);
};

export const logWarning = (context, message, data = {}) => {
  console.warn(`[${context}]`, message, data);
};
