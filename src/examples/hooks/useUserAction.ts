import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  active: boolean;
};

type ApiUser = {
  id: number;
  name: string;
};

export function useUserAction() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if(!response.ok) {
        throw new Error("Error fetching users.");
      }

      const data: ApiUser[] = await response.json();

      const mappedUsers: User[] = data.map(user => ({
        id: user.id,
        name: user.name,
        active: true
      }))

      setUsers(mappedUsers);
    } catch(error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  function handleDelete(id: number) {
    setUsers(prev => 
      prev.filter(user => user.id !== id)
    );
  }

  function handleToggle(id: number) {
    setUsers(prev => 
      prev.map(user => 
        user.id === id
        ? {...user, active: !user.active}
        : user
      )
    )
  }

  return {users, loading, error, fetchUsers, handleDelete, handleToggle}
}