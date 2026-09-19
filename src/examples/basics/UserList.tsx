import { useState } from "react";

type User = {
  id: number;
  name: string;
  active: boolean;
};

const initialUsers: User[] = [
  { id: 1, name: "Nina", active: true },
  { id: 2, name: "Matt", active: false },
  { id: 3, name: "Amy", active: true }
];

function UserList() {
  const [ users, setUsers ] = useState<User[]>(initialUsers);
  const [ showActiveOnly, setShowActiveOnly ] = useState(false);

  const toggleUser = (id: number) => {
    setUsers(prevUsers => (
      prevUsers.map(user => (
        user.id === id
        ? { ...user, active: !user.active }
        : user
      ))
    ))
  }

  const visibleUsers = showActiveOnly
    ? users.filter(user => user.active)
    : users;

  return (
    <div>
      <button onClick={ () => setShowActiveOnly(prev => !prev) }>{ showActiveOnly ? "Show all" : "Show active only"}</button>
      { visibleUsers.map(user => (
        <div key={ user.id }>
          <p>{ user.name } - { user.active ? "Active" : "Inactive" }</p>
          <button onClick={ () => toggleUser(user.id) }>Toggle</button>
        </div>
      ))}
    </div>
  )
}

export default UserList