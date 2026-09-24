import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ApiUser } from "../../reducer/user-management/types";
import UserForm from "../forms/UserForm";

function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit() {
    if(!name.trim()) {
      setError("Name is required.");
      return;
    }

    if(!email.trim()) {
      setError("Email is required.");
      return;
    } else if(!email.includes("@")) {
      setError("Email is not valid.");
      return;
    }

    setError("");
    setSubmitting(true);
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
        })
      });

      if(!response.ok) {
        throw new Error("Failed to create user.");
      }

      const createdUser: ApiUser = await response.json();

      console.log(createdUser);

      navigate(`/users/${createdUser.id}`);
    } catch(error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return(
    <>
      <h1>New user</h1>
      <UserForm 
        name={name}
        email={email}
        onNameChange={setName}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        submitLabel="Create user"
        saving={submitting}
        error={error}
      >
        </UserForm>
    </>
  );
}

export default NewUserPage