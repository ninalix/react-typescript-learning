import { useState, useRef } from "react";
import type { User } from './types'

type FormData = {
  name: string;
  email: string;
  role: string;
};

type FormErrors = {
  name: string;
  email: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  role: "developer"
};

const initialFormErrors: FormErrors = {
  name: "",
  email: ""
};

type UserFormProps = {
  onAddUser: (user: User) => void;
};

function UserForm({onAddUser}: UserFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    inputRef.current?.focus();
  }

  function validateForm() {
    const errors: FormErrors = {
      ...initialFormErrors
    }

    if(!formData.name.trim()){
      errors.name = "Name is required.";
    }

    if(!formData.email.trim()) {
      errors.email = "Email is required";
    } else if(!formData.email.includes("@")) {
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
      id: Math.random(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      active: true
    }

    onAddUser(newUser);

    setFormData(initialFormData);
    setFormErrors(initialFormErrors);

    handleFocus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input 
          id="name"
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))}
          ref={inputRef}
        />
        {formErrors.name && <p>{formErrors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input 
          id="email"
          type="text"
          value={formData.email}
          onChange={e => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))}
        />
        {formErrors.email && <p>{formErrors.email}</p>}
      </div>
      <div>
        <label htmlFor="role">Role: </label>
        <select id="role" value={formData.role} onChange={e => setFormData(prev => ({
            ...prev,
            role: e.target.value
          }))}>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm