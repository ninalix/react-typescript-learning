import { Link } from "react-router-dom"

export const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

function UsersPage() {
  return(
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default UsersPage