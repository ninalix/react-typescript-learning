import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

type FormData = {
  name: string;
  email: string;
  active: boolean;
};

type FormErrors = {
  name: string;
  email: string;
};

const initialFormData:FormData = {
  name: "",
  email: "",
  active: true
};

const initialFormErrors: FormErrors = {
  name: "",
  email: ""
};

function UserManagement() { 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  async function fetchUsers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if(!response.ok) {
        throw new Error("Failed to load users.");
      }

      const data: ApiUser[] = await response.json();

      const usersWithActive: User[] = data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        active: true
      }));

      setUsers(usersWithActive);
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

  if(loading) {
    return <p>Loading...</p>;
  }

  if(error) {
    return <p>{error}</p>;
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = showActiveOnly === false || user.active === true;

    return matchesSearch && matchesActive;
  });

  function toggleUser(id: number) {
    setUsers(prevUsers => (
      prevUsers.map(user => (
        user.id === id 
        ? {...user, active: !user.active} : user
      ))
    ))
  }

  function validateForm() {
    const errors: FormErrors = {
      ...initialFormErrors
    };

    if(!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if(!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!formData.email.includes("@")){
      errors.email = "Enter a valid email.";
    }

    return errors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateForm();

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(error => error !== "");

    if(hasErrors) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      active: formData.active
    };

    setUsers(prevUsers => [
      ...prevUsers,
      newUser
    ]);

    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  }

  return (
    <>
      <input 
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search users"
      />
      <label>
        <input 
          type="checkbox"
          checked={showActiveOnly}
          onChange={() => setShowActiveOnly(prev => !prev)}
        /> Show active users only
      </label>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            id="name"
            type="text"
            value={formData.name}
            aria-invalid={Boolean(formErrors.name)}
            aria-describedby={formErrors.name ? "name-error" : undefined}
            onChange={event => setFormData(prev => ({
              ...prev,
              name: event.target.value
            }))}
          />
          {formErrors.name && <p id="name-error">{formErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            id="email"
            type="email"
            value={formData.email}
            aria-invalid={Boolean(formErrors.email)}
            aria-describedby={formErrors.email ? "email-error" : undefined}
            onChange={event => setFormData(prev => ({
              ...prev,
              email: event.target.value
            }))}
          />
          {formErrors.email && <p id="email-error">{formErrors.email}</p>}
        </div>
        <label>
          <input 
            type="checkbox"
            checked={formData.active}
            onChange={event => setFormData(prev => ({
              ...prev,
              active: event.target.checked
            }))}
          /> Active
        </label>
        <button type="submit">Submit</button>
      </form>
      {filteredUsers.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>Status: {user.active ? "Active" : "Inactive"}</p>
          <button onClick={() => toggleUser(user.id)}>
            {user.active ? "Deactivate" : "Activate"}
          </button>
        </div>
      ))}
    </>
  );
}

export default UserManagement