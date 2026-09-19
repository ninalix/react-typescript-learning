import type { User } from "./types";

type UserCardProps = {
  user: User;
  onDeleteUser: (id: number) => void;
  onToggleUser: (id: number) => void;
  onEditUser: (user: User) => void;
  deletingId: number | null;
}

function UserCard({user, onDeleteUser, onToggleUser, onEditUser, deletingId}: UserCardProps) {
  return (
    <li>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Status: {user.active ? "Active" : "Inactive"}</p>

      <button onClick={() => onToggleUser(user.id)}>{user.active ? "Deactivate" : "Activate"}</button>
      <button onClick={() => onDeleteUser(user.id)} disabled={deletingId !== null}>{deletingId === user.id ? "Deleting..." : "Delete"}</button>
      <button onClick={() => onEditUser(user)}>Edit</button>
    </li>
  );
}

export default UserCard