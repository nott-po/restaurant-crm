import {useState, useMemo, useCallback} from "react";

export function useBranches(branches = []) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [filterCuisine, setFilterCuisine] = useState([]);

  const cuisines = useMemo(() => {
    return [...new Set(branches.map((b) => b.cuisine))];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    if (filterCuisine.length === 0) return branches;
    return branches.filter((b) => filterCuisine.includes(b.cuisine));
  }, [branches, filterCuisine]);

  const toggleCuisineFilter = useCallback((cuisine) => {
    setFilterCuisine((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  }, []);

  const removeCuisineFilter = useCallback((cuisine) => {
    setFilterCuisine((prev) => prev.filter((c) => c !== cuisine));
  }, []);

  const handleBranchClick = useCallback((branch) => {
    setSelectedBranch(branch);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBranch(null);
  }, []);

  const clearFilters = useCallback(() => {
    setFilterCuisine([]);
  }, []);

  return {
    selectedBranch,
    filterCuisine,
    cuisines,
    filteredBranches,
    toggleCuisineFilter,
    removeCuisineFilter,
    handleBranchClick,
    clearSelection,
    clearFilters,
  };
}
