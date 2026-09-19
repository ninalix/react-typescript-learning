import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  role: string;
  active: boolean;
};

type FormErrors = {
  name: string;
  email: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  role: "developer",
  active: false
};

const initialFormError: FormErrors = {
  name: "",
  email: ""
}

function UserForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<FormErrors>(initialFormError);

  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: event.target.value
    }))

    setErrors(prev => ({
      ...prev,
      name: ""
    }))
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      email: event.target.value
    }))

    setErrors(prev => ({
      ...prev,
      email: ""
    }))
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      role: event.target.value
    }))
  };  

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      active: event.target.checked
    }))
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    setSubmitted(false);

    const newErrors: FormErrors = {
      name: "",
      email: ""
    };

    if(!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if(!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if(!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== "");

    if(hasErrors) {
      return;
    }

    console.log(formData);

    setFormData(initialFormData);

    setSubmitted(true);
  };

  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
          id="name" 
          value={formData.name} 
          onChange={handleNameChange} 
          aria-invalid={Boolean(errors.name)} 
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          id="email" 
          value={formData.email} 
          onChange={handleEmailChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" role="alert">{errors.email}</p>}
      </div>
      
      <label htmlFor="role">Role:</label>
      <select id="role" value={formData.role} onChange={handleRoleChange}>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
      </select>
      <label>
        <input type="checkbox" checked={formData.active} onChange={handleActiveChange}/>Active
      </label>
      <button type="submit" >Add user</button>
      {submitted && <p>User created successfully!</p>}
    </form>
  )
}

export default UserForm