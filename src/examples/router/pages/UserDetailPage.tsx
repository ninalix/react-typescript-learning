import { useParams, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function UserDetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { user, loading, error, retry } = useUser(params.id);

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

  return(
    <>
      <h1>User Detail</h1>
      <p>User ID: {user.id}</p>
      <p>User name: {user.name}</p>
      <p>User email: {user.email}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}

export default UserDetailPage