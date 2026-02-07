import {useState, useMemo, useCallback} from "react";
import {SHIFT_TYPES} from "../../shared/constants/appConstants";

export function useStaffList(users = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [shiftFilter, setShiftFilter] = useState("all");

  const userShiftMap = useMemo(() => {
    const shiftMap = {};
    users.forEach((user) => {
      shiftMap[user.id] = user.id % 2 === 0 ? SHIFT_TYPES.A : SHIFT_TYPES.B;
    });
    return shiftMap;
  }, [users]);

  const onShiftCount = useMemo(() => {
    return users.filter((u) => userShiftMap[u.id] === "A").length;
  }, [users, userShiftMap]);

  const totalEmployees = users.length;
  const onShift = onShiftCount;
  const idle = totalEmployees - onShift;

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (shiftFilter === "onShift")
          return userShiftMap[user.id] === SHIFT_TYPES.A;
        if (shiftFilter === "idle")
          return userShiftMap[user.id] === SHIFT_TYPES.B;
        return true;
      })
      .filter((user) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          user.firstName?.toLowerCase().includes(term) ||
          user.lastName?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
        );
      });
  }, [users, shiftFilter, searchTerm, userShiftMap]);

  const allSelected = useMemo(() => {
    return (
      filteredUsers.length > 0 &&
      filteredUsers.every((user) => selectedEmployees.includes(user.id))
    );
  }, [filteredUsers, selectedEmployees]);

  const handleSelectAll = useCallback(
    (e) => {
      if (e.target.checked) {
        setSelectedEmployees(filteredUsers.map((u) => u.id));
      } else {
        setSelectedEmployees([]);
      }
    },
    [filteredUsers],
  );

  const handleSelectEmployee = useCallback((userId) => {
    setSelectedEmployees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }, []);

  const isEmployeeSelected = useCallback(
    (userId) => {
      return selectedEmployees.includes(userId);
    },
    [selectedEmployees],
  );

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) {
      setSearchTerm("");
    }
  }, [isSearchOpen]);

  const clearSelection = useCallback(() => {
    setSelectedEmployees([]);
  }, []);

  const getEmploymentDate = useCallback((userId) => {
    const year = 2020 + (userId % 3);
    const month = userId % 12;
    const day = 1 + (userId % 28);
    return new Date(year, month, day);
  }, []);

  const getBillingDate = useCallback((userId) => {
    const month = new Date().getMonth();
    const day = 5 + (userId % 10);
    return new Date(new Date().getFullYear(), month, day);
  }, []);

  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    selectedEmployees,
    shiftFilter,
    setShiftFilter,
    userShiftMap,
    totalEmployees,
    onShift,
    idle,
    filteredUsers,
    allSelected,
    handleSelectAll,
    handleSelectEmployee,
    isEmployeeSelected,
    toggleSearch,
    clearSelection,
    getEmploymentDate,
    getBillingDate,
    formatDate,
  };
}
