type UserFormProps = {
  name: string;
  email: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  saving: boolean;
  // children?: React.ReactNode;
  error?: string;
  nameError?: string;
  emailError?: string;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
};

function UserForm({name, email, onNameChange, onEmailChange, onSubmit, submitLabel, saving, error, nameError, emailError, nameInputRef, emailInputRef}: UserFormProps) {
  return(
    <form noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
    }}>
      <label htmlFor="name">Name</label>
      <input ref={nameInputRef} id="name" required value={name} onChange={(e) => onNameChange(e.target.value)} 
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "name-error" : undefined}
        />
      {nameError && (
        <p id="name-error">
          {nameError}
        </p>
      )}

      <label htmlFor="email">Email</label>
      <input ref={emailInputRef} id="email" required type="email" value={email} onChange={(e) => onEmailChange(e.target.value)}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
        />
      {emailError && (
        <p id="email-error">{emailError}</p>
      )}

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}>{saving ? "Saving..." : submitLabel}</button>
    </form>
  );
}

export default UserForm