import UserCard from './UserCard';
import type { User } from './types'

type UserListProps = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onToggleUser: (id: number) => void;
  onEditUser: (user: User) => void;
  deletingId: number | null;
}

function UserList({users, onDeleteUser, onToggleUser, onEditUser, deletingId}: UserListProps) {
  return (
    <ul>
      {users.map(user => (
        <UserCard key={user.id} user={user} onDeleteUser={onDeleteUser} onToggleUser={onToggleUser} onEditUser={onEditUser} deletingId={deletingId}/>
      ))}
    </ul>
    
  );
}

export default UserList