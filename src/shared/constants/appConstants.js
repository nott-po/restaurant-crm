export const DEFAULT_RESERVATION_HOURS = 2;
export const AUTH_TOKEN_EXPIRES_MINUTES = 60;
export const CACHE_DURATION_SECONDS = 60;

export const API_BASE_URL = "https://dummyjson.com";
export const API_ENDPOINTS = {
  AUTH: "/auth/login",
  USERS: "/users",
  RECIPES: "/recipes",
};

export const MAP_CONFIG = {
  DEFAULT_CENTER: [40.7505, -73.985],
  DEFAULT_ZOOM: 13,
  COORDINATE_OFFSET: {
    LAT_BASE: 40.7505,
    LNG_BASE: -73.985,
    LAT_MULTIPLIER: 0.003,
    LNG_MULTIPLIER: 0.004,
    OFFSET_RANGE: 12,
    OFFSET_CENTER: 6,
  },
};

export const TABLE_STATUS = {
  FREE: "free",
  OCCUPIED: "occupied",
  RESERVED: "reserved",
};

export const TABLE_STATUS_LABELS = {
  [TABLE_STATUS.FREE]: "Free",
  [TABLE_STATUS.OCCUPIED]: "Occupied",
  [TABLE_STATUS.RESERVED]: "Reserved",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  DELIVERED: "delivered",
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PREPARING]: "Preparing",
  [ORDER_STATUS.READY]: "Ready",
  [ORDER_STATUS.DELIVERED]: "Delivered",
};

export const COLORS = {
  STATUS_FREE: "#16a34a",
  STATUS_FREE_BG: "#D3E79D",
  STATUS_FREE_TEXT: "#3d5a00",

  STATUS_OCCUPIED: "#d97706",
  STATUS_OCCUPIED_BG: "#FFE68E",
  STATUS_OCCUPIED_TEXT: "#000000",

  STATUS_RESERVED: "#dc2626",
  STATUS_RESERVED_BG: "#FF5858",
  STATUS_RESERVED_TEXT: "#FFE8E8",

  ORDER_PENDING_BG: "#FFE68E",
  ORDER_PENDING_TEXT: "#7a5c00",

  ORDER_PREPARING_BG: "#FFF9E2",
  ORDER_PREPARING_TEXT: "#7a5c00",

  ORDER_READY_BG: "#D3E79D",
  ORDER_READY_TEXT: "#3d5a00",

  ORDER_DELIVERED_BG: "#f3f4f6",
  ORDER_DELIVERED_TEXT: "#374151",

  PRIMARY: "#1f2937",
  PRIMARY_HOVER: "#374151",
  DANGER: "#ef4444",
  DANGER_HOVER: "#dc2626",
  MUTED: "#6b7280",
  BORDER: "#e5e7eb",
};

export const SHIFT_TYPES = {
  A: "A",
  B: "B",
};

export const STATUS_FILTER_ALL = "all";
export const DATE_FILTER_OPTIONS = {
  TODAY: "today",
  WEEK: "week",
  MONTH: "month",
  ALL: "all",
};

export const DEFAULT_PAGE_SIZE = 30;
export const PRODUCTS_PAGE_SIZE = 50;

export const STORAGE_KEYS = {
  TABLES: "restaurant_tables",
  AUTH_TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

export const FOOD_CATEGORIES = {
  APPETIZER: "Appetizer",
  MAIN_COURSE: "Main Course",
  DESSERT: "Dessert",
  DRINKS: "Drinks",
};
