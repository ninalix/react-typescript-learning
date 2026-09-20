import { useParams, useNavigate } from "react-router-dom";

function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSave() {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT"
    });

    if(!response.ok) {
      return;
    }

    navigate(`/users/${id}`);
  }

  return(
    <>
      <h1>Edit user {id}</h1>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </>
  );
}