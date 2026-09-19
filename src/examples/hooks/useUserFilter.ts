import type { User } from '../reducer/user-management/UserManagement'

function useUserFilter(users: User[], searchTerm: string, showActiveOnly: boolean) {
  return users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = !showActiveOnly || user.active;

    return matchesSearch && matchesActive;
  })
}

export default useUserFilter