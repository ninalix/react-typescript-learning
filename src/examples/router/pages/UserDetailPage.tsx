import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../hooks/useUser";

function UserDetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { user, loading, error, retry } = useUser(params.id);

  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  if(loading) {
    return <p>Loading...</p>;
  }

  if(error) {
    return(
      <>
        <p>{error}</p>
        <button onClick={() => retry()}>Try again</button>
      </>
    );
  }

  if(!user) {
    return <p>User not found.</p>;
  }

  async function handleDelete() {
    if(!user) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if(!confirmed) {
      return;
    }

    setDeleteError("");
    setDeleting(true);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "DELETE"
      });

      if(!response.ok) {
        throw new Error("Failed to delete user.");
      }

      navigate("/users");
      
    } catch(error) {
      if(error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Something went wrong.");
      }
    } finally {
      setDeleting(false);
    }
  }

  return(
    <>
      <h1>User Detail</h1>
      <p>User ID: {user.id}</p>
      <p>User name: {user.name}</p>
      <p>User email: {user.email}</p>
      <button onClick={() => navigate(`/users/${user.id}/edit`)}>Edit user</button>
      {deleteError && <p role="alert">{deleteError}</p>}
      <button onClick={handleDelete} disabled={deleting}>{deleting ? "Deleting..." : "Delete user"}</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}

export default UserDetailPage