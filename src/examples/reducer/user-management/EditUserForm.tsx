import { useState } from "react";
import type { User } from './types'

type EditUserFormProps = {
  user: User;
  onSave: (user: User) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
};

type FormErrors = {
  name: string;
  email: string;
};

function EditUserForm({user, onSave, onCancel, saving}: EditUserFormProps) {
  const [formData, setFormData] = useState<User>(user);

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function validateForm() {
    const error = {
      name: "",
      email: ""
    }

    if(!formData.name.trim()) {
      error.name = "Name is required.";
    }

    if(!formData.email.trim()) {
      error.email = "Email is required."
    } else if(!formData.email.includes("@")) {
      error.email = "Email should be valid.";
    }

    return error;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== "");

    if(hasErrors) {
      return;
    }

    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="edit-name">Name:</label>
        <input 
          id="edit-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="edit-email">Email:</label>
        <input 
          id="edit-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error">{errors.email}</p>}
      </div>
      <div>
          <label htmlFor="edit-role">Role:</label>
          <select id="edit-role" name="role" value={formData.role} onChange={handleChange}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
      </div>
      <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
    </form>
  );
}

export default EditUserForm;