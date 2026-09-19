import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms)
    })
  }

  async function fetchUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if(!response.ok) {
        throw new Error("Failed to load users.");
      }

      await delay(2000);

      const data = await response.json();
      setUsers(data);
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
  }, []);

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

  return (
    <>
      {users.map(user => (
        <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      )) }
    </>
    
  );
}

export default Users