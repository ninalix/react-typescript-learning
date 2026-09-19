import UserList from "../basics/UserList";
import { useUserAction } from "./useUserAction";
import { useUserFilters } from "./useUserFilters";

function UserManagementHook() {
  const {users, loading, error, fetchUsers, handleDelete, handleToggle} = useUserAction();
  const {searchTerm, setSearch, visibleUsers, showActiveOnly, setActiveOnly} = useUserFilters(users);

  if(loading) {
    return <p>Loading...</p>;
  }

  if(error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchUsers}>Try again</button>
      </div>
    );
  }

  if(users.length === 0) {
    return <p>No users found.</p>;
  }

  if(visibleUsers.length === 0) {
    return <p>No users match your filters.</p>;
  }

  return(
    <>
      <div>
        <label htmlFor="search">Search</label>
        <input id="search" type="text" value={searchTerm} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="active-only">Active only</label>
        <input id="active-only" type="checkbox" checked={showActiveOnly} onChange={(e) => setActiveOnly(e.target.checked)}/>
      </div>
      
      <UserList users={visibleUsers}/>
    </>
  );
}

export default UserManagementHook