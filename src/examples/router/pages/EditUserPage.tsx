import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef  } from "react";
import useUser from "../../hooks/useUser";
import UserForm from "../forms/UserForm";

function EditUserPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { user, loading, error, retry } = useUser(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveError, setSaveError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saving, setSaving] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

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

  async function handleSave() {
    setNameError("");
    setEmailError("");

    let hasError = false;

    if(!name.trim()) {
      setNameError("Name is required.");
      hasError = true;
    }

    if(!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if(!email.includes("@")) {
      setEmailError("Email is not valid.");
      hasError = true;
    }

    if(hasError) {
      if(!name.trim()) {
        nameInputRef.current?.focus();
      } else {
        emailInputRef.current?.focus();
      }
      
      return;
    }

    if(!user) {
      return;
    }

    setSaveError("");
    setSaving(true);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
        })
      });

      if(!response.ok) {
        throw new Error("Failed to update user.");
      }

      const savedUser = await response.json();

      navigate(`/users/${user.id}`);
    } catch(error) {
      if(error instanceof Error) {
        setSaveError(error.message);
      } else {
        setSaveError("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  }

  return(
    <>
      <h1>Edit user {params.id}</h1>
      <UserForm 
        name={name}
        email={email}
        onNameChange={setName}
        onEmailChange={setEmail}
        onSubmit={handleSave}
        submitLabel="Save"
        saving={saving}
        error={saveError}
        nameError={nameError}
        emailError={emailError}
        nameInputRef={nameInputRef}
        emailInputRef={emailInputRef}
      />
    </>
  );
}

export default EditUserPage