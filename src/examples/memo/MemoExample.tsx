import { useState, useMemo, useCallback } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  // TODO 1
  // const visibleUsers = users.filter(user =>
  //   user.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );

  const visibleUsers = useMemo(() => {
    return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [users, searchTerm]);

  // TODO 2
  // const handleDelete = (id: number) => {
  //   setUsers(prev =>
  //     prev.filter(user => user.id !== id)
  //   );
  // };

  const handleDelete = useCallback((id: number) => {
    setUsers(prev =>
      prev.filter(user => user.id !== id)
    );
  }, []);

  return (
    <>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <button onClick={() => setCount(prev => prev + 1)}>
        {count}
      </button>

      <UserList
        users={visibleUsers}
        onDelete={handleDelete}
      />
    </>
  );
}