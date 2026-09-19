import { useState, useMemo } from "react";
import type { User } from "./useUserAction";

type UserFilterOptions = {
  initialActiveOnly?: boolean;
};

export function useUserFilters(users: User[], options?: UserFilterOptions) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(options?.initialActiveOnly ?? false);

  const visibleUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesActive = !showActiveOnly || user.active;

      return matchesActive && matchesSearch;
    });
  }, [users, searchTerm, showActiveOnly]);

  function setSearch(value: string) {
    setSearchTerm(value);
  }

  function setActiveOnly(value: boolean) {
    setShowActiveOnly(value);
  }

  return {searchTerm, setSearch, visibleUsers, showActiveOnly, setActiveOnly}
}