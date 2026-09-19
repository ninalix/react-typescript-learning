import useUsers from "../../hooks/useUsers";

function UserList() {
  const { state, dispatch } = useUsers();

  return(
    <>
      {state.users.map(user => (
        <div key={user.id}>
          <p>{user.name} - {user.active ? "Active" : "Inactive"}</p>
          <button onClick={() => dispatch({
            type: "toggleUser",
            id: user.id
          })}>Toggle</button>
          <button onClick={() => dispatch({
            type: "deleteUser",
            id: user.id
          })}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default UserList