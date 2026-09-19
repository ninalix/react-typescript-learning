import { useState } from "react";
import useUsers from "../../hooks/useUsers";

function AddUserForm() {
  const [name, setName] = useState("");
  const { dispatch } = useUsers();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({
      type: "addUser",
      user: {
        id: Date.now(),
        name,
        active: true
      }
    })

    setName("");
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:{name}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}