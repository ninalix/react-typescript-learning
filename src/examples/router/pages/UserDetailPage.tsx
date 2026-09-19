import { useParams } from "react-router-dom";
import { users } from "../RouterExample";


function UserDetailPage() {
  const params = useParams();

  const user = users.find(user => user.id === Number(params.id));

  if(!user) {
    return <p>User not found.</p>;
  }

  return(
    <>
      <h1>User Detail</h1>
      <p>User ID: {user.id}</p>
      <p>User name: {user.name}</p>
    </>
  );
}

export default UserDetailPage