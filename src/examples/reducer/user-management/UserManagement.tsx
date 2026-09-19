import { useEffect, useReducer, useState } from "react"
import { userReducer, initialState } from "./userReducer";
import type { User, ApiUser } from "./types"

import UserList from "./UserList";
import UserForm from "./UserForm";
import UserFilter from "./UserFilter";
import EditUserForm from "./EditUserForm";

function UserManagement() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [editingUser, setEditingUser] = useState<User | null>(null);


  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function fetchUsers() {
    dispatch({
      type: "loadStart"
    })

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if(!response.ok) {
        throw new Error("Failed to load users.");
      }

      const data: ApiUser[] = await response.json();
      const userArr: User[] = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: "developer",
        active: true
      }))

      dispatch({
        type: "loadSuccess",
        users: userArr
      })
    } catch(error) {
      dispatch({
        type: "loadError",
        error: error instanceof Error ? error.message : "Something went wrong."
      })
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if(state.loading) {
    return <p>Loading users...</p>;
  }

  if(state.error) {
    return <p>{state.error}</p>;
  }

  async function handleDelete(id: number) {
    if(!window.confirm("Are you sure?")) {
      return;
    }

    setDeletingId(id);

    dispatch({
      type: "clearError"
    })

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE"
      });

      if(!response.ok) {
        throw new Error("Failed to delete user.");
      }

      dispatch({
        type: "deleteUser",
        id: id
      })

      if(editingUser?.id === id) {
        setEditingUser(null);
      }
    } catch(error) {
      dispatch({
        type: "loadError",
        error: error instanceof Error ? error.message : "Something went wrong."
      })
    } finally {
      setDeletingId(null);
    }
  }

  function handleAddUser(user: User) {
    dispatch({
      type: "addUser",
      user
    });
  }

  function handleToggle(id: number) {
    dispatch({
      type: "toggleUser",
      id: id
    })
  }

  function handleEdit(user: User) {
    setEditingUser(user);
  }

  async function handleSave(updatedUser: User) {
    setSaving(true);
    dispatch({
      type: "clearError"
    })

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedUser)
      });

      if(!response.ok) {
        throw new Error("Failed to update user.");
      }

      const savedUser = await response.json();

      dispatch({
        type: "updateUser",
        user: savedUser
      })

      setEditingUser(null);
    } catch(error) {
      dispatch({
        type: "loadError",
        error: error instanceof Error ? error.message : "Something went wrong."
      })
    } finally {
      setSaving(false);
    }
  }

  function handleCancelEdit() {
    setEditingUser(null);
  }

  const filteredUsers = state.users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = !showActiveOnly || user.active;

    return matchesSearch && matchesActive;
  })

  // const filteredUsers = useUserFilter(
  //   users,
  //   searchTerm,
  //   showActiveOnly
  // );

  return (
    <>
      <UserFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} showActiveOnly={showActiveOnly} onActiveOnlyChange={setShowActiveOnly}/>
      <UserForm onAddUser={handleAddUser} />
      <UserList users={filteredUsers} onDeleteUser={handleDelete} onToggleUser={handleToggle} onEditUser={handleEdit} deletingId={deletingId}/>
      {editingUser && (
        <EditUserForm key={editingUser.id} user={editingUser} onSave={handleSave} onCancel={handleCancelEdit} saving={saving} />
      )}
    </>
  );

}

export default UserManagement